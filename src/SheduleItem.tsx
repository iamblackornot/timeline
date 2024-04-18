import * as React from 'react';

import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { EventStatus, ISheduleItem } from './interfaces';

// interface IScheduleItemProps {
//     time: string,
//     content: string,
//     isFinal?: boolean,
// }

const ScheduleItem: React.FC<ISheduleItem> = (props: ISheduleItem) => {
    
    const colorMap: Map<EventStatus, string> = new Map();
    
    colorMap.set(EventStatus.Upcoming, "255, 255, 255");
    colorMap.set(EventStatus.Active,   "220, 250,  85");
    colorMap.set(EventStatus.Passed,   "140, 140, 140");
    colorMap.set(EventStatus.Error,    "247,  82, 131");

    const timeColor: string = `rgba(${colorMap.get(props.status)}, 0.7)`;
    const contentColor: string = `rgba(${colorMap.get(props.status)}, 1)`;
    const dotColor: string | undefined = props.status !== EventStatus.Upcoming ? contentColor : undefined;

    return (
        <TimelineItem>
          <TimelineOppositeContent color={ timeColor }>
            { props.time }
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot 
                sx={{ backgroundColor: dotColor }}
                variant={ props.status === EventStatus.Upcoming ? "outlined" : undefined }
            />
            { !props.isFinal && <TimelineConnector sx={{ backgroundColor: timeColor }} /> }
          </TimelineSeparator>
          <TimelineContent color={ contentColor }>
            { props.content }
          </TimelineContent>
        </TimelineItem>
    );
}

export default ScheduleItem;