import { FC } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import { useLogin } from "./Login.hooks";
import { UserCrenentials } from "../../types/user";

const Login: FC = () => {
  const { loginUser, isLoginError } = useLogin();

  return (
    <Formik<UserCrenentials>
      initialValues={{ username: "", password: "" }}
      onSubmit={loginUser}
    >
      {() => {
        return (
          <Form>
            <div className="flex flex-col h-screen">
              <div className="flex-1 flex flex-col p-3 mb-2 items-center justify-center">
                {isLoginError && (
                  <strong className="font-sans text-red-700">
                    error occured while login
                  </strong>
                )}
                <strong className="text-3xl md:text-xl font-serif text-blue-400 my-2">
                  Login
                </strong>
                <Field name="username">
                  {({ field }: FieldProps) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="username"
                      className="form-input md:w-80"
                    />
                  )}
                </Field>
                <Field name="password">
                  {({ field }: FieldProps) => (
                    <input
                      {...field}
                      type="password"
                      placeholder="password"
                      className="form-input md:w-80"
                    />
                  )}
                </Field>

                <button
                  type="submit"
                  className="bg-blue-500 my-2 shadow w-20 p-1 text-white font-bold md:w-36 md:p-2 rounded-lg"
                >
                  Login
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Login;
