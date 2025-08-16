import { fetchInventory } from './inventoryProvider';
import { inventoryByCategory } from './inventoryByCategory';

function normalizeInventory(items) {
  return items.map(item => ({
    ...item,
    price: typeof item.price === 'string' ? item.price : String(item.price),
  }));
}

async function inventoryForCategory(category) {
  const inventory = await fetchInventory();
  const normalized = normalizeInventory(inventory);
  const byCategory = inventoryByCategory(normalized);
  return byCategory[category]?.items ?? [];
}

export default inventoryForCategory;
