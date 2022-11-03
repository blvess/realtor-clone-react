import { FcGoogle } from 'react-icons/fc';
function OAuth() {
  return (
    <button
      type="button"
      className="flex justify-center items-center w-full bg-red-700 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-red-800 transition duration-150 ease-in-out hover:shadow-lg active:bg-red-900 active:shadow-sm"
    >
      <FcGoogle className="mr-2 text-2xl rounded-full bg-white" />
      Continue with Google
    </button>
  );
}

export default OAuth;
