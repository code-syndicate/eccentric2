import LogoImage from "../assets/logo.png";
import { BsSearch, BsChat, BsBell, BsX } from "react-icons/bs";
import { VscMenu } from "react-icons/vsc";
import { $sidebar, setShowSidebar } from "../lib/atoms";
import AvatarImage from "../assets/avatar.png";
import { useStore } from "@nanostores/react";

function Header({ user }) {
  const sidebarState = useStore($sidebar);

  return (
    <>
      <div id="google_translate_element"></div>

      <header className="bg-bg2 z-40 fixed inset-x-0 top-0 py-2 lg:py-6 w-full flex flex-row justify-between items-center px-6">
        <div className=" lg:hidden  ">
          {sidebarState.show ? (
            <BsX
              className="text-text1 text-3xl "
              onClick={() => setShowSidebar(false)}
            />
          ) : (
            <VscMenu
              className="text-text1 text-3xl "
              onClick={() => setShowSidebar(true)}
            />
          )}
        </div>
        <div className="hidden lg:flex flex-row justify-between lg:w-[50%] xl:w-[40%]">
          <div className="">
            <img src={LogoImage} alt="Logo" className="w-40" />
          </div>

          <div className="relative hidden lg:block ">
            <input className="field" type="text" placeholder="Search" />

            <BsSearch className="text-text1/80 text-lg absolute top-[50%] right-[5%] text-text1 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center space-x-4 lg:space-x-8">
          <div className="flex flex-row justify-center items-center space-x-4">
            <div className="bg-bg1 border border-white/0 hover:border-white/60 cursor-pointer transition-flow relative rounded-xl p-3">
              <BsChat className="text-text1/80 text-xl " />
            </div>

            <a
              href="/settings?v=2"
              className="bg-bg1 border border-white/0 hover:border-white/60 cursor-pointer transition-flow relative rounded-xl p-3"
            >
              <BsBell className="text-text1/80 text-xl " />

              {user?.notifications?.filter((c) => !c.isRead).length > 0 && (
                <div className="absolute bg-white rounded-full px-2 top-0 lg:-top-2 -right-2 lg:-right-4">
                  <span className="text-sm text-bg1">
                    {" "}
                    {user?.notifications?.filter((c) => !c.isRead).length}{" "}
                  </span>
                </div>
              )}
            </a>
          </div>

          <a
            href="/settings?v=1"
            className="flex flex-row justify-between items-center space-x-6 relative"
          >
            <img
              src={AvatarImage}
              alt="Avatar"
              className="w-10 h-10 lg:w-15 lg:h-15 rounded-full"
            />

            {user.isAdmin && (
              <a
                href="/admin"
                className="absolute -bottom-4 z-10 right-[2px] text-sm lg:hidden text-red-500"
              >
                {" "}
                Admin{" "}
              </a>
            )}

            <div className="hidden lg:flex flex-col justify-center items-start space-y-2">
              <span className="font-bold">
                {user?.firstName} {user?.lastName}
              </span>

              {user.isAdmin && (
                <a href="/admin" className="text-sm text-red-500">
                  {" "}
                  Admin{" "}
                </a>
              )}
            </div>
          </a>
        </div>
      </header>
    </>
  );
}

export default Header;
