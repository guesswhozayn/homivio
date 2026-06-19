"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const STORAGE_KEY = "NEXT_ECOMMERCE_STARTER_";

const initialState = {
  cart: [],
  numberOfItemsInCart: 0,
  total: 0,
};

const SiteContext = React.createContext(undefined);

function calculateTotal(cart) {
  return cart.reduce((acc, next) => {
    const quantity = next.quantity;
    return acc + JSON.parse(next.price) * quantity;
  }, 0);
}

function ContextProviderComponent({ children }) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storageState = window.localStorage.getItem(STORAGE_KEY);
      if (!storageState) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
      } else {
        setState(JSON.parse(storageState));
      }
    }
  }, []);

  const setItemQuantity = (item) => {
    const storageState = JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) || '{"cart": []}',
    );
    const { cart } = storageState;
    const index = cart.findIndex((cartItem) => cartItem.id === item.id);
    cart[index].quantity = item.quantity;
    const updatedState = {
      cart,
      numberOfItemsInCart: cart.length,
      total: calculateTotal(cart),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
    setState(updatedState);
  };

  const addToCart = (item) => {
    const storageState = JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) || '{"cart": []}',
    );
    const { cart } = storageState;
    if (cart.length) {
      const index = cart.findIndex((cartItem) => cartItem.id === item.id);
      if (index >= 0) {
        cart[index].quantity = cart[index].quantity + item.quantity;
      } else {
        cart.push(item);
      }
    } else {
      cart.push(item);
    }

    const updatedState = {
      cart,
      numberOfItemsInCart: cart.length,
      total: calculateTotal(cart),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
    toast("Successfully added item to cart!", { position: "top-left" });
    setState(updatedState);
  };

  const removeFromCart = (item) => {
    const storageState = JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) || '{"cart": []}',
    );
    let { cart } = storageState;
    cart = cart.filter((c) => c.id !== item.id);

    const updatedState = {
      cart,
      numberOfItemsInCart: cart.length,
      total: calculateTotal(cart),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
    setState(updatedState);
  };

  const clearCart = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
    setState(initialState);
  };

  return (
    <SiteContext.Provider
      value={{
        ...state,
        addToCart,
        clearCart,
        removeFromCart,
        setItemQuantity,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export { SiteContext, ContextProviderComponent };
