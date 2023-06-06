import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RouterProvider, createHashRouter } from "react-router-dom";
import routes from "./router";
import "./index.css";

const HashRouter = createHashRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		{/* <App /> */}
		<RouterProvider router={HashRouter} />
	</React.StrictMode>
);
