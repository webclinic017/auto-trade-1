import { FC } from "react";
import { FormikProps } from "formik";
import Node from "./Node";

interface NodeFormProps {
  name: string;
  formik: FormikProps<any>;
}

const NodeForm: FC<NodeFormProps> = ({ name, formik }) => {
  return (
    <div>
      <Node formik={formik} name={`${name}.root`} />
      <button
        type="button"
        className="text-sm bg-blue-500 text-white py-1 px-3 rounded-md shadow-lg my-2"
      >
        VISUALIZE
      </button>
    </div>
  );
};

export default NodeForm;
