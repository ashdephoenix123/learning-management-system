import { Server } from "socket.io";

export default function handler(req, res) {
	if (res.socket.server.io) {
		console.log("Server already started!");
		res.end();
		return;
	}

	const io = new Server(res.socket.server, {
		path: "/api/socket_io",
		addTrailingSlash: false,
	});
	res.socket.server.io = io;

	const onConnection = (socket) => {
		console.log("New connection", socket.id);
		socket.on("createdMessage", (msg) => {
			console.log("New message", msg);
			socket.emit("newIncomingMessage", msg);
		});
	};

	io.on("connection", onConnection);

	console.log("Socket server started successfully!");
	res.end();
}