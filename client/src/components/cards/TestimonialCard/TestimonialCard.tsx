const TestimonialCard = () => {
  return (
    <li className="text-sm leading-6">
      <figure className="relative flex flex-col-reverse bg-slate-50 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
        <blockquote className="mt-6 text-slate-700 dark:text-slate-300">
          <p>I feel like an idiot for not using Tailwind CSS until now.</p>
        </blockquote>
        <figcaption className="flex items-center space-x-4">
          <img
            src="/_next/static/media/ryan-florence.3af9c9d9.jpg"
            alt=""
            className="flex-none w-14 h-14 rounded-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="flex-auto">
            <div className="text-base text-slate-900 font-semibold dark:text-slate-300">
              <a
                href="https://twitter.com/ryanflorence/status/1187951799442886656"
                tabIndex={0}
              >
                <span className="absolute inset-0"></span>Ryan Florence
              </a>
            </div>
            <div className="mt-0.5">Remix &amp; React Training</div>
          </div>
        </figcaption>
      </figure>
    </li>
  );
};

export default TestimonialCard;
