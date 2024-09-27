import BitcoinImage from "../assets/crypto/bitcoin.png";
import EthereumImage from "../assets/crypto/etherium.png";
import DogecoinImage from "../assets/crypto/dogecoin.png";
import BinanceImage from "../assets/crypto/binance.png";
import BitcoinQr from "../assets/qr/bitcoin.jpeg";
import EthereumQr from "../assets/qr/ethereum.jpeg";
import BinanceQr from "../assets/qr/binance.jpeg";

import { setWalletQr } from "../lib/atoms";

const items = [
  {
    image: BitcoinImage,
    title: "Bitcoin",
    key: "bitcoin",
    qr: BitcoinQr,
    addr: "bc1qjdt2uqg5m2lqtankhe9lknqd5vwa58c7cyhdpn",
  },

  {
    image: EthereumImage,
    title: "Ethereum",
    key: "ethereum",
    qr: EthereumQr,
    addr: "0xa8304e8b3b4b01a43368fe912d10085e19472bd8",
  },

  {
    image: DogecoinImage,
    title: "Dogecoin",
    key: "dogecoin",
  },

  {
    image: BinanceImage,
    title: "Binance",
    key: "smartchain",
    addr: "0x18ab89c22699ad4aaa52a1fcef44e4d6486c3834",
    qr: BinanceQr,
  },
];

function Balances({ account }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  2xl:grid-cols-4 gap-6 lg:gap-8">
      {items.map((v, i) => {
        return (
          <div key={i} className="bg-bg3 pb-4 rounded-md p-6">
            <div
              key={i}
              className="bg-bg3  rounded-md  pb-2 w-full flex flex-row justify-between items-center "
            >
              <div className="flex flex-col space-y-2">
                <span className="text-xl  text-text1"> {v.title} </span>

                <span className="text-2xl lg:text-2xl font-semibold">
                  {" "}
                  $ {account[v.key]}
                </span>
              </div>

              <div className="self-start">
                <img src={v.image} alt="bitcoin" className="" />
              </div>
            </div>

            <div className="self-center w-full flex flex-row justify-start items-center mt-2">
              <div className="flex flex-row justify-around items-center gap-8">
                <button
                  disabled={!v.qr}
                  onClick={() => {
                    if (!v.qr) return;
                    setWalletQr({
                      img: v.qr,
                      show: true,
                      address: v.addr || "",
                    });
                  }}
                  className="px-4 disabled:opacity-40 disabled:pointer-events-none py-1 border-[1px] border-white/40 hover:border-white/80 hover:bg-bg2 text-sm rounded-md text-center font-normal text-white/80 transition-flow"
                >
                  Deposit
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Balances;
