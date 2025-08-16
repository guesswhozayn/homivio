import { Center, Footer, Tag, Showcase, DisplaySmall, DisplayMedium } from '@/components';
import { titleify, slugify } from '@/utils/helpers';
import { fetchInventory } from '@/utils/inventoryProvider';
import CartLink from '@/components/CartLink';

export const metadata = {
  title: 'ECommerce',
  description: 'ECommerce Next provides a way to quickly get up and running with a fully configurable ECommerce site using Next.js.',
  openGraph: {
    title: 'ECommerce',
  },
};

export default async function Home() {
  const inventory = await fetchInventory();
  const displayInventory = inventory.slice(0, 4);

  const inventoryCategorized = inventory.reduce((acc, next) => {
    next.categories.forEach(c => {
      const index = acc.findIndex(item => item.name === c);
      if (index !== -1) {
        acc[index].itemCount += 1;
      } else {
        acc.push({ name: c, image: next.image, itemCount: 1 });
      }
    });
    return acc;
  }, []);

  const categories = inventoryCategorized.slice(0, 2);

  return (
    <>
      <CartLink />
      <div className="w-full">
        <div className="bg-blue-300 p-6 pb-10 smpb-6 flex lg:flex-row flex-col">
          <div className="pt-4 pl-2 sm:pt-12 sm:pl-12 flex flex-col">
            <Tag year="2024" category="SOFAS" />
            <Center
              price="50000"
              title={displayInventory[2].name}
              link={`/product/${slugify(displayInventory[2].name)}`}
            />
            <Footer designer="Zayn" />
          </div>
          <div className="flex flex-1 justify-center items-center relative">
            <Showcase imageSrc={displayInventory[2].image} />
            <div className="absolute w-48 h-48 sm:w-72 sm:h-72 xl:w-88 xl:h-88 bg-white z-0 rounded-full" />
          </div>
        </div>
      </div>
      
      <div className="lg:my-8 lg:grid-cols-2 grid-cols-1 grid gap-4 my-4">
        {categories.map((category, index) => (
          <DisplayMedium
            key={index}
            imageSrc={category.image}
            subtitle={`${category.itemCount} items`}
            title={titleify(category.name)}
            link={`/category/${slugify(category.name)}`}
          />
        ))}
      </div>
      
      <div className="pt-10 pb-6 flex flex-col items-center">
        <h2 className="text-4xl mb-3">Trending Now</h2>
        <p className="text-gray-600 text-sm">
          Find the perfect piece or accessory to finish off your favorite room in the house.
        </p>
      </div>
      
      <div className="my-8 flex flex-col lg:flex-row justify-between">
        {displayInventory.map((item, index) => (
          <DisplaySmall
            key={index}
            imageSrc={item.image}
            title={item.name}
            subtitle={item.categories[0]}
            link={`/product/${slugify(item.name)}`}
          />
        ))}
      </div>
    </>
  );
}