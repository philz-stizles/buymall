import { Section } from "../../../../../components/shared";
import { Button } from "../../../../../components/ui";
import { IoMdArrowForward } from "react-icons/io";

 

const FindStore = () => (
  <Section className="bg-slate-50">
    <article className="grid grid-cols-2 rounded-lg overflow-hidden">
      <figure className="relative max-h-96">
        <img
          className="w-full h-auto object-cover"
          src="/images/cta-img.jpg"
          alt=""
        />
        <div className="absolute top-0 bottom-0 left-0 right-0 z-10 md:rounded bg-gradient-to-b from-black/0 to-black/20"></div>
      </figure>
      <div className="flex flex-col justify-center items-center gap-6 p-8 bg-white">
        <h2 className="">UP CLOSE AND PERSONAL</h2>
        <h2 className="text-4xl font-bold">In Store Experience</h2>
        <p className=" font-light">
          Come by one of our stores to hear, see and feel the products yourself.
        </p>
        <Button
          label="Find a Store"
          size="lg"
          variant="outlined"
          iconRight={IoMdArrowForward}
        />
      </div>
    </article>
  </Section>
);

export default FindStore;
