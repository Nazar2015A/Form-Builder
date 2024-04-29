import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import useLogout from "../hooks/useLogout";
import { useFormBuilderContext } from "../hooks/useFormBuilderContext";

const UserButton = () => {
  const { user } = useFormBuilderContext();
  const logout = useLogout();
  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              title={`${user.firstName} ${user.lastName}`}
              className="bg-transparent hover:bg-transparent focus-visible:ring-0 shadow-none"
            >
              <img
                className="w-[30px] h-[30px] rounded-full"
                src={user.photo}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>{user.firstName}</DropdownMenuItem>
            <DropdownMenuItem>{user.lastName}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0">
              <Button
                className="w-full h-full justify-start py-2 px-1.5"
                variant="ghost"
                onClick={handleLogout}
              >
                Log out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </div>
  );
};

export default UserButton;
