'use client';

import { useState, useContext, useEffect } from 'react';
import Button from '@/components/Button';
import Image from '@/components/Image';
import QuantityPicker from '@/components/QuantityPicker';
import CartLink from '@/components/CartLink';
import { SiteContext, ContextProviderComponent } from '@/context/mainContext';

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

function ItemView({ product }: { product: Product }) {
  const [numberOfItems, updateNumberOfItems] = useState(1);
  const context = useContext(SiteContext);
  const { price, image, name, description } = product;

  if (!context) {
    throw new Error('ItemView must be used within a ContextProviderComponent');
  }

  const { addToCart } = context;

  function addItemToCart(product: Product) {
    const productWithQuantity = { ...product, quantity: numberOfItems };
    addToCart(productWithQuantity);
  }

  function increment() {
    updateNumberOfItems(numberOfItems + 1);
  }

  function decrement() {
    if (numberOfItems === 1) return;
    updateNumberOfItems(numberOfItems - 1);
  }

  return (
    <>
      <CartLink />
      <div className="
        sm:py-12
        md:flex-row
        py-4 w-full flex flex-1 flex-col my-0 mx-auto
      ">
        <div className="w-full md:w-1/2 h-120 flex flex-1 bg-light hover:bg-light-200">
          <div className="py-16 p10 flex flex-1 justify-center items-center">
            <Image src={image} alt="Inventory item" className="max-h-full" />
          </div>
        </div>
        <div className="pt-2 px-0 md:px-10 pb-8 w-full md:w-1/2">
          <h1 className="
           sm:mt-0 mt-2 text-5xl font-light leading-large
          ">{name}</h1>
          <h2 className="text-2xl tracking-wide sm:py-8 py-6">${price}</h2>
          <p className="text-gray-600 leading-7">{description}</p>
          <div className="my-6">
            <QuantityPicker
              increment={increment}
              decrement={decrement}
              numberOfitems={numberOfItems}
              hideQuantityLabel={false}
            />
          </div>
          <Button
            full
            title="Add to Cart"
            onClick={() => addItemToCart(product)}
          />
        </div>
      </div>
    </>
  );
}

export default function ProductClient({ product }: { product: Product }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <ContextProviderComponent>
      <ItemView product={product} />
    </ContextProviderComponent>
  );
}
