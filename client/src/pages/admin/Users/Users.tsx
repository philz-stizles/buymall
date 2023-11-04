import { Fragment, useState } from 'react';
import { User } from '../../../models/user';
import useLocalQuery from '../../../hooks/use-local-query';
import { Button } from '../../../components/ui';
import { IoDownloadOutline, IoPersonAdd } from 'react-icons/io5';
import UserList from './components/UserList/UserList';
import { RoleType } from '../../../../src/types';
import CreateUserModal from './components/CreateUserModal/CreateUserModal';
import { createPortal } from 'react-dom';

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: users } = useLocalQuery<User[]>('/categories', [
    {
      id: '1',
      name: 'Theophilus Ighalo',
      phone: '08060000000',
      email: 'theophil@mail.com',
      address: 'No 12 somewhere, brick road',
      role: RoleType.ADMIN,
    },
    {
      id: '1',
      name: 'Jane Stallone',
      phone: '08030000000',
      email: 'janestallone@mail.com',
      address: 'No 100 somewhere, cement road',
      role: RoleType.ADMIN,
    },
  ]);

  return (
    <Fragment>
      <div className="flex justify-between items-center py-6">
        <h3 className="text-lg font-bold">Users</h3>
        <div className="flex items-center gap-2">
          <Button
            label="New"
            iconRight={IoPersonAdd}
            onClick={() => setIsModalOpen(true)}
          />
          <Button label="Export" iconRight={IoDownloadOutline} />
        </div>
      </div>

      {/* <Input type="search" onChange={this.changeHandler.bind(this)} /> */}
      <UserList
        data={[
          {
            id: '1',
            name: 'Theophilus Ighalo',
            phone: '08060000000',
            email: 'theophil@mail.com',
            address: 'No 12 somewhere, brick road',
            role: RoleType.ADMIN,
          },
          {
            id: '1',
            name: 'Jane Stallone',
            phone: '08030000000',
            email: 'janestallone@mail.com',
            address: 'No 100 somewhere, cement road',
            role: RoleType.ADMIN,
          },
        ]}
      />
      {isModalOpen &&
        createPortal(
          <CreateUserModal onClose={() => setIsModalOpen(false)} />,
          document.getElementById('modal') as Element
        )}
    </Fragment>
  );
};

export default Users;
