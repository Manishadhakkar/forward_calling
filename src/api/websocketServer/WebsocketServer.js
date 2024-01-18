import Echo from "laravel-echo";

window.Pusher = require("pusher-js");

window.Echo = new Echo({
    broadcaster: "pusher",
    wsHost: window.location.hostname,
    wsPort: 6001, // Laravel WebSockets default port
    disableStats: true,
});
