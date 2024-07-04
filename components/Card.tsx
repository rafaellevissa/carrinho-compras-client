type Props = {
  title: string;
  subtitle: number;
  hero: string;
};

const Card = ({ title, subtitle, hero }: Props) => {
  return (
    <div className="bg-black text-white p-4 rounded-lg shadow-md border border-neutral-600">
      <img src={hero} alt={title} className="w-full h-auto" />
      <h2 className="mt-2 text-xl text-center">{title}</h2>
      <p className="text-blue-500 text-center">{subtitle}</p>
    </div>
  );
};

export default Card;
