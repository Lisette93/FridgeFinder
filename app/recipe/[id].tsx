import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, backgroundColor: "#b8d475" }}>
      <Text
        style={{
          color: "#fff",
          fontSize: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Recept ID: {id}
      </Text>
    </View>
  );
}
