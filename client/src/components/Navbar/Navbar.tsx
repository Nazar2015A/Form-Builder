import ThemeSwitcher from "../ui/theme-switcher";
import UserButton from "../UserButton";
import { useFormBuilderContext } from "../../hooks/useFormBuilderContext";

const Navbar = () => {
  const { user } = useFormBuilderContext();
  if (!user) return null;
  return (
    <div className="flex gap-4 items-center">
      <ThemeSwitcher />
      <UserButton />
    </div>
  );
};

export default Navbar;
