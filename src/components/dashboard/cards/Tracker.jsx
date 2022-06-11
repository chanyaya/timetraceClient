import {useState, useEffect, useContext} from "react";
import {DateTime} from "luxon";
import { LogContext } from '../../../contexts/LogContext'

export default function Tracker() {
  const {createLog} = useContext(LogContext);

  const [startTime, setStartTime] = useState({});
  const [JStimeStart, setJSTimeStart] = useState(null)
  const [endTime, setEndTime] = useState({});
  const [JStimeEnd, setJSTimeEnd] = useState(null)
  const [category, setCategory] = useState("");
  const [day, setDay] = useState('')
  const [button, setButton] = useState(true)
  const [time, setTime] = useState(0)
  const [stopwatchRunning, setStopwatchRunning] = useState(false)

  const handleClick = () => {
    setButton(!button)
    setStopwatchRunning(!stopwatchRunning)
  }

  useEffect((  ) => {
let interval;
if (stopwatchRunning) {
  interval = setInterval(() => {setTime(prev => prev+1)}, 1000);
} else if (!stopwatchRunning) {
  clearInterval(interval);
  setTime(0)
}
return () => clearInterval(interval)
  }, [stopwatchRunning])

  useEffect(() => { 
    let dt = DateTime.local()
    let dtJS = new Date()
    if (!button) {
      setStartTime(dt)
      setJSTimeStart(dtJS)
      const weekDay = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
      const dayStart = new Date()
      // console.log(startTime)
      setDay(weekDay[dtJS.getDay()]) 
      // startTime.isLuxonDateTime && console.log(startTime.toISO())

    } 
    if (button) {
      setEndTime(dt)
      setJSTimeEnd(dtJS)
      // console.log(endTime)
      if(startTime&&endTime){
      //  endTime.isLuxonDateTime && console.log(endTime.toISO())
      createLog({timeStart: startTime, JStimeStart, timeEnd: endTime, JStimeEnd, category, day, time})
    }
    }
  }, [button])


  useEffect(()=> {
    console.log(startTime)
  },[startTime])

   useEffect(()=> {
    console.log(endTime)
  },[endTime])

  return (
    <>

      <h3 className="p-6 ">Tracking</h3>
      <div className="flex flex-col items-center justify-center h-3/5">
        <form className="flex flex-col items-center">
          <div className="w-11/12 mb-3">
            <h4 className="text-silver text-xs  text-center tracking-widest font-semibold w-max">I'm working on...</h4>
          <input className="h-3/5 " onChange={(e) => {setCategory(e.target.value)}}  />
            {/* <label>
            I'm working on.....
            </label> */}
            </div>
            <div className="stopwatch">
          <span>{("0" + Math.floor((time / (60 * 60)))).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 60) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time % 60))).slice(-2)}</span>
            </div>
        </form>
        <button onClick={()=> handleClick()}>
    <i className={`${button ? "fa-solid fa-play playButton" : "fa-solid fa-stop playButton"}`} />
            </button>
      </div>
    </>
  );
}

