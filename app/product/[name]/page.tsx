import { fetchInventory } from '@/utils/inventoryProvider';
import { slugify } from '@/utils/helpers';
import ProductClient from './ProductClient';

interface Product {
  id?: string;
  name: string;
  price: string | number;
  image: string;
  description: string;
  categories: string[];
  brand?: string;
  currentInventory?: number;
}

interface ProductPageProps {
  params: Promise<{
    name: string;
  }>;
}


async function getProduct(name: string): Promise<Product | null> {
  const inventory = await fetchInventory();
  const product = inventory.find((item: any) => slugify(item.name) === slugify(name));
  return product || null;
}

export async function generateStaticParams() {
  const inventory = await fetchInventory();
  
  return inventory.map((item: any) => ({
    name: slugify(item.name),
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const productName = resolvedParams.name.replace(/-/g, ' ');
  const product = await getProduct(productName);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductClient product={product} />;
}
