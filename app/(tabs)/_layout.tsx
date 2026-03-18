import { Tabs } from "expo-router";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { colors } from "../../src/ui/colors";

export default function Tablayout() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Tabs
        // För att matcha texten med ikonernas färger
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Hem",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Feather
                name="home"
                size={24}
                color={focused ? colors.primary : colors.textSecondary}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Min kyl",
            tabBarIcon: ({ focused }) => (
              <Feather
                name="search"
                size={24}
                color={focused ? colors.primary : colors.textSecondary}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favoriter",
            tabBarIcon: ({ focused }) => (
              <Feather
                name="heart"
                size={24}
                color={focused ? colors.primary : colors.textSecondary}
              />
            ),
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
