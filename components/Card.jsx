// // import Image from "next/image";
// // import React from "react";
// // const Card = ({ name, imageURL }) => {
// // return (
// //   <div
// //   className="flex items-center w-full border-b rounded-xl border-[#2b2b2b] space-x-5 py-2 px-2 my-5 cursor-pointer hover:bg-[#141414b7]"
// //   >
// //     <div className="w-[60px] h-[60px] overflow-hidden rounded-full border border-[#2b2b2b]">
// //       <Image src={imageURL} alt="pic" width={60} height={60}/>
// //     </div>
// //     <div>
// //       <span>{name}</span>
// //     </div>
// //   </div>
// //   );
// // };

// // export default Card;

// import Image from "next/image";
// import React from "react";
// import { collection, addDoc, setDoc, doc } from "firebase/firestore";
// import { auth, db } from "@/firebase";
// import { useAuthState } from "react-firebase-hooks/auth";

// const Card = ({ user, email, id }) => {
//   const [user1, loading] = useAuthState(auth);

//   const addChat = async () => {
//     await setDoc(
//       doc(db, "chats", `chats-${user1.uid}${id}`),
//       {
//         users: [user1?.email, email],
//       },
//       { merge: true }
//     );
//     alert("Chat Added")
//   };
//   return (
//     <div
//       className="flex items-center w-full border-b rounded-xl border-[#2b2b2b] space-x-5 py-2 px-2 my-5 cursor-pointer hover:bg-[#141414b7]"
//       onClick={addChat}
//     >
//       <div className="w-[60px] h-[60px] overflow-hidden rounded-full">
//         <Image src={user?.data().photoURL} width={60} height={60} />
//       </div>
//       <div>
//         <h1>{user?.data().name}</h1>
//       </div>
//     </div>
//   );
// };

// export default Card;


import React from "react";
import Image from "next/image";
import DefaultImage from "../public/images/default.png";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Card = ({ name, imageURL, email, id, setSearch }) => {
  const [user, loading] = useAuthState(auth);

  const addChat = async () => {
    await setDoc(
      doc(db, "chats", `chats-${user.uid}${id}`),
      {
        users: [user?.email, email],
      },
      { merge: true }
    );
    alert("chat added");
    setSearch("");
  };
  return (
    <div
      className="w-full flex items-center py-3 px-5 border-b rounded-xl border-[#353535] space-x-6 cursor-pointer hover:bg-[#ffee32] hover:text-black hover:font-semibold"
      onClick={addChat}
    >
      <div className="rounded-full w-[55px] h-[55px] overflow-hidden">
        <Image
          src={imageURL}
          alt=""
          width={55}
          height={55}
          priority={true}
          quality={100}
        />
      </div>
      <span>{name}</span>
    </div>
  );
};

export default Card;