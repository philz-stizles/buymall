import classNames from 'classnames';
import { IoAperture, IoEyeOutline } from 'react-icons/io5';
import { MdOutlineFileDownload } from 'react-icons/md';
import moment from 'moment';
import { SubCategory } from '../../../../../../../../../models/sub-category';
import { EmptyState } from '../../../../../../../../../components/ui';

type Props = {
  rows: SubCategory[];
};

const TableBody = ({ rows }: Props) => {
  return (
    <tbody>
      {rows.length <= 0 ? (
        <EmptyState title="No sub categories" description="" icon={IoAperture} />
      ) : (
        rows.map((row, i) => <TableRow key={row.name} index={i} row={row} />)
      )}
    </tbody>
  );
};

type TableRowProps = {
  index: number;
  row: SubCategory;
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
