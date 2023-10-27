import { IoClose } from "react-icons/io5";

type Props = {
  message: string;
  color?: string;
  icon?: string;
  onClick?: () => void;
};

const Banner = ({ message, color, onClick }: Props) => {
  return (
    <div className="flex bg-purple-500 text-white p-6" color={color}>
      <div className="flex-1 flex justify-center">{message}</div>
      <div>
        <button className="btn-plain" onClick={onClick}>
          <IoClose />
        </button>
      </div>
    </div>
  );
};

export default Banner;
