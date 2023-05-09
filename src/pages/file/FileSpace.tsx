import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Bullet } from "@ant-design/plots";

export default function FileSpace() {
	const data = [
		{
			title: "储存空间",
			ranges: [40, 85, 100],
			已用: [80],
			target: 85,
		},
	];
	const config = {
		data,
		measureField: "已用",
		rangeField: "ranges",
		targetField: "target",
		xField: "title",
		color: {
			range: ["#bfeec8", "#FFe0b0", "#FFbcb8"],
			measure: "#5B8FF9",
			target: "#39a3f4",
		},
		xAxis: {
			line: null,
		},
		yAxis: false,
		label: {
			target: true,
		},
		// 自定义 legend
		legend: {
			custom: true,
			position: "bottom",
			items: [
				{
					value: "空闲",
					name: "空闲",
					marker: {
						symbol: "square",
						style: {
							fill: "#bfeec8",
							r: 5,
						},
					},
				},
				{
					value: "正常",
					name: "正常",
					marker: {
						symbol: "square",
						style: {
							fill: "#FFe0b0",
							r: 5,
						},
					},
				},
				{
					value: "不足",
					name: "不足",
					marker: {
						symbol: "square",
						style: {
							fill: "#FFbcb8",
							r: 5,
						},
					},
				},
				{
					value: "实际值",
					name: "实际值",
					marker: {
						symbol: "square",
						style: {
							fill: "#5B8FF9",
							r: 5,
						},
					},
				},
				{
					value: "警戒值",
					name: "警戒值",
					marker: {
						symbol: "line",
						style: {
							stroke: "#39a3f4",
							r: 5,
						},
					},
				},
			],
		},
	};
	return <Bullet {...config} />;
}
