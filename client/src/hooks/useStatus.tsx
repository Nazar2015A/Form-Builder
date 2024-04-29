import { useState } from "react";
import { Status } from "../types/status.enum";

const useStatus = () => {
  const [status, setStatus] = useState<Status>(Status.IDOL);
  const setPending = () => {
    setStatus(Status.PENDING);
  };
  const setSuccess = () => {
    setStatus(Status.SUCCESS);
  };
  const setError = () => {
    setStatus(Status.ERROR);
  };
  return { status, setPending, setSuccess, setError };
};

export default useStatus;
