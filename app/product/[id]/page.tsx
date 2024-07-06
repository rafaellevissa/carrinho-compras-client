"use client";

import Carousel from "@/components/Carrousel";
import Loading from "@/components/Loading";
import LoadingButton from "@/components/LoadingButton";
import { fetchProductById } from "@/store/productSlice";
import { attach } from "@/store/shoppingCartSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { Icon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";

type Props = {
  params: { id: number };
};

export default function ProductPage({ params: { id } }: Props) {
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const annualPrice = useMemo(() => product?.price ?? 0, [product]);
  const monthlyPrice = useMemo(() => annualPrice / 12, [product]);

  const handleAddToCart = async () => {
    if (product) {
      await dispatch(attach(product)).unwrap();
    }
  };

  return (
    <>
      <div className="bg-black text-white p-4 rounded-lg shadow-md border border-neutral-600">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-center py-5">
            <img src={product?.thumbnail} width={300} />
          </div>
          <div className="pr-5 pl-5 flex flex-col justify-between">
            <div>
              <h1 className="my-5 text-xl">{product?.name}</h1>
              <div className="flex gap-4 my-4">
                <div className="flex-1 p-4 border border-white text-white text-sm font-medium rounded-lg">
                  <div className="text-center">Monthly Payment</div>
                  <div className="text-center">${monthlyPrice.toFixed(2)}</div>
                </div>
                <div className="flex-1 p-4 border border-white text-white text-sm font-medium rounded-lg">
                  <div className="text-center">Annual Payment</div>
                  <div className="text-center">${annualPrice.toFixed(2)}</div>
                </div>
              </div>
              <p className="mt-5 mb-5 text-justify rounded-lg">
                {product?.description}
              </p>
            </div>
            <LoadingButton onClick={handleAddToCart}>
              <Icon icon="iconoir:plus" fontSize={20} /> Add to Cart
            </LoadingButton>
          </div>
        </div>
      </div>
      <Carousel images={product?.images || []} />
    </>
  );
}
