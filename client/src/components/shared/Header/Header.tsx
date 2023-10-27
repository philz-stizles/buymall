import { Link } from 'react-router-dom';
import { Container } from '..';
import { AppIcon, Button, Logo } from '../../ui';
import {
  IoCartOutline,
  IoLocationOutline,
  IoPersonCircleOutline,
} from 'react-icons/io5';
import { useAuth } from '../../../context';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="shadow-sm">
      <Container className="flex h-[60px] flex-row items-center justify-between max-xl:max-w-full gap-12">
        <Logo />
        <nav className="flex-1">
          <ul className="flex items-center gap-6">
            <li>
              <Link to="#">Shop</Link>
            </li>
            <li>
              <Link to="#">Vendors</Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <AppIcon icon={IoCartOutline} />
            <AppIcon icon={IoLocationOutline} />
          </div>
          <div className="border-slate-700 h-4 w-[1px] lg:border-r border-r"></div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/signup" className="flex items-center gap-1">
                  <span>{user.email}</span> <AppIcon icon={IoPersonCircleOutline} />
                </Link>
              </>
            ) : (
              <>
                <Button onClick={() => {}}>Become a Vendor</Button>
                <Link to="/signup" className="flex items-center gap-1">
                  <span>Sign up</span> <AppIcon icon={IoPersonCircleOutline} />
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
