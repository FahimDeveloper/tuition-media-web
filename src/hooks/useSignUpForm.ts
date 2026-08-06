import { type KeyboardEvent, useMemo, useState } from "react";
import { Form } from "antd";
import type { FormProps } from "antd";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/hooks/useAppHooks";
import { useRegistrationMutation } from "@/redux/features/auth/authApi";
import { loggedInUser } from "@/redux/features/auth/authSlice";
import { getApiErrorMessage } from "@/utils/api-error.utils";
import { isCapsLockActive } from "@/utils/keyboard.utils";
import {
  SIGN_UP_COPY,
  SIGN_UP_MESSAGES,
  type SignUpFormValues,
} from "@/validations/auth.validation";

import {
  buildRegistrationPayload,
  clearSignUpFieldErrors,
  getSignUpFieldErrors,
} from "../utils/signUp.utils";

export const useSignUpForm = () => {
  const [form] = Form.useForm<SignUpFormValues>();
  const [registerTeacher, { isLoading }] = useRegistrationMutation();

  const [errorMessage, setErrorMessage] = useState("");
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlePasswordKeyEvent = (event: KeyboardEvent<HTMLInputElement>) => {
    setIsCapsLockOn(isCapsLockActive(event));
  };

  const handleValuesChange: FormProps<SignUpFormValues>["onValuesChange"] = (
    changedValues,
  ) => {
    if (errorMessage) {
      setErrorMessage("");
    }

    const changedFieldNames = Object.keys(changedValues) as Array<
      keyof SignUpFormValues
    >;

    clearSignUpFieldErrors(form, changedFieldNames);

    if ("password" in changedValues && form.getFieldValue("confirmPassword")) {
      void form.validateFields(["confirmPassword"]);
    }
  };

  const confirmPasswordRules = useMemo(
    () => [
      { required: true, message: SIGN_UP_MESSAGES.confirmPasswordRequired },
      {
        validator: async (_: unknown, value?: string) => {
          if (!value || value === form.getFieldValue("password")) {
            return;
          }

          throw new Error(SIGN_UP_MESSAGES.confirmPasswordMismatch);
        },
      },
    ],
    [form],
  );

  const handleSubmit: FormProps<SignUpFormValues>["onFinish"] = async (
    values,
  ) => {
    setErrorMessage("");

    try {
      const payload = buildRegistrationPayload(values);
      const response = await registerTeacher(payload).unwrap();

      dispatch(loggedInUser(response.results));
      navigate("/tutor", { replace: true });
    } catch (error) {
      const fieldErrors = getSignUpFieldErrors(error);

      if (fieldErrors.length > 0) {
        form.setFields(fieldErrors);
      }

      setErrorMessage(getApiErrorMessage(error, SIGN_UP_COPY.genericError));
    }
  };

  return {
    form,
    isLoading,
    errorMessage,
    isCapsLockOn,
    confirmPasswordRules,
    handleSubmit,
    handleValuesChange,
    handlePasswordKeyEvent,
  };
};
