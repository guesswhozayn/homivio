import inventory from './inventory'
// Assuming each item in inventory has a categories property (array of strings)

async function fetchCategories() {
  const categories = inventory.reduce((acc, next) => {
    next.categories.forEach(category => {
      if (!acc.includes(category)) {
        acc.push(category)
      }
    })
    return acc
  }, [])

  return categories
}

export default fetchCategories