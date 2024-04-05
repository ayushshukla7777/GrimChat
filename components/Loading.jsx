// import Image from 'next/image'
// import React from 'react'
 
// const Loadng = () => {
//   return (
//     <div className='flex justify-center items-center w-full h-screen bg-[#161621]'>
//       <Image src={"/gifs/Loading.gif"} alt="" width={800} height={600} />
//     </div>
//   )
// }
 
// export default Loadng

import React from 'react'
import Image from "next/image";
import Loader from "../public/gifs/Loading.gif"


const Loading = () => {
  return (
    <div className='flex justify-center items-center w-full h-screen overflow-hidden bg-[#161621]'>
        <Image src={Loader} width={200} height={200} className="w-full" alt="" priority={true} quality={100} />
    </div>
  )
}

export default Loading