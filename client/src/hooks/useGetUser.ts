import { useFormBuilderContext } from "./useFormBuilderContext";
import axios from "axios";
import { userConsts } from "../consts/server-consts";
import useStatus from "./useStatus";

const useGetUser = () => {
  const { setUser } = useFormBuilderContext();
  const { status, setPending, setSuccess, setError } = useStatus();
  const getUser = async () => {
    setPending();
    try {
      const response = await axios.get(userConsts.getUserInfo, {
        withCredentials: true,
      });
      setUser(response.data);
      setSuccess();
    } catch (e) {
      setError();
    }
  };

  return { getUser, status };
};

export default useGetUser;
