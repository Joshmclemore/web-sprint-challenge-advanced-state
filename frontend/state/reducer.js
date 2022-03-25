// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, INPUT_CHANGE } from './action-types'



const initialWheelState = 0
function wheel(state = initialWheelState, action) {


  const clockwiseHelper = () => {
    if(state < 5) {
      return state + 1
    } else if(state === 5) {
      return state - 5
    } else {
      return state
    }
  }


  const counterClockwiseHelper = () => {
    if(state > 0) {
      return state - 1
    } else if(state === 0) {
      return state + 5
    } else {
      return state
    }
  }

  switch (action.type) {
    case MOVE_CLOCKWISE:
      return clockwiseHelper()
    case MOVE_COUNTERCLOCKWISE:
      return counterClockwiseHelper()
    default:
      return state
  }
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  return state
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  return state
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  return state
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch(action.type) {
    case INPUT_CHANGE:
      console.log(state)
      return {...state,
        [action.payload.id]: action.payload.value
      }
    default:
      return state
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
