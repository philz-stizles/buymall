import classNames from 'classnames';
import { IoEyeOutline } from 'react-icons/io5';
import { MdOutlineFileDownload } from 'react-icons/md';
import { Category } from '../../../../../../../../../models/category';
import moment from 'moment';

type Props = {
  rows: Category[];
};

const TableBody = ({ rows }: Props) => {
  return (
    <tbody>
      {rows.map((row, i) => (
        <TableRow key={row.name} index={i} row={row} />
      ))}
    </tbody>
  );
};

type TableRowProps = {
  index: number;
  row: Category;
};

const TableRow = ({ index, row }: TableRowProps) => {
  return (
    <tr
      key={row.id}
      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
    >
      <Td>{index + 1}</Td>
      <Td>{row.name}</Td>
      <Td>{row.description}</Td>
      <Td>{moment(row.createdAt).format('LL')}</Td>
      <Td>
        <small className="bg-[#fff9db] text-[#f08c00] px-2 py-1 rounded-lg font-semibold">
          {row.isPublished ? 'published' : 'Not published'}
        </small>
      </Td>
      <Td>
        <div className="flex items-center gap-2">
          <MdOutlineFileDownload size={24} />
          <IoEyeOutline size={24} />
        </div>
      </Td>
    </tr>
  );
};

const Td = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <td
    className={classNames(
      'p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )}
  >
    {children}
  </td>
);

export default TableBody;
