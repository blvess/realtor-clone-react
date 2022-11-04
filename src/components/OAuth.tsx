import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../firebase';

export default function OAuth() {
  const navigate = useNavigate();

  const onGoogleClick = async () => {
    // ...
    try {
      // Setup the auth
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      // Check to see if user is in the database already
      const docRef = doc(db, 'users', user.uid);
      const docSnapShot = await getDoc(docRef);
      if (!docSnapShot.exists()) {
        // create data for the user collection
        const userData = {
          name: user.displayName,
          email: user.email,
          createdAt: Timestamp.fromDate(new Date(user.metadata.creationTime as string)),
        };
        // Add user to the database
        await setDoc(docRef, userData);
      }

      // if all is successfull return to the homepage
      navigate('/');
    } catch (error) {
      toast.error('Could not authorize with Google');
    }
  };

  return (
    <button
      type="button"
      onClick={onGoogleClick}
      className="flex justify-center items-center w-full bg-red-700 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-red-800 transition duration-150 ease-in-out hover:shadow-lg active:bg-red-900 active:shadow-sm"
    >
      <FcGoogle className="mr-2 text-2xl rounded-full bg-white" />
      Continue with Google
    </button>
  );
}
