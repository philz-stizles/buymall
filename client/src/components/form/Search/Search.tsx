import { InputHTMLAttributes, forwardRef } from 'react';
import { IoSearch } from 'react-icons/io5';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;

};

const Search = forwardRef<HTMLInputElement, Props>(
  ({ label, placeholder = 'Search', ...rest }, ref) => {
    return (
      <div className="w-full my-6">
        {label && <label htmlFor={label}>{label}</label>}
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <IoSearch size={24} />
          </div>

          <input
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-slate-300 rounded-lg bg-slate-50 focus:ring-indigo-500 focus:border-indigo-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
            {...rest}
            ref={ref}
            type="search"
            placeholder={placeholder}
          />
        </div>
      </div>
    );
  }
);

export default Search;
