import { Component } from "react";
import { User } from "../../../models/user";
import axios from "axios";
import { baseUrl } from "../../../utils/api";
import { IoEyeOutline } from "react-icons/io5";
import UserItem from "./UserItem";

type Props = {
  data: User[];
};

type State = {
  users: User[];
  isLoading: boolean;
  error: any;
};

export default class UserList extends Component<Props, State> {
  state = {
    users: [],
    isLoading: false,
    error: null,
  };

  componentDidMount(): void {}

  render() {
    const { data } = this.props;

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
                    <th className="py-3 px-6 text-center font-medium">
                      Status
                    </th>
                    <th className="py-3 px-6 text-center font-medium">
                      Actions
                    </th>
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
  }
}
