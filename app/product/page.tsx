"use client";

import Carousel from "@/components/Carrousel";

export default function ProductPage() {
  const images = [
    "https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%201.webp",
    "https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%202.webp",
    "https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%203.webp",
    "https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%204.webp",
    "https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%205.webp",
    "https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%206.webp",
    "https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%207.webp",
    "https://v2-allugator-images.s3.amazonaws.com/products/acer%20vero%208.webp",
  ];

  return (
    <>
      <div className="bg-black text-white p-4 rounded-lg shadow-md border border-neutral-600">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <img
              src="https://i.zst.com.br/thumbs/12/31/18/-745569221.jpg"
              className=""
            />
          </div>
          <div className="pr-5 pl-5">
            <h1 className="my-5 text-xl">Acme Hoodie</h1>
            <span className="p-3 bg-blue-500 text-sm font-medium me-2 rounded dark:bg-blue-500">
              $50.00USD
            </span>
            <p className="mt-5 mb-5 text-justify rounded-lg">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <div className="flex justify-center p-5 border-t border-neutral-600">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-full flex items-center justify-center hover:bg-blue-700 w-full">
                <span className="text-lg mr-2">+</span> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Carousel images={images} />
    </>
  );
}
