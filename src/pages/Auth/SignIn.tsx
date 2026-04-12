import PageMeta from '@/components/common/PageMeta';
import AuthLayout from '@/components/layout/auth/AuthLayout';
import SignInForm from '@/components/layout/auth/signin/SignInForm';

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Teacher Sign In | Tuition Media"
        description="Sign in to Tuition Media to manage your teacher dashboard."
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
