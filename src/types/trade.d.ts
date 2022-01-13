export interface ITrade {
  endpoint: string;
  trading_symbol: string;
  exchange: string;
  quantity: number;
  tag: "ENTRY" | "EXIT";
  entry_price: number;
  price: number;
  type: "INDEXOPT" | "INDEXFUT" | "STOCKOPT" | "STOCK" | "STOCKFUT";
  max_quantity: number;
}
