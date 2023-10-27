import "./Spinner.css";

type Props = {
  size?: number;
};

const Spinner = ({ size }: Props) => {
  return (
    <div className="relative flex items-center justify-start h-5 w-5 text-white dot-spinner">
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className="absolute top-0 left-0 flex items-center justify-start h-full w-full dot-spinner__dot"
        ></div>
      ))}
    </div>
  );
};

export default Spinner;
