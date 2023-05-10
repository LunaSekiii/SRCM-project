import { Progress, Space, Card } from "antd";

interface Project {
	name: string;
	percent: number;
	status: string;
}

const projectState: Project[] = [
	{
		name: "项目1",
		percent: 30,
		status: "active",
	},
	{
		name: "项目2",
		percent: 50,
		status: "active",
	},
	{
		name: "项目3",
		percent: 70,
		status: "exception",
	},
	{
		name: "项目4",
		percent: 100,
		status: "success",
	},
];

export default function ProjectProgress() {
	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			{projectState.map((project) => (
				<Card
					key={project.name}
					title={project.name}
					bordered={false}
					style={{ width: "100%" }}
					hoverable={true}
				>
					<Progress
						percent={project.percent}
						// status={project.status}
					/>
				</Card>
			))}
		</Space>
	);
}
