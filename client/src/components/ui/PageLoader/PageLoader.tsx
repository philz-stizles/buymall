import { ClipLoader } from 'react-spinners';

const PageLoader = () => {
  return (
    <div className="flex-1 flex h-full w-full items-center justify-center">
      <ClipLoader color="#3498db" size={50} />
    </div>
  );
};

export default PageLoader;
