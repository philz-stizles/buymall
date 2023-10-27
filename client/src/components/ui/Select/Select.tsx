type Props = {
  label?: string;
  options: any[];
};

const Select = ({ label, options }: Props) => {
  const inputId =
    label && typeof label === "string"
      ? label.replaceAll(" ", "-").toLowerCase()
      : undefined;
  return (
    <div className="w-full relative h-fit flex flex-col mb-4">
      {label && (
        <label
          htmlFor={inputId}
          className="block font-medium text-sm text-slate-400"
        >
          {label}
        </label>
      )}
      <select className="h-[40px] px-2 outline-none border border-slate-300 text-slate-600 rounded-md transition text-sm">
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
