import { InputHTMLAttributes, forwardRef } from 'react';
import { IoSearch } from 'react-icons/io5';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Search = forwardRef<HTMLInputElement, Props>(
  ({ label, ...rest }, ref) => {
    return (
      <div className="w-full my-6">
        {label && <label htmlFor={label}>{label}</label>}
        <div className="flex gap-5">
          <IoSearch />
          <input {...rest} ref={ref} type="search" placeholder="Search" />
        </div>
      </div>
    );
  }
);

export default Search;
