import {useState} from 'react';
import {Form, Alert, Button} from 'antd';
import {SignupBrandBadge, SignupImagePanel} from './components/LayoutParts';
import {SignupFormFields} from './components/SignupFormFields';
import {TEXT, STYLES} from './signup.constants';
import {prepareSignupPayload} from './signup.utils';

import type {SignupFormValues} from './signup.types';
import {useRegistrationMutation} from '@/redux/features/auth/authApi';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

export default function SignupForm() {
  const [form] = Form.useForm();
  const [capsLock, setCapsLock] = useState(false);
  const navigate = useNavigate();

  // Replace this with your specific RTK Query hook or submission logic
  const [signup, {isLoading, error}] = useRegistrationMutation();

  const onFinish = async (values: SignupFormValues) => {
    try {
      const payload = prepareSignupPayload(values);
      await signup(payload).unwrap();
      // then navigate to login page
      const result = await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Registration successful!',
        showConfirmButton: true,
        confirmButtonText: 'Login',
      });

      if (result.isConfirmed) {
        navigate('/login');
      }
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <section className={STYLES.section}>
      <div className={STYLES.backgroundGlow} />
      <div className="relative mx-auto max-w-7xl">
        <div className={STYLES.cardShell}>
          <div className="flex flex-col lg:flex-row">
            <SignupImagePanel />
            <div className="lg:w-[58%] xl:w-[54%] p-6 sm:p-10 lg:p-12">
              <SignupBrandBadge />
              <div className="mt-8">
                <span className="font-poppins text-xs font-semibold uppercase tracking-widest text-brand-700 dark:text-brand-300">
                  {TEXT.eyebrow}
                </span>
                <h1 className="mt-3 font-poppins text-3xl font-extrabold text-text-strong dark:text-white sm:text-4xl">
                  {TEXT.title}
                </h1>
                <p className="mt-4 text-sm text-text-strong/75 dark:text-gray-400">
                  {TEXT.intro}
                </p>
              </div>

              <div className="mt-8">
                {error && (
                  <Alert
                    type="error"
                    showIcon
                    title={TEXT.genericError}
                    className="mb-6 rounded-xl"
                  />
                )}

                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  requiredMark={false}
                  className={STYLES.form}
                  scrollToFirstError
                >
                  <SignupFormFields
                    form={form}
                    isLoading={isLoading}
                    capsLock={capsLock}
                    onKey={(e) => setCapsLock(e.getModifierState('CapsLock'))}
                  />

                  <div className="mt-10">
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isLoading}
                      block
                      className={STYLES.primaryButton}
                    >
                      {isLoading ? TEXT.submitting : TEXT.submit}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
