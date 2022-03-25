import React from 'react';
import { connect } from 'react-redux';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';

function Wheel(props) {

  const { moveClockwise, moveCounterClockwise, wheel } = props

  const clickClockwise = () => {
    moveClockwise()
  }

  const clickCounterclockwise = () => {
    moveCounterClockwise()
  }

  const cogArray = [0, 1, 2, 3, 4, 5]

  return (
    <div id="wrapper">
      <div id="wheel">
        {cogArray.map(cog => {
          if(cog === wheel) {
            return <div className='cog active' style={{ "--i":` ${cog}` }}>B</div>  
          } else {
            return <div className="cog" style={{ "--i":` ${cog}` }}></div>
          }
        })}
        {/* <div className="cog active" style={{ "--i": 0 }}>B</div>
        <div className="cog" style={{ "--i": 1 }}></div>
        <div className="cog" style={{ "--i": 2 }}></div>
        <div className="cog" style={{ "--i": 3 }}></div>
        <div className="cog" style={{ "--i": 4 }}></div>
        <div className="cog" style={{ "--i": 5 }}></div>  */}
        {/*--i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={clickCounterclockwise}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={clickClockwise} >Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    wheel: state.wheel
  }
}

export default connect(mapStateToProps, { moveClockwise, moveCounterClockwise })(Wheel)