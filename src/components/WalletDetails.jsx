import { BsX } from "react-icons/bs";
import Overlay from "./Overlay";
import cn from "classnames";
import { Slide } from "react-reveal";
import { $walletQr, setWalletQr } from "../lib/atoms";
import { useStore } from "@nanostores/react";

export default function Notify() {
  const walletQr = useStore($walletQr);

  //   console.log(state);

  const { show, img, address } = walletQr;

  function closeSelf() {
    if (show) {
      setWalletQr({
        show: false,
      });
    }
  }

  if (!show) return null;

  return (
    <Overlay z={3}>
      <Slide
        right
        className="flex w-full flex-row justify-center items-center"
        duration={300}
      >
        {/* <Zoom top right duration="250" className="w-full"> */}
        <div className="w-full bg-background space-y-4 py-4 px-4">
          <div className="flex flex-row justify-end items-center w-full">
            <BsX
              role="button"
              className="text-3xl text-white hover:text-white/80 transition-flow"
              onClick={closeSelf}
            />
          </div>

          <p className="text-white text-center text-base font-normal">
            {" "}
            Scan the QR code or copy the address below to deposit.
          </p>

          <div className="mt-4 flex flex-col justify-center items-center">
            <img
              src={img}
              alt="qr"
              className=" w-[300px] h-[300px] object-cover"
            />
          </div>

          <p className="text-white  text-center text-base font-bold">
            {" "}
            {address}
          </p>
        </div>
        {/* </Zoom> */}
      </Slide>
    </Overlay>
  );
}
