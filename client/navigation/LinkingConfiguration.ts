import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Chat: {
            screens: {
              ChatScreen: "chat",
            },
          },
          About: {
            screens: {
              AboutScreen: "about",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
