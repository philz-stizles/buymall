import { MdPieChartOutlined } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center text-xl font-semibold">
      <MdPieChartOutlined size={32} className="text-indigo-500" />{' '}
      <span>BuyMall</span>
    </Link>
  );
};

export default Logo;
