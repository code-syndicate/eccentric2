import { BsSpeedometer } from "react-icons/bs";
import { AiOutlineSetting, AiOutlineWallet } from "react-icons/ai";
import { MdCurrencyExchange, MdPriceCheck } from "react-icons/md";
import cn from "classnames";

const items = [
  {
    title: "Dashboard",
    icon: BsSpeedometer,
  },

  {
    title: "Exchanges",
    icon: MdCurrencyExchange,
  },

  {
    title: "Prices",
    icon: MdPriceCheck,
  },

  {
    title: "Wallets",
    icon: AiOutlineWallet,
  },

  {
    title: "Settings",
    icon: AiOutlineSetting,
  },
];

function Sidebar() {
  return (
    <aside className="bg-bg2 w-[80%] lg:w-[25%] px-6 pb-10 pt-32 max-w-[300px] min-h-screen hidden fixed left-0 top-0 bottom-0 lg:flex flex-col justify-start items-center space-y-8  border-r-4 border-white ">
      {items.map((v, i) => {
        const Icon = v.icon;

        return (
          <div
            key={i}
            className="w-full font-semibold text-left text-text1/80 hover:bg-text1/10 cursor-pointer transition-flow rounded border border-text1/20 p-4 capitalize flex flex-row justify-start space-x-4 items-center"
          >
            <Icon className="text-2xl" />
            <span> {v.title} </span>
          </div>
        );
      })}
    </aside>
  );
}

export default Sidebar;
