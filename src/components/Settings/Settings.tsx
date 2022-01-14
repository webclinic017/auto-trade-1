import { FC } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import { useAuth } from "../../context/AuthContext";
import { useSettings } from "./Settings.hooks";
import { UserProfileUpdateForm } from "../../types/forms";
import { UserUtil } from "../../utils/UserUtil";
import { UserProfile } from "../../types/user";

const Settings: FC = () => {
  const { profile } = useAuth();
  const { updateProfile, isUserUpdateFormSubmitDisabled } = useSettings();

  return (
    <Formik<UserProfileUpdateForm>
      initialValues={UserUtil.getUserProfileUpdateForm(profile as UserProfile)}
      onSubmit={updateProfile}
    >
      {() => {
        return (
          <Form>
            <div className="flex flex-col p-3">
              <div>
                <label>api key</label>
                <Field name="api_key">
                  {({ field }: FieldProps) => {
                    return (
                      <input
                        {...field}
                        name="api_key"
                        type="password"
                        className="form-input p-2"
                      />
                    );
                  }}
                </Field>
              </div>
              <div>
                <label>api secret</label>
                <Field name="api_secret">
                  {({ field }: FieldProps) => {
                    return (
                      <input
                        {...field}
                        name="api_secret"
                        type="password"
                        className="form-input p-2"
                      />
                    );
                  }}
                </Field>
              </div>
              <div>
                <label>investment</label>
                <Field name="investment">
                  {({ field }: FieldProps) => {
                    return (
                      <input
                        {...field}
                        name="investment"
                        type="number"
                        className="form-input p-2"
                      />
                    );
                  }}
                </Field>
              </div>
              <div>
                <label>nifty lot size</label>
                <Field name="nifty_lot">
                  {({ field }: FieldProps) => {
                    return (
                      <input
                        {...field}
                        name="nifty_lot"
                        type="number"
                        className="form-input p-2"
                      />
                    );
                  }}
                </Field>
              </div>
              <div>
                <label>bank nifty lot size</label>
                <Field name="banknifty_lot">
                  {({ field }: FieldProps) => {
                    return (
                      <input
                        {...field}
                        name="banknifty_lot"
                        type="number"
                        className="form-input p-2"
                      />
                    );
                  }}
                </Field>
              </div>
              <div>
                <label>max profit</label>
                <Field name="max_profit">
                  {({ field }: FieldProps) => {
                    return (
                      <input
                        {...field}
                        name="max_profit"
                        type="number"
                        className="form-input p-2"
                      />
                    );
                  }}
                </Field>
              </div>
              <div>
                <label>max loss</label>
                <Field name="max_loss">
                  {({ field }: FieldProps) => {
                    return (
                      <input
                        {...field}
                        name="max_loss"
                        type="number"
                        className="form-input p-2"
                      />
                    );
                  }}
                </Field>
              </div>

              <button
                type="submit"
                className="bg-blue-500 p-2 font-bold text-white shadow-lg"
                disabled={isUserUpdateFormSubmitDisabled}
              >
                update settings
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Settings;
