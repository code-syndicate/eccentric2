import { BsX } from "react-icons/bs";
import Overlay from "./Overlay";
import cn from "classnames";
import { Slide } from "react-reveal";
import { $notify, setNotifyMessage } from "../lib/atoms";
import { useStore } from "@nanostores/react";

export default function Notify() {
  const notifyState = useStore($notify);

  //   console.log(state);

  const {
    content,
    title,
    show,
    working,
    onAccept,
    onAcceptText,
    onReject,
    onRejectText,
    allowClose = true,
  } = notifyState;

  function closeSelf() {
    if (show && !working) {
      setNotifyMessage({
        show: false,
      });
    }
  }

  function handleAccept() {
    closeSelf();
    if (onAccept) {
      onAccept();
    }
  }

  function handleReject() {
    closeSelf();
    if (onReject) {
      onReject();
    }
  }

  if (!show) return null;

  return (
    <Overlay z={4}>
      <Slide
        right
        className="flex w-full flex-row justify-center items-center"
        duration={300}
      >
        {/* <Zoom top right duration="250" className="w-full"> */}
        <div className="w-full bg-background py-4 px-4">
          {allowClose && (
            <div className="flex flex-row justify-end items-center w-full">
              <BsX
                role="button"
                className="text-3xl text-white hover:text-white/80 transition-flow"
                onClick={closeSelf}
              />
            </div>
          )}

          <p className="text-white text-lg font-semibold">{title}</p>

          <p className="text-white text-sm">{content}</p>

          <div className="mt-4 flex flex-row justify-end items-center w-full">
            {onReject && (
              <button
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-semibold text-white/80 hover:text-white/60 transition-flow disabled:cursor-not-allowed disabled:pointer-events-none "
                )}
                onClick={handleReject}
                disabled={working}
              >
                {onRejectText}
              </button>
            )}

            {onAccept && (
              <button
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-semibold text-white/80 hover:text-white/60 transition-flow ml-4 disabled:cursor-not-allowed disabled:pointer-events-none "
                )}
                onClick={handleAccept}
                disabled={working}
              >
                {onAcceptText}
              </button>
            )}
          </div>
        </div>
        {/* </Zoom> */}
      </Slide>
    </Overlay>
  );
}
