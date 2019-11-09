import { socket } from "../";

export const sendMessage = (cmd: string, data: any) => {
    socket.emit(cmd, data);
}