export interface ISheduleEntity {
    time: string,
    content: string,
}

export interface ISheduleData {
    items: Array<ISheduleEntity>
}

export interface ISheduleItem {
    time: string,
    content: string,
    isFinal: boolean,
    status: EventStatus,
}

export enum EventStatus {
    Upcoming = 0,
    Active = 1,
    Passed = 2,
    Error = 3
}