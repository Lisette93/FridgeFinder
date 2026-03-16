import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { router } from "expo-router";
import { RecipeSummary } from "../models/Recipe";
import { colors } from "../ui/colors";

// Definierar vilken data komponenten tar emot som prop
interface RecipeCardProps {
  recipe: RecipeSummary; // Tar emot ett recept som prop
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <View style={styles.shadow}>
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
        <Image source={{ uri: recipe.image }} style={styles.image} />

        {/* Info-sektion under bilden */}
        <View style={styles.info}>
          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.time}>⏱ {recipe.readyInMinutes} min</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 16,
    margin: 16,
    shadowColor: "#000",
    elevation: 3,
    backgroundColor: colors.white,
  },
  card: {
    backgroundColor: colors.secondary,
    borderRadius: 16,
    margin: 16,
    gap: 12,
  },
  image: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: "100%",
    height: 180,
  },
  info: {
    padding: 12,
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
