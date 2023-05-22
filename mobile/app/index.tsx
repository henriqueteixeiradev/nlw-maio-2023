import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

import { useEffect } from "react";
import { ImageBackground, Text, View, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import * as SecureStore from "expo-secure-store";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";

import blurBg from "../src/assets/bg-blur.png";
import Stripes from "../src/assets/stripes.svg";
import NLWLogo from "../src/assets/nlw-spacetime-logo.svg";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { api } from "../src/lib/api";

const StyledStripes = styled(Stripes);

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/5ffd9a8f3dd58554d03b",
};

export default function App() {
  const router = useRouter();

  const [hasLoaderFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

  const [request, response, signinWithGithub] = useAuthRequest(
    {
      clientId: "5ffd9a8f3dd58554d03b",
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        scheme: "nlwspacetime",
      }),
    },
    discovery
  );

  async function handleGihuOauthCode(code: string) {
    const response = await api.post("/register", {
      code,
    });

    const { token } = response.data;

    await SecureStore.setItemAsync("token", token);

    router.push("/memories");
  }

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;

      handleGihuOauthCode(code);
    }
  }, [response]);

  if (!hasLoaderFonts) {
    return null;
  }

  return (
    <ImageBackground
      source={blurBg}
      imageStyle={{ position: "absolute", left: "-100%" }}
      className="bg-gray-900 flex-1 items-center relative px-8 py-10"
    >
      <StyledStripes className="absolute left-2" />

      <View className="flex-1 items-center justify-center gap-6">
        <NLWLogo />

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          className="rounded-full bg-green-500 px-5 py-2"
          activeOpacity={0.7}
          onPress={() => signinWithGithub()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            CADASTRAR LEMBRANÇA
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat{" "}
      </Text>

      <StatusBar style="auto" />
    </ImageBackground>
  );
}