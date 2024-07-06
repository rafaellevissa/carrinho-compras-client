"use client";

import Carousel from "@/components/Carrousel";
import Loading from "@/components/Loading";
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
  const [buttonState, setButtonState] = useState<
    "idle" | "loading" | "success"
  >("idle");

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const annualPrice = useMemo(() => product?.price ?? 0, [product]);
  const monthlyPrice = useMemo(() => annualPrice / 12, [product]);

  const handleAddToCart = async () => {
    if (product) {
      setButtonState("loading");
      try {
        await dispatch(attach(product)).unwrap();
        setButtonState("success");
        setTimeout(() => setButtonState("idle"), 2000);
      } catch (error) {
        setButtonState("idle");
      }
    }
  };

  const renderButtonContent = () => {
    switch (buttonState) {
      case "loading":
        return <Loading />;
      case "success":
        return <Icon fontSize={30} icon="mdi:success" />;
      case "idle":
      default:
        return (
          <>
            <Icon icon="iconoir:plus" fontSize={20} /> Add to Cart
          </>
        );
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
            <div className="mt-auto">
              <div className="flex justify-center p-5 border-t border-neutral-600">
                <button
                  onClick={handleAddToCart}
                  className={`${
                    buttonState === "idle"
                      ? "bg-blue-500 text-white py-2 px-4 rounded-full flex items-center justify-center hover:bg-blue-700 w-full"
                      : ""
                  } ${
                    buttonState === "loading" || buttonState === "success"
                      ? "bg-blue-500 text-white h-12 w-12 rounded-full flex items-center justify-center"
                      : ""
                  }`}
                  disabled={buttonState !== "idle"}
                >
                  {renderButtonContent()}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Carousel images={product?.images || []} />
    </>
  );
}
