import Link from "next/link";
import { Icon } from "@iconify/react";
import { toggleShoppingCart } from "@/store/shoppingCartSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";

const Header = () => {
  const dispatch = useAppDispatch();
  const { itemsCount } = useAppSelector(
    (state: RootState) => state.shoppingCart
  );

  return (
    <>
      <header className="bg-black text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold">
              ALLU
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search for products..."
              className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none"
            />
            <button>
              <Icon fontSize={25} icon="carbon:search" />
            </button>
            <button
              onClick={() => dispatch(toggleShoppingCart())}
              type="button"
              className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-transparent rounded-lg hover:bg-transparent focus:ring-0 focus:outline-none dark:bg-transparent dark:hover:bg-transparent"
            >
              <Icon fontSize={25} icon="carbon:shopping-cart" />
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                {itemsCount}
              </div>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
