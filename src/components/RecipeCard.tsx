import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { router } from "expo-router";
import { RecipeSummary } from "../models/Recipe";
import { colors } from "../ui/colors";
import { LinearGradient } from "expo-linear-gradient";

import Feather from "@expo/vector-icons/Feather";

// Definierar vilken data komponenten tar emot som prop
interface RecipeCardProps {
  recipe: RecipeSummary; // Tar emot ett recept som prop
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        // Krymper kortet lite när man trycker
        pressed && { transform: [{ scale: 0.97 }] },
      ]}
      // Navigerar till detaljvyn med receptets ID
      onPress={() => {
        router.push(`/recipe/${recipe.id}`);
      }}
    >
      {/* Bild täcker övre delen av kortet */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        <LinearGradient
          colors={["transparent", colors.secondary]}
          style={styles.gradient}
        />
        {/* Hjärta i hörnet */}
        <Pressable style={styles.favoriteButton}>
          <Feather name="heart" size={20} color={colors.white} />
        </Pressable>
      </View>

      {/* Info-sektion under bilden */}
      <View style={styles.info}>
        <Text style={styles.title}>{recipe.title}</Text>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Text style={styles.time}>⏱ {recipe.readyInMinutes} min</Text>
          <Text style={styles.time}>🍽️ {recipe.servings} portioner</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.secondary,
    borderRadius: 40,
    margin: 16,
    shadowColor: "#000",
    elevation: 3,
    gap: 12,
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    padding: 6,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: "100%",
    height: 100,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  info: {
    backgroundColor: colors.white + "BF",
    borderRadius: 40,
    margin: 12,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 6,
  },
  time: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});
