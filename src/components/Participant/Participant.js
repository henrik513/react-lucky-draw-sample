import React from 'react';
import { useSelector } from 'react-redux';
import {selectParticipants } from './participantSlice';
import './Participant.css';

export function Participant() {
  const participants = useSelector(selectParticipants);
  return (
    <div className="participantContainer">
      <h4>參賽者名單 共 {participants.length} 人參與</h4>
      <div className="participantList">
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
    <div className="avatar">
      <img src={props.avatar} alt={props.name} />
    </div>
    <div uid={props.uid}>
      {props.name}
    </div>
  </div>);
}