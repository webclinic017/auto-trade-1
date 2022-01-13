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

  public static shouldTrade(trade: ITrade): boolean {
    switch (trade.tag) {
      case "ENTRY":
        return trade.entry_price > 0 && trade.price > 0;
      case "EXIT":
        return true;
      default:
        return false;
    }
  }
}
