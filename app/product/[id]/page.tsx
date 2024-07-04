"use client";

import Carousel from "@/components/Carrousel";
import { fetchProductById } from "@/store/productSlice";
import { attach } from "@/store/shoppingCartSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";

type Props = {
  params: { id: number };
};

export default function ProductPage({ params: { id } }: Props) {
  const dispatch = useAppDispatch();

  const { product } = useAppSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch]);

  return (
    <>
      <div className="bg-black text-white p-4 rounded-lg shadow-md border border-neutral-600">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <img src={product?.thumbnail} className="" />
          </div>
          <div className="pr-5 pl-5">
            <h1 className="my-5 text-xl">{product?.name}</h1>
            <span className="p-3 bg-blue-500 text-sm font-medium me-2 rounded dark:bg-blue-500">
              {product?.price}
            </span>
            <p className="mt-5 mb-5 text-justify rounded-lg">
              {product?.description}
            </p>
            <div className="flex justify-center p-5 border-t border-neutral-600">
              <button
                onClick={() => product && dispatch(attach(product))}
                className="bg-blue-500 text-white py-2 px-4 rounded-full flex items-center justify-center hover:bg-blue-700 w-full"
              >
                <span className="text-lg mr-2">+</span> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Carousel images={product?.images || []} />
    </>
  );
}
