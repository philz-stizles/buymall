import "./Loader.css";

type Props = {
  dots?: number;
};

const Loader = ({ dots = 5 }: Props) => {
  return (
    <div className="Loader">
      {Array.from({ length: dots }, (_, i) => (
        <div key={i} className="dot"></div>
      ))}
    </div>
  );
};

export default Loader;
