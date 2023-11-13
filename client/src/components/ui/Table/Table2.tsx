import { MdDelete, MdDeleteOutline, MdModeEditOutline } from 'react-icons/md';
import './Table.css';

type Props = {
  title?: string;
  columns: string[];
  rows: any[];
};

const Table2 = ({ title, columns, rows }: Props) => {
  return (
    <div className="w-full rounded-lg bg-white p-6 flex-1">
      <div className="px-4 flex items-center">
        {title && <h3 className="font-medium">{title}</h3>}
        <div className=""></div>
      </div>
      <div className="">
        <table className="table-auto w-full max-w-full text-left">
          <thead>
            <tr>
              <th className="px-2 block whitespace-nowrap py-4 rounded-tl-lg rounded-bl-lg text-slate-600 bg-slate-50 border-y border-l border-slate-200 transition">
                <div className="inline-flex relative flex-col">
                  <label>
                    <span className="relative cursor-pointer">
                      <input
                        type="checkbox"
                        className="absolute top-0 bottom-0 left-0 right-0 cursor-pointer w-full h-full z-[1] opacity-0"
                      />
                      <span className="bg-white block relative top-0 left-0 h-4 w-4 rounded-sm border border-collapse border-slate-200 transition"></span>
                      {/*   direction: ltr; */}
                    </span>
                  </label>
                </div>
              </th>
              {columns.map((column: string) => (
                <th
                  className="p-4 text-sm font-medium text-slate-600 bg-slate-50 border-y last-of-type:border-r border-slate-200 last-of-type:block last-of-type:rounded-tr-lg last-of-type:rounded-br-lg transition last-of-type:text-right"
                  key={column}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {/* {rows.length <= 0 && <div><img src={EmptyImage} alt="Empty" /></div>} */}
            {rows.map((row: any) => (
              <tr key={row.id} className="text-sm">
                <td className="px-2 inline-flex relative flex-col">
                  <label>
                    <span className="relative cursor-pointer">
                      <input
                        type="checkbox"
                        className="absolute top-0 bottom-0 left-0 right-0 cursor-pointer w-full h-full z-[1] opacity-0"
                      />
                      <span className="bg-white block relative top-0 left-0 h-4 w-4 rounded-sm border border-collapse border-slate-200 transition"></span>
                      {/*   direction: ltr; */}
                    </span>
                  </label>
                </td>
                <td className="p-4">
                  <span className="block">{row.name}</span>
                </td>
                <td className="p-4">{row.description}</td>
                <td className="p-4">{row.createdAt}</td>
                <td className="p-4">{row.name}</td>
                <div className="p-4 flex justify-end gap-4 items-center">
                  <MdModeEditOutline size={18} />
                  <MdDelete size={18} />
                  <MdDeleteOutline size={20} />
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div></div>
    </div>
  );
};

export default Table2;
