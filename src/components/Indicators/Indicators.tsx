import { FC, useState, useEffect } from "react";
import { IndicatorUtil } from "../../utils/IndicatorUtil";

const Indicators: FC = () => {
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
        onChange={(ev) => setQuery(ev.target.value)}
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
                            <input
                              name={`${idx}`}
                              defaultValue={val}
                              placeholder={`${input_name}[${idx}]`}
                            />
                          </div>
                        );
                      }
                    );
                  default:
                    return (
                      <div key={idx}>
                        <div>{input_name}</div>
                        <input
                          name={input_name}
                          type="text"
                          placeholder={input_name}
                          defaultValue={indicator.input_names[input_name]}
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
                  <input
                    name={parameter_key}
                    placeholder={parameter_key}
                    defaultValue={indicator.parameters[parameter_key]}
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
