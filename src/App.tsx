import { useEffect, useState } from 'react';
import './App.css'
import Schedule from './Schedule.tsx';
import { ISheduleData } from './interfaces.ts';
import { readFileAsString } from './misc.ts';

function App() {

  const emptyData: ISheduleData = { items: []};
  const errorData: ISheduleData = { items: [ { time: "error", content: "sozdatel loh" } ] };

  const [ data, setData ] = useState<ISheduleData>(emptyData);
  //const test_data: ISheduleData = { items: [ { time: "9:00", content: "asddsa" }, { time: "10:00", content: "as" } ] };

  useEffect(() => 
  {
    async function readData()
    {
      try
      {
        const text: string = await readFileAsString("data.json");
        const jsonObj: ISheduleData = await JSON.parse(text);
        setData(jsonObj);
      }
      catch(ex)
      {
        setData(errorData);
        console.log("error reading data, exeption = ", ex);
      }
    }

    readData();

    const intervalId = setInterval(readData, 1000, readData);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Schedule items = { data.items } />
  )
}

export default App
