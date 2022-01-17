import { FC } from "react";
import NodeForm from "../NodeForm/NodeForm";
import { Formik, Form, Field } from "formik";
import { INodeForm } from "../../types/forms";

interface ICreateStrategyForm {
  name: string;
  profit_percentage: number;
  loss_percentage: number;
  lot_size: number;
  entry: INodeForm;
  exit: INodeForm;
}

const CreateStrategy: FC = () => {
  return (
    <div className="p-3">
      <div className="text-md py-2 text-center font-semibold">
        CREATE A STRATEGY
      </div>
      <Formik<ICreateStrategyForm>
        initialValues={{
          name: "",
          profit_percentage: 0,
          loss_percentage: 0,
          lot_size: 1,
          entry: { root: undefined },
          exit: { root: undefined },
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => {
          return (
            <Form>
              <div className="flex flex-col form space-y-3">
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-bold text-blue-500">
                    Enter Strategy Name
                  </label>
                  <Field name="name" className="form-input" type="text" />
                </div>

                <div className="flex space-x-2">
                  <div className="flex flex-col">
                    <label className="text-sm font-bold text-green-500">
                      profit (%)
                    </label>
                    <Field
                      name="profit_percentage"
                      className="form-input focus:ring-green-600 focus:border-transparent focus:ring-2"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-bold text-red-500">
                      loss (%)
                    </label>
                    <Field
                      name="loss_percentage"
                      className="form-input focus:ring-red-600 focus:border-transparent focus:ring-2"
                      type="number"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-bold">lot size</label>
                  <Field type="number" name="lot_size" className="form-input" />
                </div>

                <h1 className="text-center font-bold">STRATEGY SETTINGS</h1>

                <div>
                  <h1 className="font-bold text-green-500">entry conditions</h1>
                  <NodeForm formik={formik} name="entry" />
                </div>

                <div>
                  <h1 className="font-bold text-red-500">exit conditions</h1>
                  <NodeForm formik={formik} name="exit" />
                </div>
              </div>

              <button
                className="form-input py-2 px-3 bg-blue-900 text-white rounded-md shadow-lg"
                type="submit"
              >
                create
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateStrategy;
