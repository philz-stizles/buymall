import { IoDownload } from 'react-icons/io5';
import { useLocalQuery } from '../../../hooks';
import { baseUrl } from '../../../utils/constants';
import { Transaction } from './../../../models/transaction';
import { Fragment } from 'react';
import { Button } from '../../../components/ui';

const Transactions = () => {
  const {
    data: transactions,
    isLoading,
    error,
    reload,
  } = useLocalQuery<Transaction[]>(`${baseUrl}/transactions`, []);
  return (
    <Fragment>
      <div className="flex items-center justify-between space-y-2 py-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Transactions</h2>
          <p className="text-muted-foreground">
            Here's a list of your tasks for this month!
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button label="Download" iconLeft={IoDownload} onClick={() => {}} />
        </div>
      </div>
    </Fragment>
  );
};

export default Transactions;
