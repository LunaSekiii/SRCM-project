import { ReactNode } from "react";
// 将文件大小（Byte）转化成带单位的字符串
const units = ["Byte", "Kb", "Mb", "Gb", "Tb"];
export default function fileSizeFormat(size: number): ReactNode {
	let s: number = size;
	let u: number = 0;
	while (s >= 1024) {
		// s = Math.floor(s);
		s /= 1024;
		u++;
	}
	return (
		<>
			<div
				style={{
					width: "100%",
					display: "flex",
					alignItems: "baseline",
					gap: "7px",
				}}
			>
				{s.toFixed(2)}
				<span
					style={{
						fontSize: "1.2rem",
						fontWeight: "600",
						verticalAlign: "bottom",
					}}
				>
					{units[u]}
				</span>
			</div>
		</>
	);
}
