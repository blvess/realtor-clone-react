import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import keyImage from '../assets/key.jpg';
import OAuth from '../components/OAuth';
import { db } from '../firebase';

function SignUp() {
  const navigate = useNavigate();
  const [{ name, email, password }, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      // this updates the userCredential.user so no need to refetech
      await updateProfile(user, {
        displayName: name,
      });

      const userData = {
        name: user.displayName,
        email: user.email,
        createdAt: Timestamp.fromDate(new Date(user.metadata.creationTime as string)),
      };

      await setDoc(doc(db, 'users', user.uid), userData);
      navigate('/');
    } catch (error) {
      toast.error('Something went wrong with registration!');
    }
  };

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <div className="flex flex-wrap justify-center items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img src={keyImage} alt="hand holding keys" className="w-full rounded-2xl" />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transistion ease-in-out"
              type="text"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Full Name"
            />
            <input
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transistion ease-in-out"
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email Address"
            />

            <div className="relative mb-6">
              <input
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transistion ease-in-out"
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-lg cursor-pointer"
                  onClick={() => setShowPassword((p) => !p)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-lg cursor-pointer"
                  onClick={() => setShowPassword((p) => !p)}
                />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">
                Have an account?
                <Link
                  to="/sign-in"
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                  data-testid="sign-in-link"
                >
                  Sign In
                </Link>
              </p>
              <p>
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                  data-testid="forgot-link"
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 active:shadow-sm"
              type="submit"
            >
              Sign Up
            </button>
            <div className="my-4 flex items-center before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
