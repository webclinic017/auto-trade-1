import { TraderState } from "../redux/features/trade/tradeSlice";
import { IMargins, IPositions } from "../types/kite";
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

  public static isMarginSufficent(trade: ITrade, margins: IMargins): boolean {
    return trade.quantity * trade.entry_price < margins.equity.net;
  }

  public static isPositionPresent(trade: ITrade, positions: IPositions) {
    for (let position of positions.day) {
      if (
        trade.trading_symbol === position.tradingsymbol &&
        position.quantity > 0
      ) {
        return true;
      }
    }

    return false;
  }

  public static validateTrade(
    trade: ITrade,
    margins: IMargins,
    positions: IPositions
  ): boolean {
    if (trade.tag === "ENTRY") {
      return (
        TradeUtil.isMarginSufficent(trade, margins) &&
        trade.quantity > 0 &&
        trade.entry_price !== 0 &&
        trade.price !== 0
      );
    } else {
      return TradeUtil.isPositionPresent(trade, positions);
    }
  }

  public static shouldTrade(trade: ITrade, trade_modes: TraderState): boolean {
    let mode: boolean = false;

    switch (trade.type) {
      case "INDEXOPT":
        mode = trade_modes.index_options;
        break;
      case "STOCK":
        mode = trade_modes.stocks;
        break;
      case "STOCKOPT":
        mode = trade_modes.stock_options;
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
