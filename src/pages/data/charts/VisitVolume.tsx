import { DualAxes } from "@ant-design/plots";

export default function VisitVolume() {
	const data = [
		{
			time: "2019-03",
			访客量: 350,
			新用户量: 800,
		},
		{
			time: "2019-04",
			访客量: 900,
			新用户量: 600,
		},
		{
			time: "2019-05",
			访客量: 300,
			新用户量: 400,
		},
		{
			time: "2019-06",
			访客量: 450,
			新用户量: 380,
		},
		{
			time: "2019-07",
			访客量: 470,
			新用户量: 220,
		},
	];
	const config = {
		data: [data, data],
		height: 300,
		xField: "time",
		yField: ["访客量", "新用户量"],
		geometryOptions: [
			{
				geometry: "column",
			},
			{
				geometry: "line",
				lineStyle: {
					lineWidth: 2,
				},
			},
		],
	};
	return <DualAxes {...config} />;
}
