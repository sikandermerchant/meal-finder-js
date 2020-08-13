const searchInput = document.getElementById('search');
const submit = document.getElementById('submit');
const randomBtn = document.getElementById('random');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const single_mealEl = document.getElementById('single-meal');

//Search Meal and fetch from API Function
function searchMeal(e) {
  e.preventDefault();

  //clear single meal
  single_mealEl.innerHTML = '';

  //Get search term
  const searchTerm = searchInput.value;

  //Check for empty
  if (searchTerm.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        console.log(meals)
      })
  } else {
    alert('Please enter a valid search');
  }
}

//Event Listeners
submit.addEventListener('submit', searchMeal);