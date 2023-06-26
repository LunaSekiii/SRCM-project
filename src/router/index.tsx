import App from "@/App";
import BaseLayout from "@/layouts/BaseLayout";
import Data from "@/pages/data";
import ConferenceView from "@/pages/conference/view";
import ConferenceCreate from "@/pages/conference/create";
import ConferenceInfo from "@/pages/conference/info";
import File from "@/pages/file";
import FileInfo from "@/pages/file/FileInfo";
import FileGroup from "@/pages/file/group";

import SelfFile from "@/pages/file/self";
import UserFile from "@/pages/file/user";

import User from "@/pages/user";
import UserCreate from "@/pages/user/create";
import UserChenge4admin from "@/pages/user/chenge4admin";
import ProjectView from "@/pages/project/view";
import ProjectCreate from "@/pages/project/create";
import Login from "@/pages/login";
import NotFound from "@/pages/NotFound";
import { RouteObject, Navigate } from "react-router-dom";

const routes: RouteObject[] = [
	{
		path: "/",
		element: (
			<App>
				<BaseLayout />
			</App>
		),
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
					{
						path: "info/:id",
						element: <ConferenceInfo />,
					},
				],
			},
			{
				path: "file",
				children: [
					{ path: "self", element: <SelfFile /> },
					{ path: "user/:id", element: <UserFile /> },
					{ path: "info/:id", element: <FileInfo /> },
					// { path: "group", element: <FileGroup /> },
				],
			},
			{
				path: "user",
				children: [
					{ path: "view", element: <User /> },
					{ path: "create", element: <UserCreate /> },
					{ path: "change/:id", element: <UserChenge4admin /> },
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
			{ path: "", element: <Navigate to='/data' replace /> },
			{ path: "*", element: <Navigate to='/404' replace /> },
			{ path: "404", element: <NotFound /> },
		],
	},
	{ path: "/login", element: <Login /> },
	{ path: "*", element: <Navigate to='/404' replace /> },
];

export default routes;
