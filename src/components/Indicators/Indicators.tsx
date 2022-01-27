import { FC, useState, useEffect, ChangeEvent } from "react";
import { IndicatorUtil } from "../../utils/IndicatorUtil";
import { Field, FormikProps } from "formik";

interface IndicatorProps {
  name?: string;
  formik?: FormikProps<any>;
}

const Indicators: FC<IndicatorProps> = ({ name, formik }) => {
  const [indicator, setIndicator] = useState<any>();
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    console.log(indicator);
  }, [indicator]);

  return (
    <div>
      <input
        type="text"
        className="form-input"
        value={query}
        onChange={(ev: ChangeEvent<HTMLInputElement>) =>
          setQuery(ev.target.value)
        }
        placeholder="Search for indicators"
      />
      <div id="suggestion-form" className="p-4">
        {query &&
          IndicatorUtil.indicators
            .filter((indicator) =>
              indicator.display_name.toLowerCase().includes(query.toLowerCase())
            )
            .map((indicator) => {
              return (
                <div
                  key={indicator.name}
                  onClick={() => {
                    name &&
                      formik?.setFieldValue(name, { value: indicator.name });

                    name && formik?.setFieldValue(`${name}.type`, "indicator");

                    setIndicator(indicator);
                    setQuery("");
                  }}
                >
                  {indicator.display_name}
                </div>
              );
            })}

        <div>
          {/* display the form to edit the indicator */}
          <div hidden={!indicator}>{indicator?.name}</div>

          {/* render all the inputs */}
          <div>inputs to indicator</div>
          {indicator &&
            Object.keys(indicator.input_names).map(
              (input_name: string, idx: number) => {
                switch (typeof indicator.input_names[input_name]) {
                  case typeof []:
                    return indicator.input_names[input_name].map(
                      (val: string, idx: number) => {
                        return (
                          <div key={`${input_name}-${idx}`}>
                            <div>{`${input_name}[${idx}]`}</div>
                            <Field
                              name={`${name}.kwargs.inputs.${input_name}.${idx}`}
                              placeholder={`eg :- ${val}`}
                            />
                          </div>
                        );
                      }
                    );
                  default:
                    return (
                      <div key={idx}>
                        <div>{input_name}</div>
                        <Field
                          name={`${name}.kwargs.inputs.${input_name}`}
                          type="text"
                          placeholder={`eg :- ${indicator.input_names[input_name]}`}
                        />
                      </div>
                    );
                }
              }
            )}

          {/* render all the parameters */}
          <div hidden={!indicator}>parameters to indicator</div>
          {indicator &&
            Object.keys(indicator.parameters).map((parameter_key, idx) => {
              return (
                <div key={idx}>
                  <div>{parameter_key}</div>
                  <Field
                    name={`${name}.kwargs.paramentrs.${parameter_key}`}
                    placeholder={`eg :- ${indicator.parameters[parameter_key]}`}
                    type={typeof indicator.parameters[parameter_key]}
                  />
                </div>
              );
            })}

          <div hidden={!indicator}>outputs</div>
          {indicator &&
            indicator.output_names.map((out: string, idx: number) => {
              return (
                <span key={idx}>
                  &nbsp;{indicator.name}({out})&nbsp;
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Indicators;
