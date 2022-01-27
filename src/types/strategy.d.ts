import { INode } from "./forms";

export interface IStrategy {
  id?: number;
  name: string;
  profit_percent: number;
  loss_percent: number;
  lot_size: number;
  entry_node?: INode;
  exit_node?: INode;
  tickers: string;
  enabled?: boolean;
}

export interface ITechnicalIndicator {
  key: string;
  id: number;
  name: string;
  input_string: string;
}
