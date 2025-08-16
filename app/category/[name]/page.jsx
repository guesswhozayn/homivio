import { Metadata } from 'next';
import ListItem from '@/components/ListItem';
import { titleIfy, slugify } from '@/utils/helpers';
import fetchCategories from '@/utils/categoryProvider';
import inventoryForCategory from '@/utils/inventoryForCategory';
import CartLink from '@/components/CartLink';

export async function generateStaticParams() {
  const categories = await fetchCategories();
  
  return categories.map((category) => ({
    name: slugify(category),
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const category = resolvedParams.name.replace(/-/g, ' ');
  const title = titleIfy(category);
  
  return {
    title: `Jamstack ECommerce - ${title}`,
    description: `Jamstack ECommerce - ${title}`,
    openGraph: {
      title: `Jamstack ECommerce - ${title}`,
    },
  };
}

export default async function Category({ params }) {
  const resolvedParams = await params;
  const category = resolvedParams.name.replace(/-/g, ' ');
  const inventory = await inventoryForCategory(category);
  const title = titleIfy(category);

  return (
    <>
      <CartLink />
      <div className="flex flex-col items-center">
        <div className="max-w-fw flex flex-col w-full">
          <div className="pt-4 sm:pt-10 pb-8">
            <h1 className="text-5xl font-light">{title}</h1>
          </div>

          <div>
            <div className="flex flex-1 flex-wrap flex-row">
              {
                inventory.map((item, index) => {
                  return (
                    <ListItem
                      key={index}
                      link={`/product/${slugify(item.name)}`}
                      title={item.name}
                      price={item.price}
                      imageSrc={item.image}
                    />
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}