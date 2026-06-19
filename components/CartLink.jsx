"use client";

import { useState, useEffect, useContext } from "react";
import { SiteContext } from "../context/mainContext";
import { FaShoppingCart, FaCircle } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { colors } from "../theme";

const { primary } = colors;

function CartLink() {
  const context = useContext(SiteContext);
  const { numberOfItemsInCart = 0 } = context || {};
  const [renderClientSideComponent, setRenderClientSideComponent] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setRenderClientSideComponent(true);
  }, []);

  if (pathname === "/cart" || pathname === "/checkout") {
    return null;
  }

  return (
    <div>
      <div className="fixed sm:top-53 right-24 desktop:right-flexiblemargin top-40 z-10">
        <div className="flex flex-1 justify-end pr-4 relative">
          <Link href="/cart" aria-label="Cart">
            <FaShoppingCart />
          </Link>
          {renderClientSideComponent && numberOfItemsInCart > 0 && (
            <FaCircle color={primary} size={12} suppressHydrationWarning />
          )}
        </div>
      </div>
    </div>
  );
}

export default CartLink;
