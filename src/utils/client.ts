import { client } from "../";

export const sendMessage = (data: string) => {
	const interval = setInterval(() => {
    	if (data && client.readyState === client.OPEN) {
		    client.send(data);
		    clearInterval(interval);
		}
    }, 1000);
}