import "./App.css";
import "@ant-design/flowchart/dist/index.css";

import { Outlet } from "react-router-dom";
// import routes from "./router";

function App({ children }: { children: React.ReactNode }) {
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
