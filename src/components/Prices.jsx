import Balances from "./Balances";

function Prices({ auth }) {
  const account = auth.user.account;
  return (
    <div>
      <div className=" px-4  lg:pt-12 space-y-6">
        {/* Balances Cards  */}

        <Balances account={account} />

        {/* <div className="rounded-md bg-bg3 w-full  min-h-[200px] p-6">
          <div>
            <span className="text-2xl  text-left text-text1">
              Crytocurrency Prices
            </span>

            <div className="relative ">
              <input className="field" type="text" placeholder="Search" />

              <BsSearch className="text-text1/80 text-lg absolute top-[50%] right-[5%] text-text1 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Prices;
