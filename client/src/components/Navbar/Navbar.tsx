import ThemeSwitcher from "../ui/theme-switcher";
import UserButton from "../UserButton";
import { useFormBuilderContext } from "../../hooks/useFormBuilderContext";

const Navbar = () => {
  const { user } = useFormBuilderContext();
  return (
    <div className="flex gap-4 items-center">
      <ThemeSwitcher />
      {user ? <UserButton /> : <div className="w-[60px]"></div>}
    </div>
  );
};

export default Navbar;
