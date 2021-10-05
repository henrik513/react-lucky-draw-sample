import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './countDownSlice';
import { addParticipant } from '../Participant/participantSlice';
import styles from './CountDown.css';

export function CountDown() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');
  
  const getRandom = function(){
    fetch(`https://randomuser.me/api/1.2/?results=250`, { mode: 'cors'})
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {

      myJson.results.forEach( (user, i ) => {
        setTimeout(() => {
          dispatch(addParticipant( `${user.name.first} ${user.name.last}`, user.picture.medium , user.login.uuid ))
        }, (i+1) * 50);
        
      });

    });
  
  }

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(addParticipant( "Lucas Perez", "https://randomuser.me/api/portraits/thumb/men/72.jpg" , "aba8af0d-4af6-41be-985a-472bc07843ec" ))}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => getRandom() }
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div>
    </div>
  );
}
