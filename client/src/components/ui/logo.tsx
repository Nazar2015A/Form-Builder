import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <Link
        className="font-bold text-3xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer"
        to="/"
      >
        Form Builder
      </Link>
    </div>
  );
};

export default Logo;
