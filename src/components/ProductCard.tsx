const ProductCard = ({ name, price, image }: any) => {
  return (
    <div className="bg-black text-white p-4 rounded-lg shadow-md border border-neutral-600">
      <img src={image} alt={name} className="w-full h-auto" />
      <h2 className="mt-2 text-xl text-center">{name}</h2>
      <p className="text-blue-500 text-center">{price}</p>
    </div>
  );
};

export default ProductCard;
