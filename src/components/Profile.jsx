import AvatarImage from "../assets/avatar.png";

function Profile({ user }) {
  return (
    <div className="col-span-6 lg:col-span-2 flex flex-col justify-start items-center space-y-8 bg-bg3 py-8 rounded-md lg:min-h-[500px]">
      <div className="w-full self-center flex flex-col justify-center items-center">
        <img
          src={AvatarImage}
          className="w-1/5 rounded-full border border-white/20"
          alt="avatar"
        />
      </div>

      <div className="space-y-4 ">
        <p className="font-semibold text-center text-white text-xl lg:text-2xl">
          {user?.firstName} {user?.lastName}
        </p>
        <p className="text-center text-sm text-[#3ebf81]/80 font-normal">
          {user?.email}
        </p>

        <p className="text-center text-sm text-white font-normal">
          Joined: {new Date(user?.dateJoined || Date()).toLocaleString()}
        </p>
      </div>

      <ul className="space-y-4  flex flex-col justify-center items-start">
        <p className="text-yellow-600 my-2"> Actions </p>

        <a
          className="text-sm text-white/80 hover:text-white transition-flow hover:underline block w-full"
          href="/change-password"
        >
          {" "}
          Change Password{" "}
        </a>
        <a
          className="text-sm text-white/80 hover:text-white transition-flow hover:underline block w-full"
          href="/reset-password"
        >
          Reset Password{" "}
        </a>
        <a
          className="text-sm text-white/80 hover:text-white transition-flow hover:underline block w-full"
          href="/log-out"
        >
          Log out{" "}
        </a>
      </ul>
    </div>
  );
}

export default Profile;
