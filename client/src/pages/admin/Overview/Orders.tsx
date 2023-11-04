import { IoEyeOutline } from 'react-icons/io5';
import ChartWrapper from '../../../components/charts/ChartWrapper/ChartWrapper';
import Avatar from '../../../components/ui/Avatar/Avatar';
import classNames from 'classnames';
import { MdOutlineFileDownload } from 'react-icons/md';
import { Badge } from '../../../components/ui';

type Props = {
  title: string;
};

const Orders = ({ title }: Props) => {
  return (
    <ChartWrapper title={title}>
      <div className="overflow-x-auto">
        <div className="min-w-screen flex justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="w-full">
            <div className="bg-white shadow-md rounded">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="border-b border-slate-300">
                    <Th title="#" />
                    <Th title="Order ID" />
                    <Th title="Date" />
                    <Th title="Product" />
                    <Th title="Customer" />
                    <Th title="Total Amount" />
                    <Th title="Status" />
                    <Th title="Action" />
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200">
                    <Td>01</Td>
                    <Td>#1112</Td>
                    <Td>2/03/24</Td>
                    <Td>Gray Jeans</Td>
                    <Td>
                      <div className="flex items-center gap-2">
                        <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" />
                        <span>Theophilus Ighalo</span>
                      </div>
                    </Td>
                    <Td>$25.00</Td>
                    <Td>
                      <span className="bg-[#fff9db] text-[#f08c00] px-2 py-1 rounded-lg text-sm font-semibold">
                        Pending
                      </span>
                    </Td>
                    <Td>
                      <div className="flex items-center gap-2">
                        <MdOutlineFileDownload size={24} />
                        <IoEyeOutline size={24} />
                      </div>
                    </Td>
                  </tr>
                  <tr>
                    <Td>01</Td>
                    <Td>#1112</Td>
                    <Td>2/03/24</Td>
                    <Td>Gray Jeans</Td>
                    <Td>
                      <div className="flex items-center gap-2">
                        <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" />
                        <span>Theophilus Ighalo</span>
                      </div>
                    </Td>
                    <Td>$25.00</Td>
                    <Td>
                      <span className="bg-[#e6fcf5] text-[#0ca678] px-2 py-1 rounded-lg text-sm font-semibold">
                        Complete
                      </span>
                    </Td>
                    <Td>
                      <div className="flex items-center gap-2">
                        <MdOutlineFileDownload size={22} />
                        <IoEyeOutline size={22} />
                      </div>
                    </Td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ChartWrapper>
  );
};

const Th = ({ title, className }: { className?: string; title: string }) => (
  <th
    scope="col"
    className={classNames(
      'py-3 pr-6 text-left font-medium text-slate-500 text-sm',
      className
    )}
  >
    {title}
  </th>
);

const Td = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <td className={classNames('py-3 pr-6 text-left font-medium', className)}>{children}</td>
);

export default Orders;
