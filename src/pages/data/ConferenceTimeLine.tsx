import { useState, useEffect } from "react";
import { Timeline } from "antd";
import { HomeData } from ".";
import "dayjs";
import dayjs from "dayjs";
import type { TimeLineItemProps } from "antd/es/timeline/TimelineItem";
import { valueType } from "antd/es/statistic/utils";

export default function ConferenceTimeLine({
	conferences,
}: {
	conferences: HomeData["meetingList"] | undefined;
}) {
	const [meetingList, setMeetingList] = useState<TimeLineItemProps[]>();
	const formatConference = (
		conference: HomeData["meetingList"]["list"][number]
	) => {
		let item = {
			label: dayjs(conference.beginTime).format("YYYY-MM-DD HH:mm:ss"),
			children: conference.meetName,
			color: dayjs().isBefore(dayjs(conference.beginTime))
				? "blue"
				: dayjs().isBefore(dayjs(conference.endTime))
				? "green"
				: "gray" || "gray",
		};
		console.log("item", item);
		return item as TimeLineItemProps;
	};
	useEffect(() => {
		if (conferences) {
			setMeetingList(
				conferences.list.map((conference) => {
					// console.log(
					// 	"conference",
					// 	dayjs(conference.beginTime).format("YYYY-MM-DD HH:mm:ss")
					// );
					return formatConference(conference);
				})
			);
		}
	}, [conferences]);
	return <Timeline mode='left' items={meetingList} />;
}
