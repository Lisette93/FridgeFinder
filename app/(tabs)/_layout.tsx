import { Tabs } from "expo-router";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

export default function Tablayout() {
  return (
    <SafeAreaView style={styles.container}>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "Hem",
            headerShown: false,
            tabBarIcon: () => <Feather name="home" size={24} color="black" />,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Min kyl",
            tabBarIcon: () => <Feather name="search" size={24} />,
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favoriter",
            tabBarIcon: () => <Feather name="heart" size={24} />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
