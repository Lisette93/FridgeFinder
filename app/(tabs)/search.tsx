import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { fetchByIngredients } from "../../src/API/api";
import { RecipeSummary } from "../../src/models/Recipe";
import RecipeCard from "../../src/components/RecipeCard";
import { colors } from "../../src/ui/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  // State för vad användaren skriver i sökfältet
  const [text, onChangeText] = React.useState("");
  const [recipes, setRecipes] = React.useState<RecipeSummary[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleSearch() {
    setLoading(true);
    try {
      // Dela upp texten vid kommatecken för att få en lista av ingredienser
      const ingredients = text.split(",");
      // Skicka ingredienserna till API:et och vänta på svar
      const results = await fetchByIngredients(ingredients);
      // Spara recepten i state så att FlatList kan visa dem
      setRecipes(results);
    } catch (err) {
      // Om något gick fel, spara felmeddelandet i state
      setError("Något gick fel, försök igen");
    } finally {
      setLoading(false);
    }
  }

  // Visa spinner medan sökning pågår
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Visa felmeddelande om något gick fel
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Sökfält där användaren skriver ingredienser */}
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Sök på ingridienser..."
        />

        {/* Knapp för att starta sökningen */}
        <Pressable onPress={handleSearch} style={styles.button}>
          <Text style={{ color: colors.white }}>Sök</Text>
        </Pressable>

        {/* FlatList för att visa sökresultaten */}
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <RecipeCard recipe={item} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  input: {
    borderRadius: 40,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    margin: 12,
    borderRadius: 40,
  },
});
