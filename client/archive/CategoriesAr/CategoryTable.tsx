import { useCallback, useState } from 'react';
import { Alert, EmptyState } from '../../src/components/ui';
import { Category } from '../../src/models/category';
import TableBody from './TableBody/TableBody';
import TableHead from './TableHead/TableHead';
import { useLocalMutation } from '../../src/hooks';

type Props = {
  cols: string[];
  rows: Category[];
};

const CategoryTable = ({ cols, rows }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<Category | null>(null);
  const { isLoading, error, mutate } = useLocalMutation('/categories', {
    options: {
      method: 'DELETE',
    },
  });

  const handleConfirmDelete = useCallback((category: Category) => {
    setSelected(category);
    setShowModal(true);
  }, []);

  const handleDelete = useCallback(() => {}, []);

  return (
    <>
      <div className="rounded-md border bg-white">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <TableHead cols={cols} />
            {rows.length <= 0 && (
              <tr className="">
                <td
                  colSpan={6}
                  className="text-xl font-medium text-center text-slate-400"
                >
                  <EmptyState title="No sub categories" description="" />
                </td>
              </tr>
            )}
            {rows.length > 0 && (
              <TableBody rows={rows} onDelete={handleConfirmDelete} />
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default CategoryTable;
