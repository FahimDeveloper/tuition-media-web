import { Link } from "react-router-dom";

import PageMeta from "@/components/common/PageMeta";
import AuthFormLayout from "@/pages/AuthPages/AuthFormLayout";
import AuthLayout from "@/pages/AuthPages/AuthLayout";
import { authLinkClasses } from "@/pages/AuthPages/formStyles";
import SignInForm from "@/components/ui/forms/SignInForm";
import { useSignInForm } from "@/hooks/useSignInForm";

export default function SignIn() {
  const signInForm = useSignInForm();

  return (
    <>
      <PageMeta
        title="Teacher Sign In | TutoriumBD"
        description="Sign in to TutoriumBD to manage your teacher dashboard."
      />

      <AuthLayout>
        <AuthFormLayout
          title="Sign In"
          description="Enter your email and password to sign in."
          errorMessage={signInForm.errorMessage}
          footer={
            <>
              Don&apos;t have an account?{" "}
              <Link to="/signup" className={authLinkClasses}>
                Sign Up
              </Link>
            </>
          }
        >
          <SignInForm
            form={signInForm.form}
            isLoading={signInForm.isLoading}
            isCapsLockOn={signInForm.isCapsLockOn}
            onFinish={signInForm.handleSubmit}
            onValuesChange={signInForm.handleValuesChange}
            onPasswordKeyEvent={signInForm.handlePasswordKeyEvent}
          />
        </AuthFormLayout>
      </AuthLayout>
    </>
  );
}
