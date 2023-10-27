import { ChangeEvent, forwardRef } from 'react';
import { IoSearch } from 'react-icons/io5';

type SearchProps = {
  label?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Search = forwardRef<HTMLInputElement, SearchProps>((props, ref) => {
  const { label, ...rest } = props;
  return (
    <div className="w-full my-6">
      {label && <label htmlFor={label}>{label}</label>}
      <div className="flex gap-5">
        <IoSearch />
        <input {...rest} ref={ref} type="search" placeholder="Search" />
      </div>
    </div>
  );
});

export default Search;

// .search {
//   margin: 2.4rem 0;
//   width: 100%;
// }

// .input {
//   border: 1px solid #e5e7eb;
//   /* border: 1px solid rgba(59, 130, 246, 0.5); */
//   padding: 1.4rem 3.2rem 1.4rem 2.4rem;
//   border-radius: 50px;
//   display: flex;
//   gap: 1.2rem;
//   align-items: center;
// }

// .input input[type="search"]{
//   display: inline-block;
// }

// .input input[type="search"]::placeholder {
//   font-size: 1.6rem;
// }

// .input svg {
//   font-size: 1.8rem;
// }
