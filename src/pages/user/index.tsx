import { useState, useEffect } from "react";
import { Card } from "antd";
import useUsers from "@/stores/useUsers";
import UserView from "./view";

export default function User() {
	const userList = useUsers((state) => state.userList);
	return (
		<Card bordered={false} className='p-center'>
			<UserView userList={userList} />
		</Card>
	);
}
