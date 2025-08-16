function inventoryByCategory(inventory) {
  return inventory.reduce((acc, next) => {
    next.categories.forEach(c => {
      if (acc[c]) {
        acc[c].items.push(next);
      } else {
        acc[c] = { items: [next] };
      }
    });
    return acc;
  }, {});
}

export { inventoryByCategory };
