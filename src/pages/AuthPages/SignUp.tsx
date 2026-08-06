import { Link } from "react-router-dom";

import PageMeta from "@/components/common/PageMeta";
import AuthFormLayout from "@/pages/AuthPages/AuthFormLayout";
import AuthLayout from "@/pages/AuthPages/AuthLayout";
import { authLinkClasses } from "@/pages/AuthPages/formStyles";
import SignUpForm from "@/components/ui/forms/SignUpForm";
import { useSignUpForm } from "@/hooks/useSignUpForm";
import { SIGN_UP_COPY } from "@/validations/auth.validation";

export default function SignUp() {
  const signUpForm = useSignUpForm();

  return (
    <>
      <PageMeta
        title="Teacher Sign Up | TutoriumBD"
        description="Create a teacher account on TutoriumBD."
      />

      <AuthLayout>
        <AuthFormLayout
          title={SIGN_UP_COPY.title}
          description={SIGN_UP_COPY.description}
          errorMessage={signUpForm.errorMessage}
          maxWidth="2xl"
          scrollable
          footer={
            <>
              Already have an account?{" "}
              <Link to="/login" className={authLinkClasses}>
                Sign In
              </Link>
            </>
          }
        >
          <SignUpForm
            form={signUpForm.form}
            isLoading={signUpForm.isLoading}
            isCapsLockOn={signUpForm.isCapsLockOn}
            confirmPasswordRules={signUpForm.confirmPasswordRules}
            onFinish={signUpForm.handleSubmit}
            onValuesChange={signUpForm.handleValuesChange}
            onPasswordKeyEvent={signUpForm.handlePasswordKeyEvent}
          />
        </AuthFormLayout>
      </AuthLayout>
    </>
  );
}
