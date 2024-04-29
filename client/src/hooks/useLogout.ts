import { useFormBuilderContext } from "./useFormBuilderContext";
import axios from "axios";
import { authConsts } from "../consts/server-consts";

const useLogout = () => {
  const { setUser } = useFormBuilderContext();
  const logout = async () => {
    try {
      await axios.get(authConsts.logout, {
        withCredentials: true,
      });
      setUser(null);
    } catch (e) {
      console.log(e);
    }
  };

  return logout;
};

export default useLogout;
