import {
  IoClose,
  IoMail,
  IoMailOutline,
  IoMailSharp,
  IoPersonAddOutline,
  IoPhonePortraitOutline,
} from "react-icons/io5";

type Props = {
  onClose?: () => void;
};

const CreateUserModal = ({ onClose }: Props) => {
  return (
    <div
      className="fixed right-0 z-50 left-0 top-0 bottom-0 w-full h-screen overflow-x-hidden overflow-y-auto flex justify-center items-center bg-black/60 outline-none"
      id="modal"
    >
      <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400 -translate-y-1/4">
          <div className="w-full flex justify-start text-gray-600 mb-5">
            <IoPersonAddOutline size={32} />
          </div>
          {/* <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
            Create New User
          </h1> */}
          <label
            htmlFor="name"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            Full Name
          </label>
          <input
            id="name"
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="First Last"
          />
          <label
            htmlFor="email2"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            Email
          </label>
          <div className="relative mb-5 mt-2">
            <div className="absolute text-gray-600 flex items-center px-4 border-r h-full">
              <IoMailOutline />
            </div>
            <input
              id="email2"
              className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-16 text-sm border-gray-300 rounded border"
              placeholder="XXXX - XXXX - XXXX - XXXX"
            />
          </div>
          <label
            htmlFor="email2"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            Phone
          </label>
          <div className="relative mb-7 mt-2">
            <div className="absolute text-gray-600 flex items-center px-4 border-r h-full">
              <IoPhonePortraitOutline />
            </div>
            <input
              id="email2"
              className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-16 text-sm border-gray-300 rounded border"
              placeholder="XXXX - XXXX - XXXX - XXXX"
            />
          </div>

          <div className="flex items-center justify-start w-full">
            <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">
              Submit
            </button>
            <button
              className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
              onClick={() => {}}
            >
              Cancel
            </button>
          </div>
          <IoClose
            size={20}
            onClick={onClose}
            aria-label="close modal"
            role="button"
            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateUserModal;
