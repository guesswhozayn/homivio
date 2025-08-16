'use client';

import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import { FaTimes, FaLongArrowAltRight } from 'react-icons/fa';
import { SiteContext, ContextProviderComponent } from '@/context/mainContext';
import DENOMINATION from '@/utils/currencyProvider';
import { slugify } from '@/utils/helpers';
import QuantityPicker from '@/components/QuantityPicker';
import Image from '@/components/Image';
import CartLink from '@/components/CartLink';

function Cart() {
  const [renderClientSideComponent, setRenderClientSideComponent] = useState(false);
  const context = useContext(SiteContext);

  useEffect(() => {
    setRenderClientSideComponent(true);
  }, []);

  if (!context) {
    return <div>Loading...</div>;
  }

  const {
    numberOfItemsInCart,
    cart,
    removeFromCart,
    total,
    setItemQuantity
  } = context;

  const cartEmpty = numberOfItemsInCart === 0;

  function increment(item) {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    setItemQuantity(updatedItem);
  }

  function decrement(item) {
    if (item.quantity === 1) return;
    const updatedItem = { ...item, quantity: item.quantity - 1 };
    setItemQuantity(updatedItem);
  }

  if (!renderClientSideComponent) return <div>Loading...</div>;

  return (
    <>
      <CartLink />
      <div className="flex flex-col items-center pb-10">
        <div className="flex flex-col w-full c_large:w-c_large">
          <div className="pt-10 pb-8">
            <h1 className="text-5xl font-light">Your Cart</h1>
          </div>

          {cartEmpty ? (
            <h3>No items in cart.</h3>
          ) : (
            <div className="flex flex-col">
              <div>
                {cart.map((item) => {
                  return (
                    <div className="border-b py-10" key={item.id}>
                      {/* Desktop */}
                      <div className="items-center hidden md:flex">
                        <Link href={`/product/${slugify(item.name)}`} aria-label={item.name}>
                          <Image className="w-32 m-0" src={item.image} alt={item.name} />
                        </Link>
                        <Link href={`/product/${slugify(item.name)}`} aria-label={item.name}>
                          <p className="m-0 pl-10 text-gray-600 w-60">
                            {item.name}
                          </p>
                        </Link>
                        <div className="ml-4">
                          <QuantityPicker
                            numberOfitems={item.quantity}
                            increment={() => increment(item)}
                            decrement={() => decrement(item)}
                            hideQuantityLabel={false}
                          />
                        </div>
                        <div className="flex flex-1 justify-end">
                          <p className="m-0 pl-10 text-gray-900 tracking-wider">
                            {DENOMINATION + item.price}
                          </p>
                        </div>
                        <div 
                          role="button" 
                          onClick={() => removeFromCart(item)} 
                          className="m-0 ml-10 text-gray-900 text-s cursor-pointer"
                        >
                          <FaTimes />
                        </div>
                      </div>

                      {/* Mobile */}
                      <div className="flex items-center md:hidden">
                        <Link href={`/product/${slugify(item.name)}`}>
                          <Image className="w-32 m-0" src={item.image} alt={item.name} />
                        </Link>
                        <div>
                          <Link href={`/product/${slugify(item.name)}`} aria-label={item.name}>
                            <p className="m-0 pl-6 text-gray-600 text-base">
                              {item.name}
                            </p>
                          </Link>
                          <div className="ml-6 mt-4 mb-2">
                            <QuantityPicker
                              hideQuantityLabel
                              numberOfitems={item.quantity}
                              increment={() => increment(item)}
                              decrement={() => decrement(item)}
                            />
                          </div>
                          <div className="flex flex-1">
                            <p className="text-lg m-0 pl-6 pt-4 text-gray-900 tracking-wider">
                              {DENOMINATION + item.price}
                            </p>
                          </div>
                        </div>
                        <div 
                          role="button" 
                          onClick={() => removeFromCart(item)} 
                          className="m-0 ml-10 text-gray-900 text-s cursor-pointer mr-2"
                        >
                          <FaTimes />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          <div className="flex flex-1 justify-end py-8">
            <p className="text-sm pr-10">Total</p>
            <p className="font-semibold tracking-wide">{DENOMINATION + total}</p>
          </div>
          {!cartEmpty && (
            <Link href="/checkout" className="flex flex-1 justify-end" aria-label="Check out">
              <div className="cursor-pointer flex items-center">
                <p className="text-gray-600 text-sm mr-2">Proceed to check out</p>
                <FaLongArrowAltRight className="text-gray-600" />
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

function CartWithContext() {
  return (
    <ContextProviderComponent>
      <Cart />
    </ContextProviderComponent>
  );
}

export default CartWithContext;
