import cn from "classnames";

export default function Overlay({ children, z = 1, active = true }) {
  return (
    <>
      {active && (
        <div
          duration={500}
          delay={200}
          className={
            "fixed w-full inset-0  " +
            cn({
              " z-20 bg-black/60 backdrop-blur-sm ": z === 1,
              " z-30 bg-black/70  backdrop-blur-sm ": z === 2,
              " z-40 bg-black/70 backdrop-blur ": z === 3,
              " z-50 bg-black/70 backdrop-blur ": z === 4,
            })
          }
        ></div>
      )}
      <div
        className={
          "fixed  inset-y-0 mx-auto flex flex-col justify-center items-center w-[95%] lg:w-[80%] max-w-lg inset-x-0 " +
          cn({
            " z-20 ": z === 1,
            " z-30 ": z === 2,
            " z-40 ": z === 3,
            " z-50 ": z === 4,
          })
        }
      >
        <div
          className={
            "fixed  inset-y-0 mx-auto flex flex-col justify-center items-center w-[95%] lg:w-[80%] max-w-lg inset-x-0 " +
            cn({
              " z-20 ": z === 1,
              " z-30 ": z === 2,
              " z-40 ": z === 3,
              " z-50 ": z === 4,
            })
          }
        >
          {children}
        </div>
      </div>
    </>
  );
}
