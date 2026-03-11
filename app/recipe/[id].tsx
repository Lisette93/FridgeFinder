import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { fetchRecipeById } from "../../src/API/api";
import { useEffect, useState } from "react";
import { RecipeDetail } from "../../src/models/Recipe";
import { ActivityIndicator } from "react-native";

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [recipe, setRecipes] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Hämtar recept när komponenten laddas
    fetchRecipeById(Number(id))
      .then((data) => {
        setRecipes(data);
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // Visar en spinner medan data hämtas
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Visar felmeddelande om något gick fel
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Något gick fel: {error}</Text>
      </View>
    );
  }

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
