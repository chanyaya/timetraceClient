import {createContext, useEffect, useState} from 'react'
import { DateTime, diff } from 'luxon';
import { createNewLog } from '../components/api/logs';

const LogContext = createContext();

function LogContextProvider({children}) {
    ///?????
    const [log, setLog] = useState({});

    const createLog = ({timeStart, timeEnd, category, day, JSTimeEnd, JSTimeStart, time}) => {
        if (timeStart.isLuxonDateTime && timeEnd.isLuxonDateTime) {
        const timeSpan = timeStart.diff(timeEnd, 'seconds').toObject()
        const value = {
            timeStart,
            timeEnd,
            category,
            timeSpan: timeSpan.seconds,
            day
        }
        // console.log(category)
        // console.log(JSTimeStart)
        // console.log(JSTimeEnd)
        console.log(time)
        console.log(timeStart)
        console.log(timeEnd)
        console.log(timeSpan)
        // createNewLog(value)
        }

       
    }



    return (
        <LogContext.Provider value={{log, createLog}}>{children} </LogContext.Provider>
    )

}

export { LogContext, LogContextProvider };
