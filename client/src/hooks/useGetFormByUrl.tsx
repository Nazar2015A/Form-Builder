import { useEffect, useState } from "react";
import axios from "axios";
import { formConsts } from "../consts/server-consts";
import { Form } from "../types/form.type";
import useStatus from "./useStatus";

const useGetFormByUrl = (url: string | undefined) => {
  const [form, setForm] = useState<Form | null>(null);
  const { status, setPending, setSuccess, setError } = useStatus();
  const getFormByUrl = async () => {
    setPending();
    try {
      const response = await axios.get(`${formConsts.formByUrl}/${url}`, {
        withCredentials: true,
      });
      setForm(response.data);
      setSuccess();
    } catch (e) {
      setError();
    }
  };
  useEffect(() => {
    getFormByUrl();
  }, [url]);

  return { form, status };
};

export default useGetFormByUrl;
