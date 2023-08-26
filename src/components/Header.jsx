import LogoImage from "../assets/logo.png";
import { BsSearch, BsChat, BsBell } from "react-icons/bs";
import { VscMenu } from "react-icons/vsc";

import AvatarImage from "../assets/avatar.png";

function Header() {
  return (
    <header className="bg-bg2 py-2 lg:py-6 w-full flex flex-row justify-between items-center px-6">
      <div className=" lg:hidden  ">
        <VscMenu className="text-text1 text-3xl " />
      </div>
      <div className="hidden lg:flex flex-row justify-between w-[40%]">
        <div className="">
          <img src={LogoImage} alt="Logo" className="w-40" />
        </div>

        <div className="relative hidden lg:block ">
          <input
            className="rounded-md border text-sm border-text1/20 focus:border-text1/80 transition-flow text-text1 outline-none py-2 px-4 pr-16 bg-bg2"
            type="text"
            placeholder="Search"
          />

          <BsSearch className="text-text1/80 text-lg absolute top-[50%] right-[5%] text-text1 -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center space-x-4 lg:space-x-8">
        <div className="flex flex-row justify-center items-center space-x-4">
          <div className="bg-bg1 rounded-xl p-3">
            <BsChat className="text-text1/80 text-xl " />
          </div>

          <div className="bg-bg1 rounded-xl p-3">
            <BsBell className="text-text1/80 text-xl " />
          </div>
        </div>

        <div className="flex flex-row justify-between items-center space-x-6">
          <img
            src={AvatarImage}
            alt="Avatar"
            className="w-10 h-10 lg:w-15 lg:h-15 rounded-full"
          />

          <div className="hidden lg:flex flex-col justify-center items-start space-y-2">
            <span className="font-bold"> Kim Jong </span>
            <span className="text-sm text-text1/60"> Admin </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
