import { setWithdrawPopup } from "../lib/atoms";

function WCard({ account, withdraw }) {
  function withdraw() {
    setWithdrawPopup({
      show: true,
    });
  }
  return (
    <div className="flex flex-row justify-around items-center gap-8">
      <button
        disabled={account.bonus + account.balance < 100}
        className="px-4 disabled:opacity-40 disabled:pointer-events-none py-2 text-sm rounded-md bg-[#3ebf81] text-center font-normal text-white/80 hover:bg-[#3ebf81]/80 transition-flow"
        onClick={withdraw}
      >
        {" "}
        Withdraw{" "}
      </button>
    </div>
  );
}

export default WCard;
