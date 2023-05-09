import { Line } from "@ant-design/charts";
export default function MeetingCount() {
	const data = [
		{ date: "2-13", "会议数/周": 3 },
		{ date: "2-20", "会议数/周": 4 },
		{ date: "2-27", "会议数/周": 2 },
		{ date: "3-05", "会议数/周": 2 },
		{ date: "3-12", "会议数/周": 3 },
		{ date: "3-19", "会议数/周": 6 },
		{ date: "3-26", "会议数/周": 7 },
		{ date: "4-02", "会议数/周": 4 },
		{ date: "4-05", "会议数/周": 3 },
	];

	const config = {
		data,
		height: 300,
		xField: "date",
		yField: "会议数/周",
		point: {
			size: 5,
			shape: "circle",
		},
	};
	return <Line {...config} />;
}
