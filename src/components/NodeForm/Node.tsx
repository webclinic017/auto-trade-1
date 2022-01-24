import { FC } from "react";
import { useNode } from "./Node.hooks";
import { Field, FieldProps, FormikProps } from "formik";
import { INodeForm } from "../../types/forms";
import { useGetIndicators } from "../../api/strategy_builder/getIndicators";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";

interface NodeProps {
  count?: number;
  name: string;
  formik: FormikProps<INodeForm>;
}

const Node: FC<NodeProps> = ({ formik, name, count = 0 }) => {
  const { nodeTypeHandler, isNodeOperator } = useNode();
  const { data: indicators } = useGetIndicators();

  return (
    <div className="form">
      <div className="bg-yellow-500 inline-block px-2 rounded-full text-sm text-white font-bold">
        {count}
      </div>

      <Field type="select" name={`${name}.type`}>
        {({ field }: FieldProps) => {
          return (
            <select
              {...field}
              name={`${name}.type`}
              onChange={(event) => {
                nodeTypeHandler(event);
                formik.setFieldValue(event.target.name, event.target.value);
              }}
              className="form-input"
              defaultValue={""}
              required
            >
              <option disabled value="">
                ----
              </option>
              <option value="indicator">indicator</option>
              <option value="operator">operator</option>
              <option value="constant">constant</option>
            </select>
          );
        }}
      </Field>

      <Field name={`${name}.value`} type="text">
        {({ field }: FieldProps) => {
          return (
            indicators !== undefined && (
              <Autocomplete
                options={indicators}
                getOptionLabel={(option) =>
                  `${option.key}(${option.input_string})`
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...field}
                    size="small"
                    label="Combo box"
                    variant="outlined"
                  />
                )}
              />
            )
          );
        }}
      </Field>
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
