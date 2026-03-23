import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { fetchRandomRecipes } from "../../src/API/api";
import { RecipeSummary } from "../../src/models/Recipe";
import RecipeCard from "../../src/components/RecipeCard";
import { colors } from "../../src/ui/colors";
import { typography } from "../../src/ui/typography";

export default function HomeScreen() {
  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  // spinner börjar som true eftersom appen laddar direkt när skärmen visas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Hämtar recept när komponenten laddas
    fetchRandomRecipes()
      .then((data) => {
        setRecipes(data);
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Om appen fortfarande laddar, visa en spinner
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
      <View style={styles.centered}>
        <Text>Något gick fel: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={typography.title}>Vad blir det till middag?</Text>
        <Text style={typography.subtitle}>Dagens förslag</Text>
      </View>

      {/* Receptlista */}
      <View style={styles.list}>
        <FlatList
          data={recipes} // recept från state
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <RecipeCard recipe={item} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  list: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 16,
  },
});
