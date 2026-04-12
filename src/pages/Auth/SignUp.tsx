import PageMeta from '@/components/common/PageMeta';
import AuthLayout from '@/components/layout/auth/AuthLayout';
import SignUpForm from '@/components/layout/auth/signup/SignUpForm';

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Teacher Sign Up | Tuition Media"
        description="Create a teacher account on Tuition Media."
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
