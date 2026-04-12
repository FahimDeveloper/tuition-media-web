import PageMeta from '@/components/common/PageMeta';
import AuthLayout from '@/components/layout/auth/AuthLayout';
import SignInForm from '@/components/layout/auth/signin/SignInForm';

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Teacher Sign In | TutoriumBD"
        description="Sign in to TutoriumBD to manage your teacher dashboard."
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
