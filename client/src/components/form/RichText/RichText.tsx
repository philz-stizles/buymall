import classNames from 'classnames';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type Props = {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  isValid?: boolean;
  isTouched?: boolean;
  info?: string;
  sr?: boolean;
}

const RichText = ({ label, placeholder, onChange, info, value, sr }: Props) => {
  const styles =
    'border border-slate-400 px-4 py-2 text-sm rounded-md transition hover:border-slate-700';
  return (
    <div className="relative flex flex-col w-full mb-2">
      {/* {label && <label className="sr-only font-semibold mb-1">{label}</label>} */}
      {label && (
        <label
          className={classNames('font-semibold mb-1 text-sm', sr && 'sr-only')}
        >
          {label}
        </label>
      )}
      <ReactQuill
        // modules={QuillModules}
        // formats={QuillFormats}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {info && <small className="text-xs text-slate-500 mt-1">{info}</small>}
    </div>
  );
};

export default RichText;
