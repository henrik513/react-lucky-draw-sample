import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setValue,
  setProgress,
  selectProgress
} from './countDownSlice';

import { addParticipant, selectParticipants } from '../Participant/participantSlice';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import CountDownTimer from './CountDownTimer';

export function CountDown() {

  const progress = useSelector(selectProgress);
  const participants = useSelector(selectParticipants);
  const dispatch = useDispatch();
  const [minute, setMinute] = useState(0);
  const ticker = 400;
  const getRandom = () => {
    dispatch(setValue(minute));
    dispatch(setProgress(true));
  }
  
  const handleChangeMinute = (event) => {
    setMinute(event.target.value);
  }

  useEffect( () => {
    if(progress && minute > 0) {
      fetch(`https://randomuser.me/api/1.2/?results=1000`, { mode: 'cors'})
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {

        for(let i = 0 ; i < json.results.length ; i ++){
          let user = json.results[i];
          
          if( (i+1) * ticker > (minute*60000) ){
            console.log(`expired at ${i+1}`);
            return;
          }
          setTimeout(() => {
            dispatch(addParticipant( `${user.name.first} ${user.name.last}`, user.picture.medium , user.login.uuid ))
          }, (i+1) * ticker);
          
        };
      });

      // pick number 
      setTimeout(() => {
        console.log(`total: ${participants}`);
      }, 60000*minute);
    }
    console.log(`current progress ${progress}`);
  }, [progress, minute, participants, dispatch]);

  return (
    <div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField required 
          id="standard-basic" 
          label="抽獎倒數時間" 
          variant="standard" 
          defaultValue={minute} 
          onChange={handleChangeMinute}
          InputProps={{
            endAdornment: <InputAdornment position="end">分鐘</InputAdornment>,
            inputMode: 'numeric', 
            pattern: '[0-9]*'
          }}  
        />
        <Button variant="contained" onClick={() => getRandom() } >設定</Button>
      </Box>
      {progress && <CountDownTimer />}
    </div>
  );
}
