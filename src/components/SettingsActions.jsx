import cn from "classnames";
import ProfileForm from "./ProfileForm";
import { useState } from "react";

function SettingsActions() {
  const [active, setActive] = useState(0);

  function selectActive(n) {
    return () => {
      setActive(n);
    };
  }

  return (
    <div class="col-span-6 lg:col-span-4 bg-bg3 py-4 px-4 rounded-md">
      <div class="flex flex-row justify-start space-x-4 items-center overflow-x-auto">
        <h3
          onClick={selectActive(0)}
          className={
            "text-base lg:text-lg cursor-pointer border-b inline-block pb-1 " +
            cn({
              " text-white/40  border-white/20 hover:text-white/60 hover:border-white/40 transition-flow  ":
                active !== 0,
              " text-white border-white ": active == 0,
            })
          }
        >
          Profile
        </h3>

        <h3
          onClick={selectActive(1)}
          className={
            "text-base cursor-pointer lg:text-lg border-b inline-block pb-1 " +
            cn({
              " text-white/40  border-white/20 hover:text-white/60 hover:border-white/40 transition-flow ":
                active !== 1,
              " text-white border-white ": active == 1,
            })
          }
        >
          Edit profile
        </h3>
        <h3
          onClick={selectActive(2)}
          className={
            "text-base lg:text-lg cursor-pointer  border-b inline-block pb-1 " +
            cn({
              " text-white/40  border-white/20 hover:text-white/60 hover:border-white/40 transition-flow":
                active !== 2,
              " text-white border-white ": active == 2,
            })
          }
        >
          Notifications
        </h3>
      </div>

      <div
        className={cn({
          " block ": active === 0,
          " hidden ": active !== 0,
        })}
      >
        <ProfileForm />
      </div>
    </div>
  );
}

export default SettingsActions;
