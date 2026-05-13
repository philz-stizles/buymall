import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { Container } from '..';
import { AppIcon, Button, IconButton, Logo } from '../../ui';
import {
  IoCartOutline,
  IoHeartOutline,
  IoLocationOutline,
  IoPersonCircleOutline,
} from 'react-icons/io5';
import { RoleType } from '../../../../src/types';
import { CurrentUser } from '../../../models/user';
import { Fragment, useState } from 'react';
import VendorSignupModal from '../../../pages/public/Home/components/VendorSignupModal/VendorSignupModal';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const currentUser = useLoaderData() as CurrentUser;
  const navigate = useNavigate();

  return (
    <Fragment>
      <header className="border-b">
        <Container
          fluid
          className="flex h-[70px] flex-row items-center justify-between max-xl:max-w-full gap-12"
        >
          <Logo />
          <nav className="flex-1 flex justify-center">
            <ul className="flex items-center gap-8 uppercase font-medium text-sm">
              <li>
                <Link to="#">Shop</Link>
              </li>
              <li>
                <Link to="#">About</Link>
              </li>
              <li>
                <Link to="#">Blog</Link>
              </li>
              <li>
                <Link to="#">Contact</Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              {currentUser && currentUser.user ? (
                <>
                  <Link
                    to={
                      currentUser.user.role === RoleType.ADMIN
                        ? '/admin'
                        : currentUser.user.role === RoleType.VENDOR
                        ? '/vendor'
                        : '/customer'
                    }
                    className="flex items-center gap-1"
                  >
                    <span>{currentUser.user.email}</span>{' '}
                    <AppIcon icon={IoPersonCircleOutline} />
                  </Link>
                </>
              ) : (
                <>
                  <Button onClick={() => setShowModal(true)}>
                    Become a Vendor
                  </Button>
                  <Link to="/signup" className="flex items-center gap-1">
                    <span>Sign up</span>{' '}
                    <AppIcon icon={IoPersonCircleOutline} />
                  </Link>
                </>
              )}
            </div>
            <div className="border-slate-300 h-4 w-[1px] lg:border-r border-r-2"></div>
            <div className="flex items-center gap-2">
              <IconButton
                size="sm"
                icon={IoHeartOutline}
                onClick={() => navigate('/favorites')}
              />
              <IconButton
                size="sm"
                icon={IoCartOutline}
                onClick={() => navigate('/cart')}
              />
              <IconButton
                size="sm"
                icon={IoLocationOutline}
                onClick={() => navigate('/location')}
              />
            </div>
          </div>
        </Container>
      </header>
      <VendorSignupModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </Fragment>
  );
};

export default Header;
