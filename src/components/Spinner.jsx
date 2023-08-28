import cn from "classnames";

const Spinner = ({ size = "small", invert = false }) => {
  const tiny = size === "tiny";
  const mini = size === "mini";
  const small = size === "small";
  const large = size === "large";
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div
        className={
          "  block animate-spin-fast  rounded-full    " +
          cn({
            "  h-12 w-12 border-4 ": large,
            " h-8 w-8 border-4 ": small,
            " h-6 w-6 border-2 ": mini,
            " h-4 w-4 border-2 ": tiny,
            " border-t-background border-r-background border-b-primary border-l-primary text-background ":
              invert,
            " text-primary border-t-primary  border-b-background border-l-background border-r-primary":
              !invert,
          })
        }
      ></div>
    </div>
  );
};

export default Spinner;
