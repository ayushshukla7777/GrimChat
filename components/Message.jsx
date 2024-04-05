// import React from 'react'

// const Message = ({ msg }) => {
//     const message = msg?.data()?.message;
//   return (
//     <div className='max-w-[200px] md:max-w-[300px] bg-[#6c0303cd] p-2 rounded-b-xl rounded-tr-xl'>{message}</div>
//   )
// }

// export default Message

// import React from "react";

// const Message = ({ msg }) => {
//   const message = msg?.data()?.message;
//   const createdAt = msg?.data()?.createdAt;
//   const newDate = new Date(createdAt?.seconds * 1000);
//   const time = newDate
//     .toLocaleString("en-US", {
//       hour: "numeric",
//       minute: "numeric",
//       hour12: true,
//     })
//     .slice(0, 5);
//   // console.log(time);
//   return (
//     <div className="min-w-[100px] bg-[#ff910058] p-2 rounded-b-xl rounded-tr-xl">
//       {message}
//       <div className="w-full text-end">
//         {time} {
//             time >= 12 ? "PM" : "AM"
//         }
//       </div>
//     </div>
//   );
// };

// export default Message;

import React from "react";

const Message = ({ msg }) => {
  const message = msg?.data()?.message;
  const createdAt = msg?.data()?.createdAt;
  const newDate = new Date(createdAt?.seconds * 1000);
  const time = newDate
    .toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    })
    .slice(0, 5);
    const date = newDate.toLocaleDateString();
  // console.log(time);
  return (
    <div className="min-w-[100px] bg-[#ffee32d3] text-black p-2 rounded-b-xl rounded-tr-xl">
    <div className="font-semibold text-lg">{message}</div>
      
      <div className="w-full text-end text-xs">
        {time} hrs. | {date}
      </div>
    </div>
  );
};

export default Message;