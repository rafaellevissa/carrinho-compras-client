import { ShoppingCartContext } from "@/contexts/shopping-cart";
import { useContext } from "react";

const useShoppingCartContext = () => useContext(ShoppingCartContext);

export default useShoppingCartContext;
