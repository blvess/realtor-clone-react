import { getAuth, updateProfile, User } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../firebase';

export default function Porfile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [{ name, email }, setFormData] = useState({
    name: '',
    email: '',
  });
  const [changeDetail, setChangeDetail] = useState(false);

  const onLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await auth.signOut();
    navigate('/');
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    !changeDetail && e.preventDefault();
    setChangeDetail((prev) => !prev);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user?.displayName !== name) {
        await updateProfile(user as User, {
          displayName: name,
        });
        const docRef = doc(db, 'users', user?.uid as string);
        await updateDoc(docRef, {
          name,
        });
        toast.success('Profile Updated!');
      }
    } catch (error) {
      toast.error('Could not update profile details');
    }
  };

  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form onSubmit={onSubmit}>
            <input
              className={`w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
                changeDetail && 'bg-red-200 focus:bg-red-200'
              }`}
              id="name"
              value={name}
              onChange={onChange}
              type="text"
              disabled={!changeDetail}
            />
            <input
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
              id="email"
              value={email}
              type="email"
              disabled
            />
            <div className="flex justify-between items-center whitespace-nowrap text-sm sm:text-lg mb-6">
              <p>
                Do you want to change your name?
                <span className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer">
                  <button onClick={onEditClick}>{changeDetail ? 'Apply Change' : 'Edit'}</button>
                </span>
              </p>
              <button
                onClick={onLogout}
                className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
