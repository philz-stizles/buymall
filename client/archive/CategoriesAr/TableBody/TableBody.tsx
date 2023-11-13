import classNames from 'classnames';
import { IoEyeOutline, IoTrashOutline } from 'react-icons/io5';
import { Category } from '../../../src/models/category';
import moment from 'moment';
import { IconButton } from '../../../src/components/ui';
import { BiEditAlt } from 'react-icons/bi';

type Props = {
  rows: Category[];
  onDelete?: (category: Category) => void;
  onEdit?: (category: Category) => void;
};

const TableBody = ({ rows, onDelete, onEdit }: Props) => {
  return (
    <tbody>
      {rows.map((row, i) => (
        <tr
          key={row.id}
          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
        >
          <Td>{i + 1}</Td>
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
              <IconButton
                icon={IoEyeOutline}
                onClick={onEdit?.bind(null, row)}
              />
              <IconButton icon={BiEditAlt} onClick={onEdit?.bind(null, row)} />
              <IconButton
                icon={IoTrashOutline}
                onClick={onDelete?.bind(null, row)}
              />
            </div>
          </Td>
        </tr>
      ))}
    </tbody>
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
