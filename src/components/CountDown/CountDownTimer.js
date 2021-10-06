import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux';
import {
    setProgress,
    selectProgress,
    selectCount
} from './countDownSlice';
import store from '../../store';

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
    const [open, setOpen] = useState(false);
    const [percentage, setPercentage] = useState(0);
    const [text, setText] = useState("00:00");

    const progress = useSelector(selectProgress);
    const minute = useSelector(selectCount);
    const dispatch = useDispatch();
    const [winner, setWinner] = useState({name:"",avatar:""});

    const handleClose = () => setOpen(false);
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 280,
      textAlign: 'center',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    useEffect(() => {
        if(minute > 0 && progress) {
          let startTimestamp = new Date().getTime();
          let deadLineTimestamp = startTimestamp + 60000*minute;

          setText( `${Math.floor(minute)}:${ (minute*60%60).toString().padStart(2, "0")}` );
          setPercentage(0);
          const timer = setInterval(() => {
            if( new Date().getTime() > deadLineTimestamp){
              clearInterval(timer);
              
              // random get one
              const _p = store.getState().participants;
              const _n = Math.floor(Math.random() * _p.length );
              setWinner(_p[_n]);

              setOpen(true);
              dispatch(setProgress(false));
            }
            const seconds = Math.ceil( (deadLineTimestamp - new Date().getTime()) / 1000);
            const percent =  Math.ceil( (new Date().getTime() - startTimestamp ) /(600*minute) );
            const _minute = Math.floor(seconds / 60);
            const _second = (seconds % 60).toString().padStart(2, "0");
            setPercentage(percent);
            setText( `${_minute}:${_second}` );
          }, 1000);

          return () => {
            clearInterval(timer);
          };
        }
    }, [progress, minute, dispatch]);

  return (
  <div>
    {progress && <CircularProgressWithLabel value={percentage} label={text} />}
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Winner Winner Chicken Dinner
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, display: 'flex', textTransform: "capitalize" }} component="div">
            <img src={winner.avatar} width="150" style={{marginRight: '10px'}} alt={winner.name} />
            <div>{winner.name}</div>
          </Typography>
        </Box>
      </Modal>
  </div>
  );
}