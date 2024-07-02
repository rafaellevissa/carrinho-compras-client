import Link from "next/link";

const Header = () => {
  return (
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
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m1.15-6.65a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
              />
            </svg>
          </button>
          <button>
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h18l-1.68 14.35a2 2 0 01-1.99 1.65H6.67a2 2 0 01-1.99-1.65L3 3z"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
