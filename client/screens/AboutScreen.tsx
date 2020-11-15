import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { openURL } from "expo-linking";
import * as React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import useColorScheme from "../hooks/useColorScheme";
import { GIFTED_URL, SOURCE_URL, TWILIO_URL } from "../utils/constants";

const CONTAINER_WIDTH = 260;
const ICON_SIZE = 16;

export default function AboutScreen() {
  const theme = useColorScheme();
  const iconColor = theme === "light" ? "#000" : "#fff";

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>This is an example chat app.</Text>
        <Text style={styles.subtitle}>Built using</Text>
        <TouchableOpacity onPress={() => openURL(TWILIO_URL)}>
          <View style={styles.row}>
            <FontAwesome5
              name="external-link-alt"
              size={ICON_SIZE}
              color={iconColor}
              style={styles.icon}
            />
            <Text style={styles.text}>Twilio Programmable Chat</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openURL(GIFTED_URL)}>
          <View style={styles.row}>
            <FontAwesome5
              name="external-link-alt"
              size={ICON_SIZE}
              color={iconColor}
              style={styles.icon}
            />
            <Text style={styles.text}>GiftedChat</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openURL(SOURCE_URL)}>
          <View style={[styles.row, styles.sourceContainer]}>
            <AntDesign
              size={ICON_SIZE}
              style={styles.icon}
              name="github"
              color={iconColor}
            />
            <Text style={styles.text}>Source on GitHub</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
  },
  innerContainer: {
    width: CONTAINER_WIDTH,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  subtitle: {
    marginTop: 16,
    fontWeight: "bold",
    color: "#919BB1",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },
  icon: {
    marginRight: 8,
    marginLeft: 2,
  },
  sourceContainer: {
    marginTop: 32,
  },
});
