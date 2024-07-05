import { useEffect } from "react";
import { Icon } from "@iconify/react";
import Sidebar from "./Sidebar";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { all, detach, toggleShoppingCart } from "@/store/shoppingCartSlice";
import { checkout } from "@/store/orderSlice";

type ShoppingCartEmptyProps = {
  text: string;
};

const ShoppingCartEmpty = ({ text }: ShoppingCartEmptyProps) => (
  <p className="text-sm">{text}</p>
);

type ShoppingCartItemProps = {
  image: string;
  name: string;
  price: number;
  quantity: number;
  onRemove: () => void;
};

const ShoppingCartItem = ({
  image,
  name,
  price,
  quantity = 1,
  onRemove,
}: ShoppingCartItemProps) => (
  <div className="relative flex items-center mb-4 border-b border-neutral-600 pb-4">
    <button
      onClick={onRemove}
      className="absolute left-0 top-0 transform -translate-x-1/2 -translate-y-3/4 mt-1 ml-0 text-white hover:text-red-500 focus:outline-none z-10"
    >
      <Icon icon="iconamoon:close-circle-1-fill" fontSize={25} />
    </button>
    <div className="mr-4">
      <img
        src={image}
        alt={name}
        className="w-16 h-16 rounded-md object-cover"
      />
    </div>
    <div className="flex-1">
      <h3 className="text-md font-medium">{name}</h3>
    </div>
    <div className="flex flex-col items-end">
      <span className="p-1 bg-blue-500 text-sm font-medium me-2 rounded dark:bg-blue-500">
        <p>${price}</p>
      </span>
      <span className="text-sm mt-2">
        <p>Quantity: {quantity}</p>
      </span>
    </div>
  </div>
);

type Props = {
  emptyText: string;
};

export default function ShoppingCart({ emptyText }: Props) {
  const dispatch = useAppDispatch();

  const { isShoppingCartOpen, totalPrice, items, isEmpty } = useAppSelector(
    (state: RootState) => state.shoppingCart
  );

  useEffect(() => {
    dispatch(all());
  }, [dispatch]);

  return (
    <Sidebar
      isOpen={isShoppingCartOpen}
      title="Shopping Cart"
      onClose={() => dispatch(toggleShoppingCart())}
    >
      <div className="flex flex-col h-full">
        <div
          className="flex-grow overflow-y-auto p-4"
          style={{ maxHeight: "calc(100vh - 160px)" }}
        >
          {items.map(({ metadata, quantity, productId }, index) => (
            <ShoppingCartItem
              key={index}
              image={metadata.thumbnail}
              name={metadata.name}
              price={metadata.price}
              quantity={quantity}
              onRemove={() => dispatch(detach(productId))}
            />
          ))}

          {isEmpty && <ShoppingCartEmpty text={emptyText} />}
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-[#171717] p-4 border-t border-neutral-600 z-10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium">Total:</span>
            <span className="text-lg font-medium">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <button
            onClick={() => dispatch(checkout(items))}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </Sidebar>
  );
}
