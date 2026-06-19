import inventory from "./inventory";

async function fetchCategories() {
  const categories = inventory.reduce((acc, next) => {
    next.categories.forEach((category) => {
      if (!acc.includes(category)) {
        acc.push(category);
      }
    });
    return acc;
  }, []);
  return categories;
}

export default fetchCategories;
