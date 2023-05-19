import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";

type listData = { id: number; name: string };

export default function App() {
  const [list] = useState<listData[]>([
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Jack" },
    { id: 4, name: "Jessica" },
    { id: 5, name: "Jamile" },
    { id: 6, name: "Jailson" },
    { id: 7, name: "Jadson" },
    { id: 8, name: "Jadson" },
    { id: 9, name: "Jadson" },
    { id: 10, name: "Jadson" },
  ]);

  function DataList({ name }: { name: string }) {
    return (
      <TouchableOpacity className="bg-red-400 w-full h-24 mb-5 items-center justify-center">
        <Text>{name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View className="flex-1 mt-16 ">
      <Text className="font-bold">Hello World!</Text>

      <FlatList
        data={list}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => <DataList name={item.name} />}
        showsVerticalScrollIndicator={false}
      />

      <StatusBar style="auto" />
    </View>
  );
}
