import {Button, Form, Input} from 'antd';
import {AiOutlineLock, AiOutlineUser} from 'react-icons/ai';
import {useEffect} from 'react';
import Swal from 'sweetalert2';
import {useAppDispatch} from '../../hooks/useAppHooks';
import {loggedInUser} from '../../redux/features/auth/authSlice';
import {useLoginMutation} from '../../redux/features/auth/authApi';
import {NavLink, useNavigate, type NavigateFunction} from 'react-router-dom';
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const [login, {data, isLoading, isError, isSuccess, error}] =
    useLoginMutation();
  useEffect(() => {
    if (isSuccess) {
      //   Swal.fire({
      //     title: 'Success',
      //     text: `${data?.message}`,
      //     icon: 'success',
      //     showConfirmButton: false,
      //     timer: 1500,
      //     iconColor: '#355F92',
      //   });
      navigate('/dashboard');
      dispatch(loggedInUser(data?.results));
    }
    if (isError) {
      Swal.fire({
        title: 'Oops..',
        text: `${(error as any)?.data?.message || 'something went wrong'}`,
        icon: 'error',
        confirmButtonColor: '#355F92',
      });
    }
  }, [isError, isSuccess, error, data, dispatch]);
  const onFinish = (values: any) => {
    login(values);
  };
  return (
    <div className="flex">
      <div className="w-108 h-screen flex justify-center bg-primary items-center rounded-e-3xl">
        <NavLink
          to="/"
          className="font-poppins text-3xl font-extrabold tracking-tight text-neutral transition-colors duration-200 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70"
        >
          Tuition <span className="text-brand-600">Media</span>
        </NavLink>
      </div>
      <div className="w-full flex flex-col justify-center gap-10 items-center">
        <h2 className="text-center font-poppins font-medium text-4xl leading-11.5 text-[#043E41]">
          Welcome to Tuition <span className="font-semibold">Media</span>
        </h2>
        <div className="w-120 space-y-5">
          <h3 className="text-center font-poppins text-2xl font-medium text-[#022B2D]">
            Login first to your account
          </h3>
          <Form onFinish={onFinish} layout="vertical" className="space-y-4">
            <Form.Item
              name="email"
              rules={[{required: true, message: 'Please input your email!'}]}
              label="Email"
              className="m-0"
            >
              <Input
                className="h-10"
                prefix={<AiOutlineUser className="size-5" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{required: true, message: 'Please input your Password!'}]}
              label="Password"
              className="m-0"
            >
              <Input.Password
                className="h-10"
                prefix={<AiOutlineLock className="size-5" />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                size="large"
                loading={isLoading}
                className="w-full"
                type="primary"
                htmlType="submit"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
