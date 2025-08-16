import { toast } from 'react-toastify'
import React, { useState, useEffect, useCallback } from 'react'
const STORAGE_KEY = 'NEXT_ECOMMERCE_STARTER_'

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image?: string;
}

interface SiteState {
  cart: CartItem[];
  numberOfItemsInCart: number;
  total: number;
}

interface SiteContextValue extends SiteState {
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
  removeFromCart: (item: CartItem) => void;
  setItemQuantity: (item: CartItem) => void;
}

const initialState: SiteState = {
  cart: [],
  numberOfItemsInCart: 0,
  total: 0
}

const SiteContext = React.createContext<SiteContextValue | undefined>(undefined)

function calculateTotal(cart: CartItem[]): number {
  const total = cart.reduce((acc, next) => {
    const quantity = next.quantity
    acc = acc + JSON.parse(next.price) * quantity
    return acc
  }, 0)
  return total
}

interface ContextProviderProps {
  children: React.ReactNode;
}

function ContextProviderComponent({ children }: ContextProviderProps) {
  const [state, setState] = useState<SiteState>(initialState);
  const [forceUpdateCounter, setForceUpdateCounter] = useState(0);

  // Force update function to replace this.forceUpdate()
  const forceUpdate = useCallback(() => {
    setForceUpdateCounter(prev => prev + 1);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storageState = window.localStorage.getItem(STORAGE_KEY)
      if (!storageState) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState))
      } else {
        setState(JSON.parse(storageState));
      }
    }
  }, []);

  const setItemQuantity = (item: CartItem) => {
    const storageState = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{"cart": []}');
    const { cart }: { cart: CartItem[] } = storageState;
    const index = cart.findIndex(cartItem => cartItem.id === item.id);
    cart[index].quantity = item.quantity;
    const updatedState: SiteState = {
      cart, numberOfItemsInCart: cart.length, total: calculateTotal(cart)
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
    setState(updatedState);
  }

  const addToCart = (item: CartItem) => {
    const storageState = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{"cart": []}');
    const { cart }: { cart: CartItem[] } = storageState;
    if (cart.length) {
      const index = cart.findIndex(cartItem => cartItem.id === item.id);
      if (index >= Number(0)) {
        /* If this item is already in the cart, update the quantity */
        cart[index].quantity = cart[index].quantity + item.quantity;
      } else {
        /* If this item is not yet in the cart, add it */
        cart.push(item);
      }
    } else {
      /* If no items in the cart, add the first item. */
      cart.push(item);
    }

    const updatedState: SiteState = {
      cart, numberOfItemsInCart: cart.length, total: calculateTotal(cart)
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
    toast("Successfully added item to cart!", {
      position: 'top-left' as any
    });
    setState(updatedState);
  }

  const removeFromCart = (item: CartItem) => {
    const storageState = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{"cart": []}');
    let { cart }: { cart: CartItem[] } = storageState;
    cart = cart.filter(c => c.id !== item.id);

    const updatedState: SiteState = {
      cart, numberOfItemsInCart: cart.length, total: calculateTotal(cart)
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
    setState(updatedState);
  }

  const clearCart = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState))
    setState(initialState);
  }

  return (
    <SiteContext.Provider value={{
      ...state,
       addToCart,
       clearCart,
       removeFromCart,
       setItemQuantity
    }}>
     {children}
   </SiteContext.Provider>
  );
}

export {
  SiteContext,
  ContextProviderComponent
}