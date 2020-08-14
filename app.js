const searchInput = document.getElementById("search");
const submit = document.getElementById("submit");
const randomBtn = document.getElementById("random");
const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementById("results-heading");
const single_mealEl = document.getElementById("single-meal");

//Search Meal and fetch from API Function
function searchMeal(e) {
  e.preventDefault();

  //clear single meal
  single_mealEl.innerHTML = "";

  //Get search term
  const searchTerm = searchInput.value;

  //Check for empty
  if (searchTerm.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for '${searchTerm}':</h2>`;
        if (data.meals === null) {
          resultHeading.innerHTML = `<p>No search results found! Please modify the keyword and try again!</p>`;
        } else {
          // let output = "";
          // data.meals.forEach((meal) => {
          //   output += `
          //   <div class="meal">
          //     <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
          //     <div class="meal-info" data-mealID="${meal.idMeal}">
          //       <h3 class="meal-heading">${meal.strMeal}</h3>
          //     </div>
          //   </div
          //   `;
          // });
          // mealsEl.innerHTML = output;
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `
            )
            .join("");
        }
      });
    //Clear search text
    searchInput.value = "";
  } else {
    alert("Please enter a valid search");
  }
}

//Event Listeners
submit.addEventListener("submit", searchMeal);
