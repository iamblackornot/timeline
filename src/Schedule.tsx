import * as React from 'react';

import Timeline from '@mui/lab/Timeline';

import ScheduleItem from './SheduleItem';
import { EventStatus, ISheduleData, ISheduleEntity, ISheduleItem } from './interfaces';


const Schedule : React.FC<ISheduleData> = (props: ISheduleData) => {

  const items: Array<ISheduleItem> = [];
  const dateNow: Date = new Date();
  let prevTime: Date = new Date();
  prevTime.setFullYear(3000);

  props.items.findLast((item: ISheduleEntity) => 
  {
    const newItem: ISheduleItem = 
    {
      time: item.time,
      content: item.content,
      isFinal: false,
      status: EventStatus.Upcoming,
    }

    const itemTime = new Date(item.time);
  
    if(!isNaN(itemTime.getTime())) 
    { 
      const options: DateTimeFormatOptions = {
        formatMatcher: "best fit",
        timeStyle: "short",
      }
  
      newItem.time = itemTime.toLocaleTimeString("ru-Ru", options); 

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
    <Timeline sx=
    {{ 
        justifyContent: 'center',
        height: "100vh",
        margin: "0",
        padding: "0px 0px",
        paddingRight: "7vh", 
    }}>
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