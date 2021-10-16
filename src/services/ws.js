import { ws } from "../api";

export const socket = new WebSocket(ws.socket);
export const sockuser = new WebSocket(ws.users);
export const orders = new WebSocket(ws.orders);
