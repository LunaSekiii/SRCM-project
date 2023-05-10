import BaseLayout from "@/layouts/BaseLayout";
import Data from "@/pages/data";
import ConferenceView from "@/pages/conference/view";
import ConferenceCreate from "@/pages/conference/create";
import File from "@/pages/file";
import UserView from "@/pages/user/view";
import UserCreate from "@/pages/user/create";
import ProjectView from "@/pages/project/view";
import ProjectCreate from "@/pages/project/create";
import NotFound from "@/pages/NotFound";
import { RouteObject, Navigate } from "react-router-dom";

const routes: RouteObject[] = [
	{
		path: "",
		element: <BaseLayout />,
		children: [
			{
				path: "conference",
				children: [
					{
						path: "view",
						element: <ConferenceView />,
					},
					{
						path: "create",
						element: <ConferenceCreate />,
					},
				],
			},
			{
				path: "file",
				children: [{ path: "self", element: <File /> }],
			},
			{
				path: "user",
				children: [
					{ path: "view", element: <UserView /> },
					{ path: "create", element: <UserCreate /> },
				],
			},
			{
				path: "project",
				children: [
					{ path: "self", element: <ProjectView /> },
					{ path: "create", element: <ProjectCreate /> },
				],
			},
			{
				path: "data",
				element: <Data />,
			},
			{ path: "", element: <Navigate to="/data" replace /> },
			{ path: "*", element: <Navigate to="/404" replace /> },
			{ path: "404", element: <NotFound /> },
		],
	},
	{ path: "*", element: <Navigate to="/404" replace /> },
];

export default routes;
