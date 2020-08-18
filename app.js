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

//Function for fetch meal by ID
function getMealByID(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

//Function to add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  single_mealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
      </div>
      <div class "main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
}

//Function to fetch random meal
function getRandomMeal() {
  //clear meals and headings if there
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const randomMeal = data.meals[0];
      addMealToDOM(randomMeal);
    });
}

//Event Listeners
submit.addEventListener("submit", searchMeal);
randomBtn.addEventListener("click", getRandomMeal);
mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealByID(mealID);
  }
});
