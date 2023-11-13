import { useCallback, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import {
  Button,
  DashboardHeading,
  PageLoader,
  TableFilter,
} from '../../../components/ui';
import { Transaction } from '../../../models/transaction';
import TransactionTable from './components/TransactionTable/TransactionTable';
import { useLocalQuery } from '../../../hooks';

const Transactions = () => {
  const [showModal, setShowModal] = useState(false);

  const [view, setView] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const { data, isLoading, error, reload } = useLocalQuery<{
    count: number;
    transactions: Transaction[];
  }>('/transactions', { count: 0, transactions: [] });

  const handleView = useCallback(async (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setView(true);
    setShowModal(true);
  }, []);

  return (
    <div className="flex-1 flex flex-col gap-6 py-8 pt-4">
      <div className="flex items-center justify-between">
        <DashboardHeading
          title={`Transactions (${data.count})`}
          description="Here a list of your tasks for this month!"
        />

        <Button
          label="Add New"
          iconLeft={IoAdd}
          onClick={() => setShowModal(true)}
        />
      </div>

      <TableFilter
        onFilter={useCallback(
          async (searchValue: string) => {
            await reload(`/transactions?search=${searchValue}`);
          },
          [reload]
        )}
      />

      {isLoading && <PageLoader />}

      {!isLoading && !error && (
        <TransactionTable
          transactions={data.transactions}
          onView={handleView}
        />
      )}
    </div>
  );
};

export default Transactions;
