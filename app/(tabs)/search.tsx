import { StyleSheet, View, TextInput, Pressable } from "react-native";
import React from "react";
import { fetchByIngredients } from "../../src/API/api";
import { FlatList, Text } from "react-native";
import { RecipeSummary } from "../../src/models/Recipe";
import RecipeCard from "../../src/components/RecipeCard";
import { colors } from "../../src/ui/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  const [text, onChangeText] = React.useState("");
  const [recipes, setRecipes] = React.useState<RecipeSummary[]>([]); // State för att lagra sökresultaten

  async function handleSearch() {
    const ingredients = text.split(",");
    const results = await fetchByIngredients(ingredients);
    setRecipes(results);
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Sök på ingridienser..."
        />

        <Pressable onPress={handleSearch} style={styles.button}>
          <Text>Sök</Text>
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
    color: colors.white,
    padding: 12,
    margin: 12,
    borderRadius: 40,
  },
});
