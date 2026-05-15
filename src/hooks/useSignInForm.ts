import { type KeyboardEvent, useState } from "react";
import { Form } from "antd";
import type { FormProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/hooks/useAppHooks";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { loggedInUser } from "@/redux/features/auth/authSlice";
import { isCapsLockActive } from "@/utils/keyboard.utils";
import { normalizeEmail } from "@/utils/string.utils";
import type { SignInFormValues } from "@/validations/auth.validation";

import { getLoginErrorMessage, getSafeRedirectPath } from "../utils/signIn.utils";

export const useSignInForm = () => {
  const [form] = Form.useForm<SignInFormValues>();
  const [login, { isLoading }] = useLoginMutation();

  const [errorMessage, setErrorMessage] = useState("");
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handlePasswordKeyEvent = (event: KeyboardEvent<HTMLInputElement>) => {
    setIsCapsLockOn(isCapsLockActive(event));
  };

  const handleValuesChange: FormProps<SignInFormValues>["onValuesChange"] =
    () => {
      if (errorMessage) {
        setErrorMessage("");
      }
    };

  const handleSubmit: FormProps<SignInFormValues>["onFinish"] = async (
    values,
  ) => {
    setErrorMessage("");

    try {
      const response = await login({
        email: normalizeEmail(values.email),
        password: values.password,
      }).unwrap();

      dispatch(loggedInUser(response.results));
      form.resetFields(["password"]);
      navigate(getSafeRedirectPath(location.state), { replace: true });
    } catch (error) {
      setErrorMessage(getLoginErrorMessage(error));
    }
  };

  return {
    form,
    isLoading,
    errorMessage,
    isCapsLockOn,
    handleSubmit,
    handleValuesChange,
    handlePasswordKeyEvent,
  };
};
