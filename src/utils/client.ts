import { client } from "../";

export const sendMessage = (data: string) => {
    if (data && client.readyState === client.OPEN) {
        client.send(data);
        setTimeout(sendMessage, 1000);
    }
}