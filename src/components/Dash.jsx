import Balances from "./Balances";

function Dash() {
  return (
    <div className=" px-4  lg:pt-12 space-y-6">
      {/* Balances Cards  */}

      <div className="grid grid-cols-1 md:grid-cols-3  2xl:grid-cols-6 gap-6 lg:gap-8">
        <div className="bg-bg3 md:col-span-1 lg:col-span-2 shadow-xl rounded-md p-6 pb-16 w-full flex flex-row justify-between items-center">
          <div className="flex flex-col space-y-2">
            <span className="text-xl  text-text1"> Main Balance </span>

            <span className="text-2xl lg:text-3xl font-semibold">
              {" "}
              $1200.07{" "}
            </span>
          </div>
        </div>

        <div className="bg-bg3 md:col-span-1 lg:col-span-2  shadow-xl rounded-md p-6 pb-16 w-full flex flex-row justify-between items-center">
          <div className="flex flex-col space-y-2">
            <span className="text-xl  text-text1"> Bonus Balance </span>

            <span className="text-2xl lg:text-3xl font-semibold">
              {" "}
              $1200.07{" "}
            </span>
          </div>
        </div>

        <div className="md:col-span-1 lg:col-span-2 bg-bg3  rounded-md p-6">
          <div className="flex flex-col space-y-2">
            <span className="text-xl  text-text1 text-center">
              {" "}
              Total Balance{" "}
            </span>

            <p className="text-sm lg:text-base text-[#3ebf81]  font-semibold text-center">
              {" "}
              $12,344.00 USD
            </p>
          </div>

          <div className="self-center w-full flex flex-row justify-center items-center mt-4">
            <button className=" px-3 py-1 text-sm rounded-md bg-[#3ebf81]  text-center font-semibold text-white/80  hover:bg-[#3ebf81]/80 transition-flow">
              {" "}
              Withdraw{" "}
            </button>
          </div>
        </div>
      </div>

      <div className=" grid grid-cols-1  gap-6">
        <div className=" bg-bg3  rounded-md"></div>
      </div>
    </div>
  );
}

export default Dash;
