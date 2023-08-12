import io from "socket.io-client";
import { Environment } from "./Environment";

const currentEnvironment = Environment.Production;

console.log(`Current environment: ${currentEnvironment}`);

const url =
    currentEnvironment === Environment.Production
        ? "https://atari-monk-socket-io-server.azurewebsites.net"
        : "http://localhost:3000";

console.log(`Current url: ${url}`);

const socket = io(url);

document.getElementById("sendButton")?.addEventListener("click", () => {
    const messageInput = document.getElementById(
        "messageInput"
    ) as HTMLInputElement;
    const message = messageInput.value;
    socket.emit("message", message);
    messageInput.value = "";
});

socket.on("message", (data: string) => {
    const messages = document.getElementById("messages");
    if (messages) {
        const li = document.createElement("li");
        li.textContent = data;
        messages.appendChild(li);
    }
});
