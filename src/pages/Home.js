import React from "react";
import CocktailsList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";
export default function Home() {
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("a");
  const [cocktails, setCocktails] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    async function getDrinks() {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
        );
        const data = await response.json();
        const { drinks } = data;
        if (drinks) {
          const newCocktails = drinks.map(item => {
            const {
              idDrink: id,
              strDrink: name,
              strDrinkThumb: image,
              strAlcoholic: info,
              strGlass: glass
            } = item;
            return {
              id,
              name,
              image,
              info,
              glass
            };
          });
          setCocktails(newCocktails);
        } else {
          setCocktails([]);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getDrinks();
  }, [searchTerm]);
  return (
    <main>
      <SearchForm setSearchTerm={setSearchTerm} />
      <CocktailsList loading={loading} cocktails={cocktails} />
    </main>
  );
}
