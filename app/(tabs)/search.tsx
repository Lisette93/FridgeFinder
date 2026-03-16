import { StyleSheet, View, TextInput, Pressable } from "react-native";
import React from "react";
import { fetchByIngredients } from "../../src/API/api";
import { FlatList, Text } from "react-native";
import { RecipeSummary } from "../../src/models/Recipe";
import RecipeCard from "../../src/components/RecipeCard";

export default function search() {
  const [text, onChangeText] = React.useState("");
  const [recipes, setRecipes] = React.useState<RecipeSummary[]>([]); // ← ny, för att spara resultaten

  async function handleSearch() {
    const ingredients = text.split(","); // "chicken,cream" → ["chicken", "cream"]
    const results = await fetchByIngredients(ingredients);
    setRecipes(results);
  }

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Sök på ingridienser..."
      />

      <Pressable onPress={handleSearch} style={styles.button}>
        <Text>Sök</Text>
      </Pressable>

      {/* Här kan du rendera recepten som finns i recipes */}
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    margin: 12,
    borderRadius: 8,
  },
});
