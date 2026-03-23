import { useLocalSearchParams } from "expo-router";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { fetchRecipeById } from "../../src/API/api";
import { useEffect, useState } from "react";
import { RecipeDetail } from "../../src/models/Recipe";
import { colors } from "../../src/ui/colors";

export default function RecipeDetailScreen() {
  // Hämtar ID från URL:en, t.ex. /recipe/663931 → id = "663931"
  const { id } = useLocalSearchParams<{ id: string }>();
  //null istället för en tom array, eftersom det är ett enskilt recept och inte en lista.
  const [recipe, setRecipes] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
  }, [id]); // [id] betyder att useEffect körs om varje gång id ändras

  // Visar en spinner medan data hämtas
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Visar felmeddelande om något gick fel
  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Något gick fel: {error}</Text>
      </View>
    );
  }

  // TypeScript kräver en null check, kollar att recipe faktiskt finns
  if (!recipe) {
    return (
      <View style={styles.centered}>
        <Text>Receptet hittades inte</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Bild täcker övre delen av kortet */}
      <Image source={{ uri: recipe.image }} style={styles.image} />

      {/* Info-sektion under bilden */}
      <View style={styles.info}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.time}>⏱ {recipe.readyInMinutes} min</Text>

        <Text style={styles.title}>Ingredienser:</Text>
        {/* Loopar igenom ingredienslistan och visar varje ingrediens */}
        {recipe.extendedIngredients.map((ing) => (
          <Text key={ing.id} style={styles.ingredients}>
            • {ing.original}
          </Text>
        ))}
        <Text style={styles.title}>Instruktioner:</Text>
        <Text style={styles.instructions}>{recipe.instructions}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  time: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  ingredients: {
    fontSize: 14,
    color: colors.textPrimary,
    marginTop: 8,
  },
  instructions: {
    fontSize: 14,
    color: colors.textPrimary,
    marginTop: 8,
  },
});
