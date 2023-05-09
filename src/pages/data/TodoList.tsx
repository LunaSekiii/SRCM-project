import { Space, Card, Checkbox } from "antd";
import { useState } from "react";

const todoList = [
	{
		name: "购买设备",
		done: true,
	},
	{
		name: "项目报告",
		done: false,
	},
];

export default function TodoList() {
	const [list, setList] = useState(todoList);
	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			{list.map((todo) => (
				<Card
					key={todo.name}
					title={todo.name}
					bordered={false}
					style={{ width: "100%" }}
					hoverable={true}
					onClick={() => {
						setList((list) => {
							return list.map((t) => ({
								...t,
								done: t.name === todo.name ? !t.done : t.done,
							}));
						});
					}}
				>
					<Checkbox checked={todo.done}>
						{todo.done ? "已完成" : "待完成"}
					</Checkbox>
				</Card>
			))}
		</Space>
	);
}
