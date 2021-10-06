import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import {
    setProgress,
    selectProgress,
    selectCount
} from './countDownSlice';

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" size="60px" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {props.label}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};

export default function CountDownTimer() {
    const [percentage, setPercentage] = useState(0);
    const [text, setText] = useState("00:00");
    const progress = useSelector(selectProgress);
    const minute = useSelector(selectCount);
    const dispatch = useDispatch();
    useEffect(() => {
        if(minute > 0 && progress) {
          let startTimestamp = new Date().getTime();
          let deadLineTimestamp = startTimestamp + 60000*minute;
          const timer = setInterval(() => {
            if( new Date().getTime() > deadLineTimestamp){
              clearInterval(timer);
              dispatch(setProgress(false));
            }
            const seconds = Math.ceil( (deadLineTimestamp - new Date().getTime()) / 1000);
            const percent =  Math.ceil( (new Date().getTime() - startTimestamp ) /(600*minute) );

            const _minute = Math.floor(seconds / 60);
            const _second = (seconds % 60).toString().padStart(2, "0");
            setPercentage(percent);
            setText( `${_minute}:${_second}` );
          }, 1000);
        }
    }, [progress, minute, dispatch]);

  return <CircularProgressWithLabel value={percentage} label={text} />;
}