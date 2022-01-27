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
    </div>
  );
};

export default NodeForm;
