// import Image from "next/image";
// import React from "react";
// import {
//   collection,
//   addDoc,
//   setDoc,
//   doc,
//   query,
//   where,
// } from "firebase/firestore";
// import { auth, db } from "@/firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollection } from "react-firebase-hooks/firestore";
// import Link from "next/link";

// const ChatCard = ({ chatData }) => {
//   const [user1, loading] = useAuthState(auth);
//   const reciverEmail = chatData
//     ?.data()
//     ?.users?.filter((item) => item !== user1?.email)?.[0];
//   const usersRef = collection(db, "users");
//   const q = query(usersRef, where("email", "==", reciverEmail));
//   const [userSnapshot, loading2] = useCollection(q);
//   const name = userSnapshot?.docs?.[0]?.data()?.name;
//   const imageURL = userSnapshot?.docs?.[0]?.data()?.photoURL;
//   const online = userSnapshot?.docs?.[0]?.data()?.online;
//   return (
//     <Link href={'/chats/${chatData?.id'}>
//       <div className="flex items-center w-full border-b rounded-xl border-[#2b2b2b] space-x-5 py-2 px-2 my-5 cursor-pointer hover:bg-[#141414b7]">
//       <div className="w-[60px] h-[60px] rounded-full relative">
//         <Image
//           src={imageURL || "/images/default.png"}
//           width={60}
//           height={60}
//           className="rounded-full"
//         />
//         {online ? <span className="w-3 h-3 bg-green-500 rounded-full absolute z-[999] bottom-1 right-0"></span> : ""}
//         {/* user?.data().photoURL */}
//       </div>
//         <span>{name || "User"}</span>
//         {/* user?.data().name */}
//     </div>
//     </Link>
//   );
// };

// export default ChatCard;
import React from "react";
import Image from "next/image";
// import DefaultImage from "../public/images/default.png";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Link from "next/link";

const ChatCard = ({ chatData }) => {
  const [user, loading] = useAuthState(auth);
  const reciverEmail = chatData
    ?.data()
    ?.users?.filter((item) => item !== user?.email)?.[0];
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", reciverEmail));
  const [userSnapShot, loading2] = useCollection(q);
  const name = userSnapShot?.docs?.[0]?.data()?.name;
  const imageURL = userSnapShot?.docs?.[0]?.data()?.imageURL;
  const online = userSnapShot?.docs?.[0]?.data()?.online;

  return (
    <Link href={`/chats/${chatData?.id}`}>
    <div className="w-full flex items-center py-3 px-5 border-b rounded-xl border-[#353535] space-x-6 cursor-pointer hover:bg-[#ffeb0d60]">
      <div className="rounded-full w-[55px] h-[55px] relative">
        <Image
          src={imageURL || "/images/default.png"}
          alt=""
          width={55}
          height={55}
          priority={true}
          quality={100}
          className="rounded-full"
        />
        {online ? <span className="w-3 h-3 bg-green-500 rounded-full absolute z-[999] bottom-1 right-0"></span> : ""}
      </div>
      <span>{name || "User"}</span>
    </div>
    </Link>
  );
};

export default ChatCard;