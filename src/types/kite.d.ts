interface MarginAvailable {
  adhoc_margin: number;
  cash: number;
  collateral: number;
  intraday_payin: number;
  live_balance: number;
}

interface MarginUtilised {
  debits: number;
  exposure: number;
  m2m_realised: number;
  m2m_unrealised: number;
  option_premium: number;
  payout: number;
  span: number;
  holding_sales: number;
  turnover: number;
}

export interface IMargins {
  equity: {
    enabled: boolean;
    net: number;
    available: MarginAvailable;
    utilised: MarginUtilised;
  };
  commodity: {
    enabled: boolean;
    net: number;
    available: MarginAvailable;
    utilised: MarginUtilised;
  };
}

export interface IPosition {
  tradingsymbol: string;
  exchange: string;
  instrument_token: number;
  product: string;

  quantity: number;
  overnight_quantity: number;
  multiplier: number;

  average_price: number;
  close_price: number;
  last_price: number;
  value: number;
  pnl: number;
  m2m: number;
  unrealised: number;
  realised: number;

  buy_quantity: number;
  buy_price: number;
  buy_value: number;
  buy_m2m: number;

  day_buy_quantity: number;
  day_buy_price: number;
  day_buy_value: number;

  day_sell_quantity: number;
  day_sell_price: number;
  day_sell_value: number;

  sell_quantity: number;
  sell_price: number;
  sell_value: number;
  sell_m2m: number;
}

export interface IPositions {
  net: IPosition[];
  day: IPosition[];
}
