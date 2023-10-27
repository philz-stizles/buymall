import { MdPieChartOutlined } from 'react-icons/md';

const Logo = () => {
  return (
    <h2 className="flex items-center text-lg font-semibold">
      <MdPieChartOutlined size={24} className="text-indigo-500" />{' '}
      <span>BuyMall</span>
    </h2>
  );
};

export default Logo;
