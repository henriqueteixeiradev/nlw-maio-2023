import { View, Text, ImageBackground } from "react-native";
import { SplashScreen, Stack } from "expo-router";
import { styled } from "nativewind";
import * as SecureStore from "expo-secure-store";

import blurBg from "../src/assets/bg-blur.png";
import Stripes from "../src/assets/stripes.svg";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

const StyledStripes = styled(Stripes);

export default function Layout() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const [hasLoaderFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

  useEffect(() => {
    SecureStore.getItemAsync("token").then((token) => {
      setIsUserAuthenticated(!!token);
    });
  }, []);

  if (!hasLoaderFonts) {
    return <SplashScreen />;
  }

  return (
    <ImageBackground
      source={blurBg}
      imageStyle={{ position: "absolute", left: "-100%" }}
      className="bg-gray-900 flex-1 relative"
    >
      <StyledStripes className="absolute left-2" />

      <StatusBar style="auto" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Stack.Screen name="index" redirect={isUserAuthenticated} />
        <Stack.Screen name="new" />
        <Stack.Screen name="memories" />
      </Stack>
    </ImageBackground>
  );
}
