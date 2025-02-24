import { useState, useEffect } from "react";
import "./PrincipalComponent.css";
import "swiper/css";
import "swiper/css/navigation";
import { FilterComponent } from "../filtro/FilterComponent";
import { CarouselComponent } from "../carousel/CarouselComponent";

export function PrincipalComponent() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Seafood");
  const [meals, setMeals] = useState([]);
  const [randomMeal, setRandomMeal] = useState(null);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((res) => res.json())
      .then((data) => setCategories(data.meals));
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => setMeals(data.meals));
  }, [selectedCategory]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((res) => res.json())
      .then((data) => setRandomMeal(data.meals[0]));
  }, []);

  const handleRandomCategory = () => {
    if (categories.length > 0) {
      const randomIndex = Math.floor(Math.random() * categories.length);
      setSelectedCategory(categories[randomIndex].strCategory);
    }
  };

  const sendEmail = () => {
    if (meals.length > 0) {
      const meal = meals[0];
      return `Mira esta receta: ${meal.strMeal}\n\nImagen: ${meal.strMealThumb}\n\nFuente: https://www.themealdb.com/meal/${meal.idMeal}`;
    }
    return '';
  };

  const email = sendEmail();

  return (
    <div className="container">
      <FilterComponent 
        categories={categories} 
        selectedCategory={selectedCategory}  
        setSelectedCategory={setSelectedCategory}  
      />
      <CarouselComponent meals={meals} />

      <div className="buttons">
        <button className="button" onClick={handleRandomCategory}>Random</button>
        <a 
          href={`mailto:?subject=Receta%20del%20día&body=${encodeURIComponent(email)}`} 
          className="button"
        >
          Enviar receta
        </a>
      </div>
    </div>
  );
}
