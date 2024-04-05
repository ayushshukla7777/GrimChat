// import Message from "@/components/Message";
// import Image from "next/image";
// import React, { useState } from "react";
// import { MdSend } from "react-icons/md";
// import {
//   collection,
//   addDoc,
//   serverTimestamp,
//   orderBy,
//   query,
//   where,
// } from "firebase/firestore";
// import { auth, db } from "@/firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollection } from "react-firebase-hooks/firestore";
// import { doc, getDoc } from "firebase/firestore";

// export async function getServerSideProps(context) {
//   const id = context.query.id;
//   const docRef = doc(db, "chats", id);
//   const docSnap = await getDoc(docRef);
//   // const chatData = JSON.stringify(docSnap?.data());
//   const chatData = docSnap?.data() ? JSON.stringify(docSnap.data()) : null;

//   return {
//     props: {
//       id,
//       chatData,
//     }, // will be passed to the page component as props
//   };
// }

// const Id = ({ id, chatData }) => {
//   const [message, setMessage] = useState("");
//   const [user, loading] = useAuthState(auth);

//   const messagesRef = collection(db, "messages");
//   const q = query(messagesRef, orderBy("createdAt"));
//   const [messageSnapshots, loading2] = useCollection(q);

//   const createMessage = async (e) => {
//     e.preventDefault();
//     // this below code do make a collection of messages  and then we import db means database then inside the func. we giving messages
//     const docRef = await addDoc(collection(db, "messages"), {
//       message: message,
//       user: user?.email,
//       chatId: id,
//       createdAt: serverTimestamp(),
//     });
//     setMessage("");
//   };

//   let receiverEmail, name, imageURL, online, lastSeen, time, date;

//   if (chatData) {
//     const data = JSON.parse(chatData);
//     receiverEmail = data?.users?.filter((item) => item !== user?.email)?.[0];
//     // console.log(receiverEmail);
//     const usersRef = collection(db, "users");
//     const q2 = query(usersRef, where("email", "==", receiverEmail));
//     const [userSnapShot, loading3] = useCollection(q2);
//     name = userSnapShot?.docs?.[0]?.data()?.name;
//     imageURL = userSnapShot?.docs?.[0]?.data()?.imageURL;
//     online = userSnapShot?.docs?.[0]?.data()?.online;
//     lastSeen = userSnapShot?.docs?.[0]?.data()?.lastSeen;
//     const newDate = new Date(lastSeen?.seconds * 1000);
//     time = newDate.toLocaleTimeString().slice(0, 5);
//     date = newDate.toLocaleDateString();
//   }

//   return (
//     <div className="gradient w-full h-screen overflow-hidden">
//       <div className="w-full p-5 bg-[#00000044] backdrop-blur-sm flex items-center space-x-5">
//         <div>
//           <Image
//             src={imageURL || "/images/default.png"}
//             width={70}
//             height={70}
//             className="rounded-full"
//             alt=""
//           />
//         </div>
//         <div>
//           <div>{name}</div>
//           <div>
//             last seen at {time || ""} on {date || ""}
//           </div>
//         </div>
//       </div>
//       <div className="w-full h-[78vh] overflow-y-auto overflow-x-hidden p-5">
//         {messageSnapshots?.docs?.map((msg) => {
//           return (
//             <div
//               className={
//                 msg.data().user === user?.email
//                   ? "w-full flex justify-end"
//                   : "w-full flex"
//               }
//             >
//               <Message msg={msg} />
//             </div>
//           );
//         })}
//       </div>
//       <form
//         onSubmit={createMessage}
//         className="w-full p-5 lg:p-0 bg-[#00000044] backdrop-blur-sm h-full"
//       >
//         <div className="flex items-center relative">
//           <input
//             type="text"
//             className="w-full border pr-10 pl-5 py-4 bg-transparent rounded-full outline-none focus:border-[#00ad03]"
//             placeholder="Type Here"
//             onChange={(e) => {
//               setMessage(e.target.value);
//             }}
//             value={message}
//             required
//           />
//           <button className="text-3xl absolute right-4">
//             <MdSend />
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Id;

//! UNKA WALA
// import { useState } from "react";
// import { MdSend } from "react-icons/md";
// import { collection, addDoc, serverTimestamp, orderBy, query, where } from "firebase/firestore";
// import { auth, db } from "@/firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollection } from "react-firebase-hooks/firestore";
// import { doc, getDoc } from "firebase/firestore";

// import Message from "@/components/Message";
// import Image from "next/image";

// export async function getServerSideProps(context) {
//   try {
//     const id = context.query.id;
//     const docRef = doc(db, "chats", id);
//     const docSnap = await getDoc(docRef);
//     const chatData = docSnap.exists() ? JSON.stringify(docSnap.data()) : null;

//     return {
//       props: {
//         id,
//         chatData,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching chat data:", error);
//     return {
//       notFound: true, // Return 404 page or handle the error as desired
//     };
//   }
// }

// const Id = ({ id, chatData }) => {
//   const [message, setMessage] = useState("");
//   const [user, loading] = useAuthState(auth);

//   const messagesRef = collection(db, "messages");
//   const q = query(messagesRef, orderBy("createdAt"));
//   const [messageSnapshots, loading2] = useCollection(q);

//   const createMessage = async (e) => {
//     e.preventDefault();
//     try {
//       const docRef = await addDoc(collection(db, "messages"), {
//         message: message,
//         user: user?.email,
//         chatId: id,
//         createdAt: serverTimestamp(),
//       });
//       setMessage("");
//     } catch (error) {
//       console.error("Error creating message:", error);
//       // Handle the error appropriately (e.g., show an error message to the user)
//     }
//   };

//   let reciverEmail, name, photoURL, online, lastSeen;
//   if (chatData) {
//     const data = JSON.parse(chatData);
//     reciverEmail = data?.users?.filter((item) => item !== user?.email)?.[0];
//     const usersRef = collection(db, "users");
//     const q2 = query(usersRef, where("email", "==", reciverEmail));
//     const [userSnapShot, loading3] = useCollection(q2);
//     name = userSnapShot?.docs?.[0]?.data()?.name;
//     photoURL = userSnapShot?.docs?.[0]?.data()?.photoURL;
//     online = userSnapShot?.docs?.[0]?.data()?.online;
//     lastSeen = userSnapShot?.docs?.[0]?.data()?.lastSeen;
//   }

//   const newDate = lastSeen ? new Date(lastSeen.seconds * 1000) : null;
//   const time = newDate?.toLocaleString("en-US", {
//     hour: "numeric",
//     minute: "numeric",
//     hour12: true,
//   });
//   const date = newDate?.toLocaleDateString();

//   return (
//     <div className="gradient w-full h-screen overflow-hidden">
//       <div className="w-full p-5 bg-[#bb010144] backdrop-blur-sm flex items-center space-x-5">
//         <div>
//           <Image
//             src={imageURL || "/images/default.png"}
//             width={70}
//             height={70}
//             className="rounded-full"
//             alt=""
//           />
//         </div>
//         <div>
//           <div>{name}</div>
//           {lastSeen && <div>last seen at {time} on {date}</div>}
//         </div>
//       </div>
//       <div className="w-full h-[78vh] overflow-y-auto overflow-x-hidden p-5">
//         {messageSnapshots?.docs?.map((msg) => (
//           <div
//             className={
//               msg.data().user === user?.email
//                 ? "w-full flex justify-end"
//                 : "w-full flex"
//             }
//             key={msg.id}
//           >
//             <Message msg={msg} />
//           </div>
//         ))}
//       </div>
//       <form
//         onSubmit={createMessage}
//         className="w-full p-5 lg:p-0 bg-[#00000044] backdrop-blur-sm h-full"
//       >
//         <div className="flex items-center relative">
//           <input
//             type="text"
//             className="w-full border pr-10 pl-5 py-4 bg-transparent rounded-full outline-none focus:border-[#00ad03]"
//             placeholder="Type Here"
//             onChange={(e) => {
//               setMessage(e.target.value);
//             }}
//             value={message}
//             required
//           />
//           <button className="text-3xl absolute right-4">
//             <MdSend />
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Id;

//! MERE WALA

// return (
//     <div className="gradient w-full h-screen overflow-hidden">
//       <div className="w-full p-5 bg-[#00000044] backdrop-blur-sm flex items-center space-x-5">
//         <div>
//           <Image
//             src={photoURL || "/images/default.png"}
//             width={70}
//             height={70}
//             priority={true}
//             quality={100}
//             alt=""
//             className="rounded-full"
//           />
//         </div>
//         <div>
//           <div>{name}</div>
//           <div>
//             last seen at {time || ""} on {date || ""}
//           </div>
//         </div>
//       </div>
//       <div className="w-full h-[77vh] overflow-y-auto overflow-x-hidden p-5">
//         {messageSnapshots?.docs?.map((msg) => {
//           if (msg.data().chatId === id) {
//             return (
//               <div key={msg.id}
//                 className={
//                   msg.data().user === user?.email
//                     ? "w-full flex justify-end mb-5"
//                     : "w-full flex mb-5"
//                 }
//               >
//                 <Message msg={msg} />
//               </div>
//             );
//           }
//         })}
//       </div>
//       <form
//         onSubmit={createMessage}
//         className="w-full p-5 bg-[#00000044] backdrop-blur-sm h-full"
//       >
//         <div className="flex items-center relative">
//           <input
//             type="text"
//             className="w-full border pr-10 pl-5 py-4 bg-transparent rounded-full outline-none focus:border-[#cd71ff]"
//             onChange={(e) => {
//               setMessage(e.target.value);
//             }}
//             value={message}
//             placeholder="Type Here"
//             required
//           />
//           <button className="text-3xl absolute right-4">
//             <MdSend />
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Id;

import React, { useState } from "react";
import Image from "next/image";
import DefaultImage from "../../public/images/default.png";
import Message from "../../components/Message";
import { MdSend } from "react-icons/md";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { doc, getDoc } from "firebase/firestore";

export async function getServerSideProps(context) {
  const id = context.query.id;
  const docRef = doc(db, "chats", id);
  const docSnap = await getDoc(docRef);
  const chatData = JSON.stringify(docSnap?.data());

  return {
    props: {
      id,
      chatData,
    }, // will be passed to the page component as props
  };
}

const Id = ({ id, chatData }) => {
  const [message, setMessage] = useState("");
  const [user, loading] = useAuthState(auth);

  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, orderBy("createdAt"));
  const [messageSnapshots, loading2] = useCollection(q);

  const createMessage = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "messages"), {
      message: message,
      user: user?.email,
      chatId: id,
      createdAt: serverTimestamp(),
    });
    setMessage("");
  };
  const data = JSON.parse(chatData);
  const reciverEmail = data?.users?.filter((item) => item !== user?.email)?.[0];
  // console.log(reciverEmail);
  const usersRef = collection(db, "users");
  const q2 = query(usersRef, where("email", "==", reciverEmail));
  const [userSnapShot, loading3] = useCollection(q2);
  const name = userSnapShot?.docs?.[0]?.data()?.name;
  const imageURL = userSnapShot?.docs?.[0]?.data()?.imageURL;
  const online = userSnapShot?.docs?.[0]?.data()?.online;
  const lastSeen = userSnapShot?.docs?.[0]?.data()?.lastSeen;
  const newDate = new Date(lastSeen?.seconds * 1000);
  const time = newDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  const date = newDate.toLocaleDateString();

  return (
    <div className="gradient w-full h-screen overflow-hidden">
      <div className="w-full p-5 bg-[#00000044] backdrop-blur-sm flex items-center space-x-5">
        <div>
          <Image
            src={imageURL || DefaultImage}
            width={70}
            height={70}
            priority={true}
            quality={100}
            alt=""
            className="rounded-full"
          />
        </div>
        <div>
          <div>{name}</div>
          <div>
            {!online ? (
              <span>
                last seen at {time || ""} on {date || ""}{" "}
              </span>
            ) : (
              <span className="text-green-400">online</span>
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-[75vh] overflow-y-auto overflow-x-hidden p-1 md:p-5">
        {messageSnapshots?.docs?.map((msg) => {
          if (msg.data().chatId === id) {
            return (
              <div
                key={msg.id}
                className={
                  msg.data().user === user?.email
                    ? "w-full flex justify-end mb-5"
                    : "w-full flex mb-5"
                }
              >
                <Message msg={msg} />
              </div>
            );
          }
        })}
      </div>
      <div className="w-full bg-[#00000048] h-full">
        <form onSubmit={createMessage} >
          {/* backdrop-blur-sm */}
          <div className="flex items-center relative">
            <input
              type="text"
              className="w-full h-14 border pr-10 pl-5 bg-transparent rounded-full outline-none focus:border-[#ffee32]"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
              placeholder="Type Here"
              required
            />
            <button className="text-3xl absolute right-4">
              <MdSend />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Id;
