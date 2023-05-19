import { StatusBar } from "expo-status-bar";
import { ImageBackground, Text, View } from "react-native";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";

import blurBg from "./src/assets/bg-blur.png";

export default function App() {
  const [hasLoaderFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

  if (!hasLoaderFonts) {
    return null;
  }

  return (
    <ImageBackground
      source={blurBg}
      imageStyle={{ position: "absolute", left: "-100%" }}
      className="bg-gray-900 flex-1 items-center relative"
    >
      <StatusBar style="auto" />
    </ImageBackground>
  );
}
