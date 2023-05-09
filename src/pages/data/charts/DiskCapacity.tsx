import { Liquid } from "@ant-design/plots";

export default function DiskCapacity() {
	const config = {
		height: 300,
		percent: 0.55,

		outline: {
			border: 4,
			distance: 8,
		},
		wave: {
			length: 128,
		},
	};
	return <Liquid {...config} />;
}
