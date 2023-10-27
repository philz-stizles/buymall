import { FC } from 'react';
import { BsTwitter, BsFacebook } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Container } from '..';

const Footer = () => {
  return (
    <footer className=" bg-slate-900 text-indigo-100 text-base">
      <FooterTop />
      <FooterBottom />
    </footer>
  );
};

const FooterTop = () => {
  return (
    <section className=" py-28">
      <Container>
        <div className="grid grid-cols-3">
          <About />
          <NavLinks />
          <Contact />
        </div>
      </Container>
    </section>
  );
};

const FooterBottom = () => {
  return (
    <section className="bg-[#121212]">
      <Container className="flex justify-center text-base py-8">
        <p className="copyright">
          © <Link to="http://dspyder.com/html/kite/">BuyMall Inc.</Link>{' '}
          {new Date().getFullYear()}, All Rights Reserved. Designed by &amp;
          Developed by{' '}
          <Link to="http://tinyint.io" className="text-[#ff4c01]">
            TinyInt.io
          </Link>
        </p>
      </Container>
    </section>
  );
};

const About = () => {
  return (
    <article>
      <h6 className="font-semibold mb-4">About BuyMall</h6>
      <div className="pr-12">
        <p className="mb-2 leading-relaxed">
          A leading developer of A-grade commercial, industrial and residential
          projects in Nigeria. Since its foundation the company has doubled its
          turnover year on year with its staff.
        </p>
      </div>
    </article>
  );
};

const Contact = () => {
  return (
    <article>
      <h6 className="font-semibold mb-4">Contact</h6>
      <div>
        <p className="mb-2 leading-relaxed">
          If you have any questions or need help, feel free to contact with our
          team.
        </p>
        <p className="mb-2 leading-relaxed">
          2307 Beverley Rd Victoria Island, Lagos 11226 Nigeria.
        </p>
        <Link to="tel:5565454117">
          <i className="icon-phone"></i>
          <span>(002) 55 654 541 17</span>
        </Link>
        <SocialIcons />
      </div>
    </article>
  );
};

const SocialIcons = () => {
  return (
    <ul className="flex items-center gap-4 my-4">
      <SocialIcon href="" icon={BsTwitter} />
      <SocialIcon href="" icon={BsFacebook} />
      <SocialIcon href="" icon={BsTwitter} />
    </ul>
  );
};

const SocialIcon = ({ href, icon: Icon }: { href: string; icon: FC }) => {
  return (
    <li>
      <Link to={href}>
        <Icon />
      </Link>
    </li>
  );
};

const NavLinks = () => {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="">
        <h6 className="font-semibold mb-4">Services</h6>
        <ul className="flex flex-col gap-2">
          <li>
            <Link to="/construction">Management</Link>
          </li>
          <li>
            <Link to="/construction">Renovation</Link>
          </li>
          <li>
            <Link to="/construction">Architecture</Link>
          </li>
          <li>
            <Link to="/construction">Tiling & Painting</Link>
          </li>
          <li>
            <Link to="/construction">Interior Design</Link>
          </li>
        </ul>
      </div>
      <div className="">
        <h6 className="font-semibold mb-4">Company</h6>
        <ul className="flex flex-col gap-2">
          <li>
            <Link to="/construction">About</Link>
          </li>
          <li>
            <Link to="/construction">The Team</Link>
          </li>
          <li>
            <Link to="/construction">Projects</Link>
          </li>
          <li>
            <Link to="/construction">Contact</Link>
          </li>
          <li>
            <Link to="/construction">Career</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
