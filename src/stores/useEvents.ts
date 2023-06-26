import { create } from "zustand";

// 订阅事件列表项
interface Event {
	func: Function;
	next: Event | null;
}

// 事件列表
interface Events {
	[event: string]: Event;
}

// 维护对象
interface PubSubStore {
	events: Events;
	subscribe: (mes: string, func: Function) => void;
	publish: (mes: string, args: Array<any>) => void;
	unSubscribe: (mes: string, func: Function) => void;
}

const useEvents = create<PubSubStore>((set, get) => ({
	events: {},
	subscribe: (mes, func) => {
		console.log("<<<", get().events);
		let newSub: Event = {
			func,
			next: null,
		};
		let events = get().events;
		if (!events[mes]) events[mes] = newSub;
		else {
			let event = events[mes];
			let firstEvent = event;
			while (event.next) {
				event = event.next;
			}
			event.next = newSub;
			events[mes] = firstEvent;
		}
		set(() => ({ events: events }));
	},
	publish: (mes, args) => {
		let events = get().events;
		if (!events[mes]) return;
		let event: Event | null = events[mes];
		while (event != null) {
			try {
				event.func(...args);
			} catch (e) {
				console.log("public error", mes, event.func, args);
			}
			event = event.next;
		}
	},
	unSubscribe: (mes, func) => {
		let events = get().events;
		if (!events[mes]) return;
		let event: Event | null = events[mes];
		while (event && Object.is(event.func, func)) {
			event = event.next;
		}
		let firstEvent = event;
		let next = event?.next || null;
		while (next != null) {
			if (Object.is(next.func, func)) {
				// 这里可以使用断言，因为next不为null时event必然不为null
				next = next.next;
				event!.next = next;
			}
			event = next;
			next = next?.next || null;
		}
		console.log("firstEvent", firstEvent);
		if (!firstEvent) {
			delete events[mes];
		} else events[mes] = firstEvent;
		set(() => ({
			events: events,
		}));
	},
}));

export default useEvents;
