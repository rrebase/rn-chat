import { useCallback, useContext, useEffect, useState } from "react";
import { GiftedChat, IMessage as GiftedMsg } from "react-native-gifted-chat";
import { Client as TwilioChatClient } from "twilio-chat";
import { Channel } from "twilio-chat/lib/channel";
import { Message as TwilioMsg } from "twilio-chat/lib/message";
import UsernameContext from "../context/LoggedInContext";
import { API_CHAT_TOKEN, GENERAL_CHAT_CHANNEL } from "../utils/constants";

const twilioMsgToGiftedMsg = (message: TwilioMsg) =>
  ({
    _id: message.sid,
    text: message.body,
    createdAt: message.timestamp,
    user: {
      _id: message.author,
      name: message.author,
      avatar: `https://picsum.photos/seed/${message.author}/140/140`,
    },
  } as GiftedMsg);

export default function useChat() {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<GiftedMsg[]>([]);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [username, _] = useContext(UsernameContext);

  const onSend = useCallback(
    (msgs: GiftedMsg[] = []) => {
      setMessages((previousMessages: any) =>
        GiftedChat.append(previousMessages, msgs)
      );
      if (channel) {
        for (const msg of msgs) {
          channel.sendMessage(msg.text);
        }
      }
    },
    [channel, setMessages]
  );

  useEffect(() => {
    let chatClient: TwilioChatClient;

    const createClient = async () => {
      try {
        const result = await fetch(API_CHAT_TOKEN, {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ username }),
        });
        const response = await result.json();

        // Don't console log the object, causes a huge memory leak!
        chatClient = await TwilioChatClient.create(response.token);

        let generalChannel;
        try {
          generalChannel = await chatClient.getChannelByUniqueName(
            GENERAL_CHAT_CHANNEL
          );
        } catch (err) {
          generalChannel = await chatClient.createChannel({
            uniqueName: GENERAL_CHAT_CHANNEL,
          });
        }
        setChannel(generalChannel);

        try {
          await generalChannel.join();
        } catch (err) {
          // Already a member
        }
        setLoading(false);

        generalChannel.getMessages().then((msgs) => {
          setMessages(msgs.items.map(twilioMsgToGiftedMsg).slice().reverse());
        });

        generalChannel.on("messageAdded", (message: TwilioMsg) => {
          if (message.author === username) {
            // own messages are already added via optimistic updates
            return;
          }
          setMessages((prevMessages) => {
            return [twilioMsgToGiftedMsg(message), ...prevMessages];
          });
        });
      } catch (err) {
        console.warn("ERROR", err);
      }
    };
    if (username) {
      createClient();
    }

    return () => {
      chatClient?.shutdown();
    };
  }, [username]);

  return { messages, onSend, loading };
}
