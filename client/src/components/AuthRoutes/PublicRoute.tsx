import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useFormBuilderContext } from "../../hooks/useFormBuilderContext";
import { Status } from "../../types/status.enum";
import { RouteConsts } from "../../consts/route-consts";
import useGetUser from "../../hooks/useGetUser";

const PublicRoute = () => {
  const { user } = useFormBuilderContext();
  const { getUser, status } = useGetUser();
  useEffect(() => {
    getUser();
  }, []);
  if ((status === Status.IDOL && !user) || (status === Status.PENDING && !user))
    return null;
  if (!user) return <Outlet />;
  return <Navigate replace={true} to={RouteConsts.HOME} />;
};

export default PublicRoute;
