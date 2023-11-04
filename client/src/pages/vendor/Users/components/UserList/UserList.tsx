import UserItem from '../UserItem/UserItem';
import { User } from '../../../../../models/user';

type Props = {
  data: User[];
};

const UserList = ({ data }: Props) => {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-screen flex justify-center bg-gray-100 font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded">
            <table className="min-w-max w-full table-auto">
              <thead>
                {/* <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"></tr> */}
                <tr className="bg-gray-200 text-gray-700 text-sm leading-normal">
                  {/* <th className="py-3 px-6 text-left"></th> */}
                  <th className="py-3 px-6 text-left font-medium">Name</th>
                  <th className="py-3 px-6 text-left font-medium">Email</th>
                  <th className="py-3 px-6 text-left font-medium">Phone</th>
                  <th className="py-3 px-6 text-center font-medium">Status</th>
                  <th className="py-3 px-6 text-center font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {data.map((item) => (
                  <UserItem key={item.id} data={item} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
