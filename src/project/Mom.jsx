import React, { useState, useEffect } from 'react';
import "./Mom.css";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const PomodoroClock = () => {
    const [workTime, setWorkTime] = useState(25); // Initial work time (default: 25 minutes)
    const [breakTime, setBreakTime] = useState(5); // Initial break time (default: 5 minutes)
    const [cyclesLimit, setCyclesLimit] = useState(2); // Number of cycles
    const [cyclesCompleted, setCyclesCompleted] = useState(0); // Number of cycles completed
    const [minutes, setMinutes] = useState(workTime); // Current minutes
    const [seconds, setSeconds] = useState(0); // Current seconds
    const [isRunning, setIsRunning] = useState(false); // Flag for timer running state

    useEffect(() => {
        let interval = null;

        if (isRunning) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        handleCycleComplete();
                    } else {
                        setMinutes((prevMinutes) => prevMinutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds((prevSeconds) => prevSeconds - 1);
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRunning, minutes, seconds]);

    useEffect(() => {
        setMinutes(workTime);
    }, [workTime]);

    const handleCycleComplete = () => {
        setIsRunning(false);
        setSeconds(0);
        if (cyclesCompleted === cyclesLimit - 1) {
            setCyclesCompleted(0);
            setMinutes(workTime);
        } else {
            setCyclesCompleted((prevCyclesCompleted) => prevCyclesCompleted + 1);
            if (cyclesCompleted % 2 === 0) {
                setMinutes(breakTime);
            } else {
                setMinutes(workTime);
            }
        }
    };

    const handleStart = () => {
        setIsRunning(true);
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setCyclesCompleted(0);
        setMinutes(workTime);
        setSeconds(0);
    };

    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
    };

    const calculateTotalTime = () => {
        const totalTime = (workTime + breakTime) * cyclesLimit;
        const totalMinutes = Math.floor(totalTime / 60);
        const totalSeconds = totalTime % 60;
        return `${totalMinutes}:${formatTime(totalSeconds)}`;
    };

    return (
        <div>
            <h1 className='head'>Pomodoro Clock</h1>
            <div className='circl'>
            <div>
                        <h3>Total Time: {calculateTotalTime()} hr</h3>
                    </div>
                <div className='circlemain'>
                    <h3 className='break'>
                        {isRunning ? 'Work' : 'Break'}
                    </h3>
                    <h1 className='runningtime'>
                        {formatTime(minutes)}:{formatTime(seconds)}
                    </h1>

                    <div>
                        {isRunning ? (
                            <button className="pause"><PauseIcon onClick={handleStop} className='pause' /></button>
                        ) : (
                            <button className="pause"> <PlayArrowIcon onClick={handleStart} className='pause' /></button>
                        )}
                        <button className='pause' onClick={handleReset}><RotateLeftIcon /></button>
                    </div>
                </div>
                <div className='text1'>
                    
                    <div>
                    
                        <div className="time-buttons1">
                        <h4>Work Time</h4>
                            <button className="time-button1" onClick={() => setWorkTime(prevWorkTime => Math.max(prevWorkTime + 1, 1))}>+</button>
                            {workTime}
                            <button className="time-button2" onClick={() => setWorkTime(prevWorkTime => Math.max(prevWorkTime - 1, 1))}>-</button>
                        </div>
                    </div>
                    <div>
                       
                        <div className="time-buttons2">
                        <h4>Break Time</h4>
                            <button className="time-button1" onClick={() => setBreakTime(prevBreakTime => Math.max(prevBreakTime + 1, 1))}>+</button>
                            {breakTime}
                            <button className="time-button2" onClick={() => setBreakTime(prevBreakTime => Math.max(prevBreakTime - 1, 1))}>-</button>
                        </div>
                    </div>
                    <div>
                        <h4 className='h4in'>Cycles Limit: {cyclesLimit}</h4>
                        <input
                        className='inputcy'
                            type="number"
                            min="1"
                            value={cyclesLimit}
                            onChange={(e) => setCyclesLimit(parseInt(e.target.value))}
                        />
                    </div>

                    <div>
                        <h4>Cycles Completed: {cyclesCompleted}</h4>
                    </div>
                </div>
            </div>
            <p>Special thanks <h4> Sushil Athithiyaa</h4> <h3>Dev. by Raushan</h3></p>
        </div>
    );
};

export default PomodoroClock;
