import { Link, useLoaderData } from 'react-router-dom';
import { Container } from '..';
import { AppIcon, Button, Logo } from '../../ui';
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
  console.log(currentUser);

  return (
    <Fragment>
      {' '}
      <header className="shadow-sm">
        <Container
          fluid
          className="flex h-[70px] flex-row items-center justify-between max-xl:max-w-full gap-12"
        >
          <Logo />
          <nav className="flex-1 flex justify-center">
            <ul className="flex items-center gap-8 uppercase font-medium">
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
              <AppIcon icon={IoHeartOutline} />
              <AppIcon icon={IoCartOutline} />
              <AppIcon icon={IoLocationOutline} />
            </div>
            <div className="border-slate-700 h-4 w-[1px] lg:border-r border-r"></div>
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
                  <Button onClick={() => setShowModal(true)}>Become a Vendor</Button>
                  <Link to="/signup" className="flex items-center gap-1">
                    <span>Sign up</span>{' '}
                    <AppIcon icon={IoPersonCircleOutline} />
                  </Link>
                </>
              )}
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
