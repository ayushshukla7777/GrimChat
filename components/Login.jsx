// import Image from "next/image";

// import React from "react";
// import Logo from "../public/images/logo.png";
// import GoogleLogo from "../public/images/google-logo.png";
// import { signInWithPopup } from "firebase/auth";
// import { auth, provider } from "@/firebase";

// const Login = () => {
//   const createUser = async () => {
//     await signInWithPopup(auth, provider);
//   };

//   return (
//     <div className="w-full h-screen flex flex-col justify-center items-center">
//       <div className="flex items-center space-x-5">
//         <Image src={Logo} alt="" width={100} height={100} />
//         <span className="text-6xl font-bold">Telegram Web</span>
//       </div>
//       <div>
//         <button
//           className="flex items-center space-x-5 bg-[#fff] text-black px-6 py-3 my-20 rounded-full"
//           onClick={createUser}
//         >
//           <Image src={GoogleLogo} alt="" width={40} height={40} />
//           <span className="text-3xl font-semibold">Login With Google</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React from "react";
import Logo from "../public/images/logo.png";
import GoogleLogo from "../public/images/google-logo.png";
import Image from "next/image";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const Login = () => {
  const login = async () => {
    await signInWithPopup(auth, provider);
  };
  return (
    <div className="w-full h-screen overflow-hidden bg-[#252525] flex justify-center items-center flex-col space-y-10 relative">
      <Image src={"/gifs/landing.gif"} layout="fill" objectFit="cover" />
      <div className="absolute bottom-12 md:bottom-5 w-[95%] h-[auto] md:w-[40%] backdrop-blur-xl rounded-xl text-black p-5">
        <div className="flex items-center space-x-4 justify-center">
          <Image
            src={Logo}
            width={100}
            height={100}
            priority={true}
            quality={100}
            alt=""
            className="rounded-xl"
          />
          <h1 className="text-5xl font-bold ">GrimChat</h1>
        </div>
        <div className="mt-10 flex items-center justify-center">
          <button
            className="flex items-center text-xl bg-white text-black px-5 py-2 rounded-md hover:bg-[#e2e2e2] transition-colors font-semibold space-x-3"
            onClick={login}
          >
            <Image
              src={GoogleLogo}
              width={30}
              height={30}
              priority={true}
              quality={100}
              alt=""
            />
            <span>Login With google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
