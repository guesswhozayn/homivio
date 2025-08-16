import { fetchInventory } from '@/utils/inventoryProvider';
import { slugify } from '@/utils/helpers';
import ProductClient from './ProductClient';

async function getProduct(name) {
  const inventory = await fetchInventory();
  const product = inventory.find((item) => slugify(item.name) === slugify(name));
  return product || null;
}

export async function generateStaticParams() {
  const inventory = await fetchInventory();
  
  return inventory.map((item) => ({
    name: slugify(item.name),
  }));
}

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const productName = resolvedParams.name.replace(/-/g, ' ');
  const product = await getProduct(productName);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductClient product={product} />;
}
