import React, { useEffect } from "react";
import { fetchUtil, makeUrl } from "../lib/utils";
import config from "../config";
import { setNotifyMessage } from "../lib/atoms";
import { useState } from "react";
import Spinner from "./Spinner";

function CreditUser({ authUser }) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="py-4">
      <div className=" border border-white/50 bg-bg1 rounded-md self-stretch shadow-md shadow-white/20">
        <div className="p-6 rounded-md space-y-6">
          <div className="py-16 space-y-6 flex flex-col justify-center items-center">
            <h1>Credit A User</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreditUser;
