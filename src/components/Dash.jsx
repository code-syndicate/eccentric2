import BitcoinImage from "../assets/crypto/bitcoin.png";

function Dash() {
  return (
    <div className="">
      {/* Balances Cards  */}

      <div>
        <div className="bg-bg1">
          <div>
            <span> Bitcoin </span>

            <span> $1200.07 </span>
          </div>

          <div>
            <img src={BitcoinImage} alt="bitcoin" className="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dash;
