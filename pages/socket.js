import { useEffect } from "react";
import { io } from "socket.io-client";

let socket;

export default function Home() {
	const socketInitializer = async () => {
		// We call this just to make sure we turn on the websocket server
		await fetch("/api/socket");

		socket = io(undefined, {
			path: "/api/socket_io",
		});

		socket.on("connect", () => {
			console.log("Connected", socket.id);
		});

		socket.on("newIncomingMessage", (msg) => {
			console.log("New message in client", msg);
		});
	};

	useEffect(() => {
		socketInitializer();
	}, []);

	return (
		<div>
			<button
				onClick={() => {
					socket.emit("createdMessage", "Hello world!");
				}}
			>
				Send message
			</button>
		</div>
	);
}