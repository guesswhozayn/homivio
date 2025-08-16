import { Metadata } from 'next';
import { titleIfy, slugify } from '@/utils/helpers';
import { DisplayMedium } from '@/components';
import CartLink from '@/components/CartLink';
import { fetchInventory } from '@/utils/inventoryProvider';

export const metadata = {
  title: 'Jamstack ECommerce - All Categories',
  description: 'Jamstack ECommerce - All categories',
  openGraph: {
    title: 'Jamstack ECommerce - All Categories',
  },
};

export default async function Categories() {
  const inventory = await fetchInventory();
  
  const inventoryCategories = inventory.reduce((acc, next) => {
    const categories = next.categories;
    categories.forEach(c => {
      const index = acc.findIndex(item => item.name === c);
      if (index !== -1) {
        const item = acc[index];
        item.itemCount += 1;
        acc[index] = item;
      } else {
        const item = {
          name: c,
          image: next.image,
          itemCount: 1
        };
        acc.push(item);
      }
    });
    return acc;
  }, []);

  return (
    <>
      <div className="w-full">
        <CartLink />
        <div className="pt-4 sm:pt-10 pb-8">
          <h1 className="text-5xl font-light">All categories</h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {
              inventoryCategories.map((category, index) => (
                <DisplayMedium
                  key={index}
                  imageSrc={category.image}
                  subtitle={`${category.itemCount} items`}
                  title={titleIfy(category.name)}
                  link={`/category/${slugify(category.name)}`}
                />
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
}