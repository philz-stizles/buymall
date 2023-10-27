import Typewriter from 'typewriter-effect';

type Props = {
  text: string[];
};

const Jumbotron = ({ text }: Props) => (
  <Typewriter
    options={{
      strings: text,
      autoStart: true,
      loop: true,
    }}
  />
);

export default Jumbotron;
