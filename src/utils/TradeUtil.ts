import { ITradeModes } from "../reducers";
import { ITrade } from "../types/trade";
import { UserProfile } from "../types/user";

export class TradeUtil {
  public static generateTrade(trade: ITrade, profile?: UserProfile): ITrade {
    if (!profile) {
      return trade;
    }

    if (trade.type === "INDEXOPT" || trade.type === "INDEXFUT") {
      if (trade.trading_symbol.includes("BANKNIFTY")) {
        trade.quantity *= profile.banknifty_lot;
      } else {
        trade.quantity *= profile.nifty_lot;
      }
    }

    return trade;
  }

  public static shouldTrade(trade: ITrade, trade_modes: ITradeModes): boolean {
    if (!trade_modes.should_trade) {
      return false;
    }

    let mode: boolean = false;

    switch (trade.type) {
      case "INDEXFUT":
        mode = trade_modes.should_trade_index_futures;
        break;
      case "INDEXOPT":
        mode = trade_modes.should_trade_index_options;
        break;
      case "STOCK":
        mode = trade_modes.should_trade_stocks;
        break;
      case "STOCKOPT":
        mode = trade_modes.should_trade_stock_options;
        break;
    }

    switch (trade.tag) {
      case "ENTRY":
        return trade.entry_price > 0 && trade.price > 0 && mode;
      case "EXIT":
        return true && mode;
      default:
        return false;
    }
  }
}
