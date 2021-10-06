import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setValue,
  setProgress,
  selectProgress
} from './countDownSlice';

import { addParticipant, resetParticipant } from '../Participant/participantSlice';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import CountDownTimer from './CountDownTimer';

export function CountDown() {

  const progress = useSelector(selectProgress);
  const dispatch = useDispatch();
  const [minute, setMinute] = useState(0);
  const ticker = 400;
  const getRandom = () => {
    if(progress){
      return;
    }
    dispatch(resetParticipant());
    dispatch(setValue(minute));
    dispatch(setProgress(true));

    const limit = Math.ceil(150 * minute);
    let startAt = 0;
    fetch(`https://randomuser.me/api/1.2/?results=${limit}`, { mode: 'cors'})
    .then(function(response) {
      startAt = new Date().getTime();
      return response.json();
    })
    .then(function(json) {
      const _current = new Date().getTime();
      for(let i = 0 ; i < json.results.length ; i ++){
        let user = json.results[i];
        if( _current+((i+1)*ticker) > startAt + (minute*60000) ){
          return;
        }

        setTimeout(() => {
          dispatch(addParticipant( `${user.name.first} ${user.name.last}`, user.picture.medium , user.login.uuid ))
        }, i*ticker);
        
      };
    });
  }
  
  const handleChangeMinute = (event) => {
    setMinute(event.target.value);
  }

  return (
    <div className="inputContainer">
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
          disabled={progress}
        />
        <Button variant="contained" onClick={() => getRandom()} disabled={progress}>設定</Button>
      </Box>
      <CountDownTimer />
    </div>
  );
}
