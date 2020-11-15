import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { useContext } from "react";
import { Button } from "react-native";
import Colors from "../constants/Colors";
import UsernameContext from "../context/LoggedInContext";
import useColorScheme from "../hooks/useColorScheme";
import AboutScreen from "../screens/AboutScreen";
import ChatScreen from "../screens/ChatScreen";
import { AboutParamList, BottomTabParamList, ChatParamList } from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Chat"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Chat"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-rocket" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="About"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-information-circle" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<ChatParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerTitle: "General Chat" }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<AboutParamList>();

function TabTwoNavigator() {
  const [_, setUsername] = useContext(UsernameContext);
  const theme = useColorScheme();

  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{
          headerTitle: "About",
          headerRight: () => (
            <Button
              onPress={() => setUsername("")}
              title="Logout"
              color={theme === "light" ? "#333" : "#ccc"}
            />
          ),
        }}
      />
    </TabTwoStack.Navigator>
  );
}
