// import React, { useState } from "react";
// import { FiMenu } from "react-icons/fi";
// import { AiOutlineSearch } from "react-icons/ai";
// import { IoMdClose } from "react-icons/io";
// import Image from "next/image";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth, db } from "@/firebase";
// import { signOut } from "firebase/auth";
// import Card from "./Card";
// import { useCollection } from "react-firebase-hooks/firestore";
// import {
//   collection,
//   doc,
//   query,
//   serverTimestamp,
//   setDoc,
//   where,
// } from "firebase/firestore";
// import CardLoader from "./CardLoader";
// import ChatCard from "./chatCard";

// const Sidebar = () => {
//   const [search, setSearch] = useState("");
//   const [currentUser, loading2] = useAuthState(auth);
//   const Logout = async () => {
//     if (currentUser) {
//       setDoc(
//         doc(db, "users", currentUser.uid),
//         {
//           email: currentUser.email,
//           photoURL: currentUser.photoURL,
//           name: currentUser.providerData[0].displayName,
//           lastSeen: serverTimestamp(),
//           online: false,
//         },
//         { merge: true }
//       );
//     }
//     await signOut(auth);
//   };

//   const usersRef = collection(db, "users");
//   const [userSnapshots, loading] = useCollection(usersRef);

//   const chatsRef = collection(db, "chats");
//   const q = query(
//     chatsRef,
//     where("users", "array-contains", currentUser.email)
//   );
//   const [chatSnapshots, loading3] = useCollection(chatsRef);

//   return (
//     <div className="w-[40%] h-screen p-5 bg-[#191919]">
//       <div className="flex items-center w-full space-x-4">
//         <div>
//           <button className="drop-btn text-2xl">
//             <FiMenu />
//             <div className="drop-down w-[300px] rounded-b-xl rounded-tr-xl border border-[#333333] bg-[#0000006b] backdrop-blur-sm -z-[1] opacity-0 absolute top-20 left-10 p-5 transition-all">
//               <div className="w-[100px] h-[100px] rounded-full overflow-hidden mx-auto mb-5">
//                 <Image
//                   src={currentUser?.photoURL}
//                   alt="profile"
//                   width={100}
//                   height={100}
//                 />
//               </div>
//               <div className="w-full text-sm font-light py-2 capitalize">
//                 {currentUser?.displayName}
//               </div>
//               <div
//                 className="w-full text-sm font-light py-2 bg-[#3a3a3a42] hover:bg-[#0000003d] border border-[#cacaca] rounded-md capitalize"
//                 onClick={Logout}
//               >
//                 Logout From your account
//               </div>
//             </div>
//           </button>
//         </div>
//         <div className="flex items-center w-full relative">
//           <div className="absolute text-xl left-3">
//             <AiOutlineSearch />
//           </div>
//           <input
//             type="text"
//             className="px-10 py-2 rounded-full border border-[#494949] bg-transparent w-full outline-none focus:border-[#cd71ff]"
//             placeholder="Search Here"
//             onChange={(e) => {
//               setSearch(e.target.value);
//             }}
//             value={search}
//           />
//           {search.length > 0 && (
//             <button
//               className="absolute right-5 text-2xl"
//               onClick={() => {
//                 setSearch("");
//               }}
//             >
//               <IoMdClose />
//             </button>
//           )}
//         </div>
//       </div>
//       <div
//         className={
//           search !== ""
//             ? "w-full h-screen overflow-y-auto mt-2 transition-all"
//             : "w-full h-0 transition-all overflow-y-auto mt-2 overflow-hidden"
//         }
//       >
//         {!loading2 ? (
//           userSnapshots?.docs?.map((user) => {
//             if (
//               user
//                 .data()
//                 .name.toLowerCase()
//                 .includes(search.toLocaleLowerCase()) &&
//               user.data().email !== currentUser.email
//             ) {
//               return (
//                 <Card
//                   key={user.id}
//                   user={user}
//                   currentUser={currentUser}
//                   setSearch={setSearch}
//                   email={user.data().email}
//                   id={user.id}
//                   imageURL={user.data().photoURL}
//                 />
//               );
//             }
//           })
//         ) : (
//           <div>
//             <CardLoader />
//             <CardLoader />
//             <CardLoader />
//           </div>
//         )}
//       </div>
//       <div className=" w-full h-screen overflow-y-auto mt-2 transition-all">
//         {!loading3 ? (
//           chatSnapshots?.docs?.map((chat) => {
//             return <ChatCard key={chat.id} chatData={chat} />;
//           })
//         ) : (
//           <div>
//             <CardLoader />
//             <CardLoader />
//             <CardLoader />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
// import DefaultImage from "../public/images/default.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import Card from "./Card";
import {
  collection,
  doc,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import CardLoader from "./CardLoader";
import ChatCard from "./ChatCard";
import MenuBar from "./MenuBar";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const [user, loading] = useAuthState(auth);
  // console.log(user);

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

  const usersRef = collection(db, "users");
  const [userSnapShots, loading2] = useCollection(usersRef);
  const chatsRef = collection(db, "chats");
  const q = query(chatsRef, where("users", "array-contains", user?.email));
  const [chatSnapShots, loading3] = useCollection(q);
  return (
    <div className="  w-[50vw] md:w-[40vw] h-screen p-5 bg-[#070821]">
      <div className="flex items-center w-full space-x-4">
        <div>
          <div>
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
          </div>
        </div>

        <div className="relative w-full flex items-center">
          <div className="text-xl absolute left-3">
            <AiOutlineSearch />
          </div>
          {/* #cd71ff */}
          <input
            type="text"
            className="border bg-transparent w-full px-10 py-2 rounded-full border-[#494949] outline-none focus:border-[#ffee32]"
            placeholder="Search Here"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
          {search.length > 0 && (
            <button
              className="absolute right-4 text-2xl"
              onClick={() => {
                setSearch("");
              }}
            >
              <IoMdClose />
            </button>
          )}
        </div>
      </div>
      <div
        className={
          search.length > 0
            ? "w-full h-screen overflow-y-auto mt-5 transition-all"
            : "w-full h-0 overflow-y-auto mt-5 transition-all"
        }
      >
        {!loading2 ? (
          userSnapShots?.docs?.map((item) => {
            if (
              item.data().name.toLowerCase().includes(search.toLowerCase()) &&
              item.data().name !== user?.displayName
            ) {
              return (
                <Card
                  key={item.id}
                  name={item.data().name}
                  imageURL={item.data().imageURL}
                  email={item.data().email}
                  id={item.id}
                  setSearch={setSearch}
                />
              );
            }
          })
        ) : (
          <div>
            <CardLoader />
            <CardLoader />
            <CardLoader />
          </div>
        )}
      </div>
      <div className="w-full h-screen overflow-y-auto mt-2 transition-all">
        {!loading3 ? (
          chatSnapShots?.docs?.map((chat) => {
            return <ChatCard key={chat.id} chatData={chat} />;
          })
        ) : (
          <div>
            <CardLoader />
            <CardLoader />
            <CardLoader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
// import React, { useState } from "react";
// import { FiMenu } from "react-icons/fi";
// import { AiOutlineSearch } from "react-icons/ai";
// import { IoMdClose } from "react-icons/io";
// import Image from "next/image";
// // import DefaultImage from "../public/images/default.png";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth, db } from "../firebase";
// import { signOut } from "firebase/auth";
// import Card from "./Card";
// import { collection, doc, query, serverTimestamp, setDoc, where } from "firebase/firestore";
// import { useCollection } from "react-firebase-hooks/firestore";
// import CardLoader from "./CardLoader";
// import ChatCard from "./ChatCard";

// const Sidebar = () => {
//   const [search, setSearch] = useState("");
//   const [user, loading] = useAuthState(auth);
//   // console.log(user);

//   const logout = async () => {
//     if (user) {
//         await setDoc(
//           doc(db, "users", user?.uid),
//           {
//             name: user?.displayName,
//             email: user?.email,
//             imageURL: user?.photoURL,
//             online: false,
//             lastSeen: serverTimestamp(),
//           },
//           { merge: true }
//         );
//       }
//     await signOut(auth);
//   };

//   const usersRef = collection(db, "users");
//   const [userSnapShots, loading2] = useCollection(usersRef);
//   const chatsRef = collection(db, "chats");
//   const q = query(chatsRef, where("users", "array-contains", user?.email));
//   const [chatSnapShots, loading3] = useCollection(q);
//   return (
//     <div className="w-[50vw] md:w-[40vw] h-screen p-5 bg-[#070821]">
//       <div className="flex items-center w-full space-x-4">
//         <div>
//           <button className="text-2xl group">
//             <FiMenu />
//             <div className="w-[300px] rounded-b-xl rounded-tr-xl absolute bg-[#4f4f4f92] flex flex-col justify-center items-center p-5 top-16 left-12 backdrop-blur-sm -z-[1] opacity-0 group-focus:z-[1] group-focus:opacity-100">
//               <div className="w-[100px] h-[100px] overflow-hidden border rounded-full">
//                 <Image
//                   src={user?.photoURL}
//                   width={100}
//                   height={100}
//                   priority={true}
//                   quality={100}
//                   alt=""
//                 />
//               </div>
//               <div className="w-full">
//                 <h1 className="text-xl my-2">{user?.displayName}</h1>
//                 <div
//                   className="text-xl bg-[#fff] w-full text-black py-1 rounded-md hover:bg-[#ffee32] hover:text-black hover:font-semibold transition-colors  cursor-pointer"
//                   onClick={logout}
//                 >
//                   Logout
//                 </div>
//               </div>
//             </div>
//           </button>
//         </div>
//         <div className="relative w-full flex items-center">
//           <div className="text-xl absolute left-3">
//             <AiOutlineSearch />
//           </div>
//           {/* #cd71ff */}
//           <input
//             type="text"
//             className="border bg-transparent w-full px-10 py-2 rounded-full border-[#494949] outline-none focus:border-[#ffee32]"
//             placeholder="Search Here"
//             onChange={(e) => {
//               setSearch(e.target.value);
//             }}
//             value={search}
//           />
//           {search.length > 0 && (
//             <button
//               className="absolute right-4 text-2xl"
//               onClick={() => {
//                 setSearch("");
//               }}
//             >
//               <IoMdClose />
//             </button>
//           )}
//         </div>
//       </div>
//       <div
//         className={
//           search.length > 0
//             ? "w-full h-screen overflow-y-auto mt-5 transition-all"
//             : "w-full h-0 overflow-y-auto mt-5 transition-all"
//         }
//       >
//         {!loading2 ? (
//           userSnapShots?.docs?.map((item) => {
//             if (
//               item.data().name.toLowerCase().includes(search.toLowerCase()) &&
//               item.data().name !== user?.displayName
//             ) {
//               return (
//                 <Card
//                   key={item.id}
//                   name={item.data().name}
//                   imageURL={item.data().imageURL}
//                   email={item.data().email}
//                   id={item.id}
//                   setSearch={setSearch}
//                 />
//               );
//             }
//           })
//         ) : (
//           <div>
//             <CardLoader />
//             <CardLoader />
//             <CardLoader />
//           </div>
//         )}
//       </div>
//       <div className="w-full h-screen overflow-y-auto mt-2 transition-all">
//         {!loading3 ? (
//           chatSnapShots?.docs?.map((chat) => {
//             return <ChatCard key={chat.id} chatData={chat} />;
//           })
//         ) : (
//           <div>
//             <CardLoader />
//             <CardLoader />
//             <CardLoader />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
