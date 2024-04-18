import * as React from 'react';

import Timeline from '@mui/lab/Timeline';

import ScheduleItem from './SheduleItem';
import { EventStatus, ISheduleData, ISheduleEntity, ISheduleItem } from './interfaces';


const Schedule : React.FC<ISheduleData> = (props: ISheduleData) => {

  const items: Array<ISheduleItem> = [];
  const dateNow: Date = new Date(Date.now());
  let prevTime: Date = new Date(Date.now());
  prevTime.setFullYear(3000);

  props.items.findLast((item: ISheduleEntity) => {
    const newItem: ISheduleItem = {
      time: item.time,
      content: item.content,
      isFinal: false,
      status: EventStatus.Upcoming,
    }

    const regexp = /(\d?\d)\:(\d\d)/g;
    const match = item.time.matchAll(regexp).next().value;
  
    if(match) 
    {
      const hours: number = match[1];
      const minutes: number = match[2];

      const itemTime: Date = new Date(dateNow);
      itemTime.setHours(hours);
      itemTime.setMinutes(minutes);
      itemTime.setSeconds(0);

      if(dateNow >= itemTime)
      {
        newItem.status = dateNow < prevTime 
                       ? EventStatus.Active
                       : EventStatus.Passed;
      }

      prevTime = new Date(itemTime);
    }
    else 
    { 
      newItem.status = EventStatus.Error; 
      newItem.time = "error";
      newItem.content = "time";
    }

    items.unshift(newItem);
  });


  if(items.length > 0) { items[items.length - 1].isFinal = true; }
  //console.log(items);
  
  return (
    <Timeline sx={{ justifyContent: 'center', height: "100vh", margin: "0" }}>
      { 
        items.map((item: ISheduleItem, index: number) => 
          ( 
            <ScheduleItem 
              key={`schedule_item_${index}`}
              {...item}/> 
          )
        )
      }
    </Timeline>
  );
}

export default Schedule;