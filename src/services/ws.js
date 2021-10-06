import { ws } from "../api";

export const stock = new WebSocket(ws.stocks);
export const index_opt = new WebSocket(ws.index);
export const index_fut = new WebSocket(ws.index_fut);
export const stock_opt = new WebSocket(ws.stock_options);
export const stock_fut = new WebSocket(ws.stock_futures);
export const socket = new WebSocket(ws.socket);
