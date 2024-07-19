"use client";

import Link from "next/link";
import Nav from "./Nav";
import CartSidebar from "./CartSidebar";
import { CgShoppingBag } from "react-icons/cg";
import { useShoppingCart } from "use-shopping-cart";

const Header = () => {
  const { cartCount, handleCartClick } = useShoppingCart();
  return (
    <header className="bg-white shadow-lg sticky top-0 py-4 z-40">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center hover:text-current">
          <h1 className="text-[26px] font-bold">
            <span className="text-accent">B</span>ikezz
          </h1>
        </Link>
        <div className="flex items-center gap-6">
          <Nav containerStyles="flex gap-[36px]" />
          <div
            onClick={() => handleCartClick()}
            className="relative cursor-pointer"
          >
            <CgShoppingBag className="text-[26px]" />
            <div className="bg-accent w-5 h-5 absolute -right-1 -bottom-1 rounded-full text-white flex items-center justify-center text-xs font-medium">
              {cartCount}
            </div>
          </div>
          <CartSidebar />
        </div>
      </div>
    </header>
  );
};

export default Header;
