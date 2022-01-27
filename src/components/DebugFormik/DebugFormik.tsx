import { FC } from "react";
import { useFormikContext } from "formik";

const DebugFormik: FC = () => {
  const { values } = useFormikContext();

  return <pre>{JSON.stringify(values, null, 2)}</pre>;
};

export default DebugFormik;
