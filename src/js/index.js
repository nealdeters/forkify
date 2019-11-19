import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {elements, renderLoader, clearLoader} from './views/base';

// Global state of the app
// - search object
// - current recipe object
// - shopping list object
// - liked recipes
const state = {};

// SEARCH CONTROLLER
const controlSearch = async() => {
  // 1) get query from the view
  const query = searchView.getInput();

  if(query){
    // 2) new search object and add to state
    state.search = new Search(query);

    // 3) prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // 4) search for recipes
      await state.search.getResults();

      // 5) render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch(error){
      alert('Something wrong with the search...');
      clearLoader();
    }
  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if(btn){
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

// RECIPE CONTROLLER
const controlRecipe = async () => {
  // get id from url
  const id = window.location.hash.replace('#', '');
  
  if(id){
    // prepare the UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // highlight the selectd search item
    if(state.search) searchView.highlightSelected(id);

    // create new recipe object
    state.recipe = new Recipe(id);

    try {
      // get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // calculate servings and time
      state.recipe.calcServings();
      state.recipe.calcTime();

      // render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch(error){
      alert('Error processing recipe');
    }
  }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));