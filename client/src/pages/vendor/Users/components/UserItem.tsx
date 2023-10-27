import { Component } from "react";
import { User } from "../../../models/user";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

type Props = {
  data: User;
};

export default class UserItem extends Component<Props> {
  render() {
    const { data } = this.props;

    return (
      <tr className="border-b border-gray-200 hover:bg-gray-100">
        {/* <td className="py-3 px-6 text-left whitespace-nowrap">
          <div className="flex items-center">
            <div className="mr-2">
               
            </div>
            <span className="font-medium">React Project</span>
          </div>
        </td> */}
        <td className="py-3 px-6 text-left">
          <div className="flex items-center">
            <div className="mr-2">
              <img
                alt="Avatar"
                className="w-6 h-6 rounded-full"
                src="https://randomuser.me/api/portraits/men/1.jpg"
              />
            </div>
            <span>{data.name}</span>
          </div>
        </td>
        <td className="py-3 px-6 text-left">
          <div className="flex items-center">
            <span>{data.phone}</span>
          </div>
        </td>
        <td className="py-3 px-6 text-left">
          <div className="flex items-center">
            <span>{data.email}</span>
          </div>
        </td>
        <td className="py-3 px-6 text-center">
          <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
            Active
          </span>
        </td>
        <td className="py-3 px-6 text-center">
          <div className="flex item-center justify-center gap-2">
            <FaEye className="w-4 transform hover:text-purple-500 hover:scale-110" />
            <FaEdit className="w-4 transform hover:text-purple-500 hover:scale-110" />
            <FaTrashAlt className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" />
          </div>
        </td>
      </tr>
    );
  }
}
