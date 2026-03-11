import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { router } from "expo-router";
import { RecipeSummary } from "../models/Recipe";

interface RecipeCardProps {
  recipe: RecipeSummary; // Tar emot ett recept som prop
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && { transform: [{ scale: 0.97 }] },
      ]}
      onPress={() => {
        router.push(`/recipe/${recipe.id}`);
      }}
    >
      {/* Bild täcker övre delen av kortet */}
      <Image source={{ uri: recipe.image }} style={styles.image} />

      {/* Info-sektion under bilden */}
      <View style={styles.info}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.time}>⏱ {recipe.readyInMinutes} min</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
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
    color: "#888",
  },
});
