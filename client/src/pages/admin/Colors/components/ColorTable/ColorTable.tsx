import classNames from 'classnames';
import moment from 'moment';
import { BsSortAlphaDown } from 'react-icons/bs';
import { BiSolidEdit, BiTrash } from 'react-icons/bi';
import { IoSearch } from 'react-icons/io5';
import { BsFillEyeFill } from 'react-icons/bs';
import { Checkbox } from '../../../../../components/form';
import { Color } from '../../../../../models/color';
import {
  EmptyState,
  IconButton,
  Pagination,
} from '../../../../../components/ui';

type Props = {
  colors: Color[];
  onEdit?: (category: Color) => void;
  onDelete?: (category: Color) => void;
  onView?: (category: Color) => void;
};

const ColorTable = ({ colors, onDelete, onEdit, onView }: Props) => {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <div className="min-w-screen flex justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="w-full">
            <div className="bg-white shadow-md rounded"></div>
            <table className="min-w-max w-full table-auto caption-bottom text-sm ">
              <thead className="[&_tr]:border-b">
                {/* <tr className="bg-slate-100 px-6 p-4 text-slate-500 font-semibold rounded-t-lg"> */}
                <tr className="bg-slate-100 border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted border-slate-200">
                  <Th>
                    <Checkbox />
                  </Th>
                  <Th>
                    <div className="flex justify-between items-center gap-2">
                      <span>Code</span> <BsSortAlphaDown size={18} />
                    </div>
                  </Th>
                  <Th>Description</Th>
                  <Th>Status</Th>
                  <Th>Date Created</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {colors && colors.length <= 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <EmptyState
                        icon={IoSearch}
                        title="No results found"
                        description="There aren't any results for that query."
                      />
                    </td>
                  </tr>
                ) : (
                  colors.map((item) => (
                    <tr
                      key={`table-cell-${item.id}`}
                      className="rounded-lg border-b last-of-type:border-none border-slate-200 transition-colors bg-white hover:bg-gray-50 data-[state=selected]:bg-muted text-slate-600"
                    >
                      <Td>
                        <Checkbox />
                      </Td>
                      <Td>{item.name}</Td>
                      <Td>{item.description}</Td>
                      <Td>
                        <small
                          className={classNames(
                            'rounded-md py-0.5 px-1.5 text-xm font-medium',
                            item.isPublished
                              ? 'bg-green-200 text-green-600 border border-green-300'
                              : 'bg-[#fff9db] text-[#f08c00]'
                          )}
                        >
                          {item.isPublished ? 'Published' : 'Not published'}
                        </small>
                      </Td>
                      <Td>{moment(item.createdAt).format('LL')}</Td>
                      <Td>
                        <div className="flex items-center gap-2">
                          <IconButton
                            icon={BsFillEyeFill}
                            onClick={onView?.bind(null, item)}
                          />
                          <IconButton
                            icon={BiSolidEdit}
                            onClick={onEdit?.bind(null, item)}
                          />
                          <IconButton
                            icon={BiTrash}
                            onClick={onDelete?.bind(null, item)}
                          />
                        </div>
                      </Td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Pagination />
    </div>
  );
};

const Th = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <td
    className={classNames(
      'h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )}
  >
    {children}
  </td>
);

const Td = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <td
    className={classNames(
      'py-2 px-2.5 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )}
  >
    {children}
  </td>
);

export default ColorTable;
