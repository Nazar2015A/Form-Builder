import { useEffect, useState } from "react";
import axios from "axios";
import { formConsts } from "../consts/server-consts";
import { Form } from "../types/form.type";
import useStatus from "./useStatus";

const useGetFormById = (id: string | undefined) => {
  const [form, setForm] = useState<Form | null>(null);
  const { status, setPending, setSuccess, setError } = useStatus();
  const getFormById = async () => {
    setPending();
    try {
      const response = await axios.get(`${formConsts.formSubmit}/${id}`, {
        withCredentials: true,
      });
      setForm(response.data);
      setSuccess();
    } catch (e) {
      setError();
    }
  };
  useEffect(() => {
    getFormById();
  }, [id]);

  return { form, status };
};

export default useGetFormById;
