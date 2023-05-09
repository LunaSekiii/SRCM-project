import "./App.css";
import "@ant-design/flowchart/dist/index.css";
import { useRoutes } from "react-router-dom";
import routes from "./router";

function App() {
	const Routes = () => useRoutes(routes);
	return (
		<>
			<Routes />
		</>
	);
}

export default App;
