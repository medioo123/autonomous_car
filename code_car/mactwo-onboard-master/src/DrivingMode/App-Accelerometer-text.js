import React, { Component, PropTypes } from 'react'
import ReactAccelerometer from 'react-accelerometer'
import logo from './logo.svg'; // n'existe pas 
import './App.css'; // n'existe pas 

const App = () => (
  <ReactAccelerometer>
    {(position, rotation) => {
      if (!position) {
        return <div>Accelerometer not supported</div>
      }

    return (
      <ul>
        <li>x: {position.x}</li>
        <li>y: {position.y}</li>
        <li>z: {position.z}</li>
        <li>rotation alpha: {rotation.alpha}</li>
        <li>rotation beta: {rotation.beta}</li>
        <li>rotation gamma: {rotation.gamma}</li>
      </ul>
    )
  }}
  </ReactAccelerometer>
)

export default App;
