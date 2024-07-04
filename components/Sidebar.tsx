import { Icon } from "@iconify/react";

type Porps = {
  title: string;
  isOpen?: boolean;
  onClose?: () => void;
  closeIcon?: string;
  children?: React.ReactNode;
};

const Sidebar = ({
  title,
  children,
  isOpen = false,
  onClose = () => {},
  closeIcon = "carbon:close",
}: Porps) => {
  return (
    <div
      className={`bg-[#171717] fixed top-0 right-0 w-80 h-full shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-neutral-600">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button onClick={onClose} className="hover:text-red-500">
          <Icon icon={closeIcon} />
        </button>
      </div>
      <div className="py-5 pr-4 pl-4">{children}</div>
    </div>
  );
};

export default Sidebar;
