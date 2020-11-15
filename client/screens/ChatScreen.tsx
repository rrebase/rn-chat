import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { useContext } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  InputToolbarProps,
  Send,
} from "react-native-gifted-chat";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import LoggedInContext from "../context/LoggedInContext";
import useColorScheme from "../hooks/useColorScheme";
import useTwilioChat from "../hooks/useTwilioChat";
import { SCREEN_WIDTH } from "../utils/dimensions";

export default function ChatScreen() {
  const { messages, onSend, loading } = useTwilioChat();
  const theme = useColorScheme();
  const [username, _] = useContext(LoggedInContext);
  const insets = useSafeAreaInsets();

  const renderInputToolbar = (props: InputToolbarProps) => (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: Colors[theme].background,
        borderTopColor: Colors[theme].inputBorderTop,
        paddingVertical: 3,
      }}
      primaryStyle={{
        alignItems: "center",
        backgroundColor: Colors[theme].inputBg,
        paddingTop: 4,
      }}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {loading ? (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Loading chat...</Text>
            <ActivityIndicator />
          </View>
        ) : (
          <GiftedChat
            key={theme}
            renderUsernameOnMessage
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
              _id: username!,
              name: username!,
              avatar: `https://picsum.photos/seed/${username!}/140/140`,
            }}
            alwaysShowSend
            messagesContainerStyle={{
              backgroundColor: Colors[theme].background,
            }}
            bottomOffset={insets.bottom + 36}
            renderInputToolbar={renderInputToolbar}
            showUserAvatar
            showAvatarForEveryMessage
            listViewProps={{ marginBottom: 8 }}
            textInputProps={{
              style: {
                color: Colors[theme].text,
                ...styles.textInput,
              },
            }}
            renderLoading={() => <ActivityIndicator />}
            renderSend={(props) => (
              <Send {...props} containerStyle={styles.sendContainer}>
                <FontAwesome
                  name="send"
                  size={24}
                  color={Colors[theme].rightBubbleBg}
                />
              </Send>
            )}
            renderBubble={(props) => (
              <Bubble
                {...props}
                textStyle={{
                  left: { color: Colors[theme].leftBubbleText },
                  right: { color: Colors[theme].rightBubbleText },
                }}
                wrapperStyle={{
                  left: { backgroundColor: Colors[theme].leftBubbleBg },
                  right: { backgroundColor: Colors[theme].rightBubbleBg },
                }}
              />
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
  },
  loading: {
    alignItems: "center",
    marginTop: 64,
  },
  loadingText: {
    marginBottom: 6,
  },
  sendContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginRight: 16,
    paddingBottom: 4,
  },
  textInput: {
    flex: 1,
    padding: 12,
  },
});
