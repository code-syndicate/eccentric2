import React from "react";
import BitCoinImage from "../assets/crypto/bitcoin.png";

function Profile() {
  return (
    <div class="col-span-6 lg:col-span-2 flex flex-col justify-start items-center space-y-8 bg-bg3 py-8 rounded-md lg:min-h-[500px]">
      <div class="w-full self-center flex flex-col justify-center items-center">
        <img
          src={BitCoinImage}
          class="w-2/5 rounded-full border border-white/20"
          alt="bitcoin image"
        />
      </div>

      <div>
        <p class="font-bold text-center text-xl lg:text-2xl">Jay Garrick</p>
        <p class="text-center text-sm text-[#3ebf81]/80 font-semibold">
          jaygarrick@gmail.com
        </p>
      </div>
    </div>
  );
}

export default Profile;
