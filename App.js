import React, { useEffect } from "react";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  AsyncStorage,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TermAndCondition from "./Components/TermAndCondition";
import ScreenHeader from "./Components/ScreenHeader";
import Splash from "./Components/Splash";
import NoConnection from "./Components/NoConnection";
import Home from "./Components/Home";
import videoLearn from "./Components/videoLearn";
import Home1 from "./Components/Home1";
import MultiTypeSlider from "./Components/MultiTypeSlider";
import FirstPage from "./Components/FirstPage";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
const Stack = createStackNavigator();

export default function App(props) {
  // console.disableYellowBox = true;
  useEffect(() => {
    callToken();
  }, []);
  const callToken = async () => {
    messaging()
      .getToken()
      .then((token) => {
        console.log("token==========token=======token========", token);
        AsyncStorage.setItem("token", token);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  PushNotification.configure({
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
    },

    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);
    },

    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,

    requestPermissions: true,
  });
  return (
    // <View style={{flex: 1}}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="FirstPage"
          component={FirstPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TermAndCondition"
          component={TermAndCondition}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="ScreenHeader" component={ScreenHeader} /> */}

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="NoConnection"
          component={NoConnection}
          options={{ headerShown: false }}
        />

        {/* <Stack.Screen
          name="MultiTypeSlider"
          component={MultiTypeSlider}
          options={{headerShown: false}}
        /> */}
        {/* <Stack.Screen
          name="video"
          component={videoLearn}
          options={{headerShown: false}}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>

    // </View>
  );
}
