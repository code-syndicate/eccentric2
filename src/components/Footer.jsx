import config from "../config";

function Footer() {
  return (
    <footer className="mt-12 border-t border-white/20 pb-4 top-[35vh] bottom-0 left-0 right-0 z-20 flex flex-col space-y-2 justify-center items-center lg:space-y-0  lg:flex-row lg:justify-between pt-8 px-6">
      <div>
        <p className="text-sm text-center">
          &copy; {new Date().getFullYear()} . All rights reserved.{" "}
          <span className="text-[#3ebf81]">
            &nbsp;&nbsp;
            {config.appName}
          </span>
        </p>
      </div>

      <ul className="text-sm flex flex-row space-x-4 justify-start items-center">
        <li>Help Center</li>
        <li>Terms of Service</li>
        <li>Privacy</li>
      </ul>
    </footer>
  );
}

export default Footer;
