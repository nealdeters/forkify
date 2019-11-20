import uniqid from 'uniqid';

export default class List = {
  constructor() {
    this.items = [];
  }

  addItem (count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient,
    }

    // add item to the list
    this.items.push(item);
    return item;
  }

  removeItem (id) {
    const index = this.items.findIndex(el => el.id === id);
    
    // remove item from the list
    this.items.splice(index, 1);
  }

  updateCount (id, newCount) {
    // find item and update the count
    this.items.find(el => el.id === id).count = newCount;
  }
}