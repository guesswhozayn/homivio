import inventory from "./inventory";

async function fetchInventory() {
  return Promise.resolve(
    inventory.map((item) => ({
      ...item,
      price: Number(item.price),
    })),
  );
}

export { fetchInventory, inventory as staticInventory };
