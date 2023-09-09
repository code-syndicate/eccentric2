import { BsSpeedometer, BsX } from "react-icons/bs";
import { AiOutlineSetting, AiOutlineWallet } from "react-icons/ai";
import { MdCurrencyExchange, MdLogout } from "react-icons/md";
import { useStore } from "@nanostores/react";
import { $sidebar, setShowSidebar } from "../lib/atoms";
import { Slide } from "react-reveal";
import Overlay from "./Overlay";
import LogoImage from "../assets/logo.png";
import cn from "classnames";

const items = [
  {
    title: "Dashboard",
    icon: BsSpeedometer,
    link: "/dashboard",
  },

  {
    title: "Exchanges",
    icon: MdCurrencyExchange,
    link: "/exchanges",
  },

  // {
  //   title: "Prices",
  //   icon: MdPriceCheck,
  // },

  {
    title: "Wallets",
    icon: AiOutlineWallet,
    link: "/wallets",
  },

  {
    title: "Settings",
    icon: AiOutlineSetting,
    link: "/settings",
  },

  {
    title: "Logout",
    icon: MdLogout,
    link: "/log-out",
  },
];

function Sidebar() {
  const sidebarState = useStore($sidebar);

  return (
    <>
      <aside
        className={
          "bg-bg2 w-[80%] hidden md:flex md:w-[20%] lg:w-[20%] px-6 pb-10 pt-32 max-w-[300px] min-h-screen  fixed left-0 top-0 bottom-0  flex-col justify-start items-center space-y-8  border-r-4 border-white "
        }
      >
        {items.map((v, i) => {
          const Icon = v.icon;

          return (
            <a
              href={v.link}
              key={i}
              className={
                "w-full font-semibold text-left text-text1/80 hover:bg-text1/10 cursor-pointer transition-flow rounded border border-text1/20 p-4 capitalize flex flex-row justify-start space-x-4 items-center" +
                cn({
                  " border  border-white ": location.pathname === v.link,
                })
              }
            >
              <Icon
                className={cn("text-2xl", {
                  " text-white  ": location.pathname === v.link,
                })}
              />
              <span
                className={cn({
                  " text-white  ": location.pathname === v.link,
                })}
              >
                {" "}
                {v.title}{" "}
              </span>
            </a>
          );
        })}
      </aside>

      {sidebarState.show && (
        <Overlay z={3}>
          <Slide
            left
            className="flex w-full flex-row justify-center items-center"
            duration={300}
          >
            <aside
              className={
                "bg-bg2 w-[80%] lg:w-[25%] px-6 pb-10 pt-12 max-w-[300px] min-h-screen  fixed left-0 top-0 bottom-0 lg:flex flex-col justify-start items-center space-y-8  border-r-4 border-white "
              }
            >
              <div className=" lg:hidden absolute top-4 right-4  ">
                {sidebarState.show && (
                  <BsX
                    className="text-text1 text-3xl "
                    onClick={() => setShowSidebar(false)}
                  />
                )}
              </div>

              <div className="">
                <img src={LogoImage} alt="Logo" className="w-40" />
              </div>

              {items.map((v, i) => {
                const Icon = v.icon;

                return (
                  <a
                    href={v.link}
                    key={i}
                    className={
                      "w-full font-semibold text-left text-text1/80 hover:bg-text1/10 cursor-pointer transition-flow rounded border border-text1/20 p-4 capitalize flex flex-row justify-start space-x-4 items-center" +
                      cn({
                        " border border-white ": location.pathname === v.link,
                      })
                    }
                  >
                    <Icon className="text-2xl" />
                    <span> {v.title} </span>
                  </a>
                );
              })}
            </aside>
          </Slide>
        </Overlay>
      )}
    </>
  );
}

export default Sidebar;
