import { Timeline } from "antd";

const items = [
	{
		label: "2015-09-01",
		children: "大二组会",
		color: "gray",
	},
	{
		label: "2015-09-01 09:12:11",
		children: "大三组会",
		color: "green",
	},
	{
		children: "毕设",
		color: "blue",
	},
	{
		label: "2015-09-01 09:12:11",
		children: "成果展示",
		color: "blue",
	},
];

export default function ConferenceTimeLine() {
	return <Timeline mode="left" items={items} />;
}
