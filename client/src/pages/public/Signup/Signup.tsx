import { FormEvent, useCallback, useState } from 'react';
import { Button, Input } from '../../../components/ui';
import {
  IoLockClosedOutline,
  IoLogoApple,
  IoMailOutline,
} from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../../utils/api';
import { saveAuthenticatedUser } from '../../../utils/auth';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        if (!email || !password) {
          return;
        }
        setIsLoading(true);
        const response = await fetch(`${baseUrl}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        const json = await response.json();
        if (!json || !json.status) {
          throw new Error(
            'Authentication is currently not available. Please try again in a few minutes.'
          );
        }

        saveAuthenticatedUser(json.data);

        // If using replace: true, the navigation will replace the current entry in the history stack
        // instead of adding a new one.
        navigate('/', { replace: true });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [email, navigate, password]
  );

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <form
        onSubmit={submitHandler}
        className="w-fit h-fit flex flex-col justify-center items-center gap-5 pt-5 px-10 pb-4 rounded-md bg-white shadow-lg"
      >
        <div className="w-20 h-20 border box-border"></div>
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="font-bold text-xl text-slate-950">
            Login to your Account
          </p>
          <span className=" w-[80%] font-normal text-sm text-slate-500 text-center">
            Get started with our app, just create an account and enjoy the
            experience.
          </span>
        </div>
        <Input
          label="Email"
          icon={IoMailOutline}
          placeholder="name@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          label="Password"
          icon={IoLockClosedOutline}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" label="Sign in" expanded loading={isLoading} />
        <div className="">
          <hr />
          <span>Or</span>
          <hr />
        </div>
        <Button label="Sign in with Google" expanded variant="outlined" />
        <Button
          label="Sign in with Apple"
          iconLeft={IoLogoApple}
          expanded
          variant="black"
        />
        <p className="text-sm text-slate-400 underline">
          Terms of use &amp; Conditions
        </p>
      </form>
    </div>
  );
};

//   background: linear-gradient(180deg, rgba(248, 248, 248, 0) 50%, #F8F8F888 100%);
//   border: 1px solid #F7F7F8;
//   filter: drop-shadow(0px 0.5px 0.5px #EFEFEF) drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
//   border-radius: 11px;

// width: fit-content;
//   height: fit-content;
//   gap: 15px;
//   padding: 50px 40px 20px 40px;
//   background-color: #ffffff;
//   box-shadow: 0px 106px 42px rgba(0, 0, 0, 0.01),
//     0px 59px 36px rgba(0, 0, 0, 0.05), 0px 26px 26px rgba(0, 0, 0, 0.09),
//     0px 7px 15px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
//   border-radius: 11px;
//   font-family: "Inter", sans-serif;

export default Signup;
