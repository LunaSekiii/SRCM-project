import { useEffect } from "react";
import "./App.css";
import "@ant-design/flowchart/dist/index.css";
import useLogin from "@/stores/useLogin";

import { Outlet } from "react-router-dom";
// import routes from "./router";

function App({ children }: { children: React.ReactNode }) {
	const getState = useLogin((state) => state.getState);
	useEffect(() => {
		// getState();
	}, []);
	// const Routes = () => useRoutes(routes);
	return (
		<>
			{children}
			{/* <Routes /> */}
			{/* <RouterGuard /> */}
		</>
	);
}

export default App;
