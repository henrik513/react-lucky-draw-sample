import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {selectParticipants, addParticipant } from './participantSlice';


export function Participant() {
  const participants = useSelector(selectParticipants);
  // const dispatch = useDispatch();

  // dispatch(addParticipant( "Lucas Perez", "https://randomuser.me/api/portraits/thumb/men/72.jpg" , "aba8af0d-4af6-41be-985a-472bc07843ec" ));
  
  return (
    <div>
      <h4>參賽者名單 共 {participants.length} 人參與</h4>
      <div>
        {participants.map(function (user, i) {
          return <User name={user.name} avatar={user.avatar} uid={user.uid} key={i} />
        })}
      </div>
    </div>
  );
}


function User(props) {
  return (
  <div className="user">
    <img src={props.avatar} alt={props.name} />
    <div uid={props.uid}>
      {props.name}
    </div>
  </div>);
}