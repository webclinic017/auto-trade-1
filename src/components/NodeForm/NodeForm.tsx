import { FC } from "react";
import { Formik, Form } from "formik";
import Node from "./Node";
import { INodeForm } from "../../types/forms";

const NodeForm: FC = () => {
  return (
    <Formik<INodeForm>
      initialValues={{ root: undefined }}
      onSubmit={(values) => console.log(JSON.stringify(values))}
    >
      {(formik) => {
        return (
          <Form>
            <Node formik={formik} name="root" />
            <button
              type="submit"
              className="text-sm bg-blue-500 text-white py-1 px-3 rounded-md shadow-lg my-2"
            >
              CREATE
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default NodeForm;
