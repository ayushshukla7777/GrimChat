import { auth, db } from '@/firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import Image from 'next/image';
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { FiMenu } from 'react-icons/fi';

const logout = async () => {
    
    if (user) {
        await setDoc(
          doc(db, "users", user?.uid),
          {
            name: user?.displayName,
            email: user?.email,
            imageURL: user?.photoURL,
            online: false,
            lastSeen: serverTimestamp(),
          },
          { merge: true }
        );
      }
    await signOut(auth);
  };

const MenuBar = () => {
    const [search, setSearch] = useState("");
    const [user, loading] = useAuthState(auth);
  return (
    <div><div>
    <button className="text-2xl group">
      <FiMenu />
      <div className="w-[300px] rounded-b-xl rounded-tr-xl absolute bg-[#4f4f4f92] flex flex-col justify-center items-center p-5 top-16 left-12 backdrop-blur-sm -z-[1] opacity-0 group-focus:z-[1] group-focus:opacity-100">
        <div className="w-[100px] h-[100px] overflow-hidden border rounded-full">
          <Image
            src={user?.photoURL}
            width={100}
            height={100}
            priority={true}
            quality={100}
            alt=""
          />
        </div>
        <div className="w-full">
          <h1 className="text-xl my-2">{user?.displayName}</h1>
          <div
            className="text-xl bg-[#fff] w-full text-black py-1 rounded-md hover:bg-[#ffee32] hover:text-black hover:font-semibold transition-colors  cursor-pointer"
            onClick={logout}
          >
            Logout
          </div>
          
        </div>
      </div>
    </button>
  </div></div>
  )
}

export default MenuBar