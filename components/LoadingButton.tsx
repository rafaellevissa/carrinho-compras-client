import { ReactNode, useState } from "react";
import Loading from "./Loading";
import { Icon } from "@iconify/react";

type Props = {
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => Promise<void>;
};

const LoadingButton = ({
  children,
  disabled = false,
  onClick = async () => {},
}: Props) => {
  const [buttonState, setButtonState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleClick = async () => {
    if (disabled) return;
    setButtonState("loading");
    try {
      await onClick();
      setButtonState("success");
      setTimeout(() => setButtonState("idle"), 2000);
    } catch (error) {
      setButtonState("error");
      setTimeout(() => setButtonState("idle"), 2000);
    }
  };

  const renderButtonContent = () => {
    switch (buttonState) {
      case "loading":
        return <Loading />;
      case "error":
        return <Icon fontSize={30} icon="mdi:close" />;
      case "success":
        return <Icon fontSize={30} icon="mdi:success" />;
      case "idle":
      default:
        return children;
    }
  };

  return (
    <div className="mt-auto">
      <div className="flex justify-center p-5 border-t border-neutral-600">
        <button
          onClick={handleClick}
          className={`${
            buttonState === "idle"
              ? "bg-blue-500 text-white py-2 px-4 rounded-full flex items-center justify-center hover:bg-blue-700 w-full"
              : ""
          } ${
            buttonState === "loading"
              ? "bg-blue-500 text-white h-12 w-12 rounded-full flex items-center justify-center"
              : ""
          } ${
            buttonState === "success"
              ? "bg-green-500 text-white h-12 w-12 rounded-full flex items-center justify-center"
              : ""
          } ${
            buttonState === "error"
              ? "bg-red-500 text-white h-12 w-12 rounded-full flex items-center justify-center"
              : ""
          } ${
            buttonState !== "idle"
              ? "bg-black border border-white cursor-not-allowed"
              : ""
          }`}
          disabled={buttonState !== "idle"}
        >
          {renderButtonContent()}
        </button>
      </div>
    </div>
  );
};

export default LoadingButton;
