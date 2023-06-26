import { useState } from "react";
import { NormalToolbar } from "md-editor-rt";
import { UnorderedListOutlined } from "@ant-design/icons";
import useEvents from "@/stores/useEvents";

export default function MeetingInfoTool() {
	const pubEvent = useEvents((state) => state.publish);
	return (
		<NormalToolbar
			title='会议信息'
			onClick={() => {
				pubEvent("conferenceModalSwitch", []);
			}}
			trigger={
				<span className='md-editor-icon' style={{ lineHeight: "100%" }}>
					<UnorderedListOutlined
						style={{ verticalAlign: "middle" }}
					/>
				</span>
			}
		/>
	);
}
