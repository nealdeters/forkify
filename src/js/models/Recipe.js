import axios from 'axios';

export default class Recipe {
  constructor(id){
    this.id = id;
  }

  async getRecipe(){
    try {
      const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
      this.title = res.data.recipe.title;
      this.auther = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch(error){
      alert('Something went wrong :(');
    }
  }

  calcTime() {
    // assuming that we need 15 min for each 3 ingredients
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'cup', 'pounds', 'pound'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'cup', 'pound', 'pound'];

    const newIngredients = this.ingredients.map( el => {
      // uniform units by replacing string values
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      })

      // remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, '');

      // parse ingredients into count, unit and ingredient
      return ingredient;
    })

    this.ingredients = newIngredients;
  }
}