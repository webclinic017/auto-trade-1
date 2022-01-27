import { ChangeEvent, FC } from "react";
import { useNode } from "./Node.hooks";
import { Field, FormikProps } from "formik";
import { INodeForm } from "../../types/forms";
import Indicators from "../Indicators/Indicators";

interface NodeProps {
  count?: number;
  name: string;
  formik: FormikProps<INodeForm>;
}

const Node: FC<NodeProps> = ({ formik, name, count = 0 }) => {
  const { nodeTypeHandler, isNodeOperator, isNodeIndicator } = useNode();

  return (
    <div className="form">
      <div className="bg-yellow-500 inline-block px-2 rounded-full text-sm text-white font-bold">
        {count}
      </div>

      <Field
        as="select"
        name={`${name}.type`}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
          nodeTypeHandler(event);
          formik.setFieldValue(name, {});
          formik.setFieldValue(event.target.name, event.target.value);
        }}
        required
        className="form-input"
        type="select"
        defaultValue=""
      >
        <option selected disabled value="">
          ---select---
        </option>
        <option value="indicator">indicator</option>
        <option value="operator">operator</option>
        <option value="constant">constant</option>
      </Field>

      {isNodeIndicator ? (
        <Indicators name={name} formik={formik} />
      ) : (
        <Field
          name={`${name}.value`}
          type="text"
          required
          className="form-input"
          placeholder="value"
        />
      )}
      <br />
      {isNodeOperator && (
        <div className="p-1 border-2 border-blue-300 shadow-md">
          <div>
            <Node
              formik={formik}
              name={`${name}.left_child`}
              count={count + 1}
            />
          </div>
          <br />
          <div>
            <Node
              formik={formik}
              name={`${name}.right_child`}
              count={count + 1}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Node;
