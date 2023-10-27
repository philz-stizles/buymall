import { IconType } from 'react-icons';

type Props = {
  icon: IconType;
};

const AppIcon = ({ icon: Icon }: Props) => {
  return <Icon size={24} />;
};

export default AppIcon;
