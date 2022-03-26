// ❗ You don't need to add extra action creators to achieve MVP
import axios from 'axios';
import { INPUT_CHANGE, MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, RESET_FORM, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER  } from './action-types'
export function moveClockwise() { 
  return { type: MOVE_CLOCKWISE }
 }

export function moveCounterClockwise() { 
  return { type: MOVE_COUNTERCLOCKWISE }
 }

export function selectAnswer(id) {
  console.log(id)
  return { type: SET_SELECTED_ANSWER, payload: id}
}

export function setMessage() { }

export function setQuiz() { 

 }

export function inputChange({ id, value }) {
  return { type: INPUT_CHANGE, payload: { id, value }}
}

export function resetForm() { 
  return { type: RESET_FORM }
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    axios.get('http://localhost:9000/api/quiz/next')
    .then(res => {
      dispatch({type:SET_QUIZ_INTO_STATE, payload: res.data})
    })
    
    .catch(err => {
      debugger
    })
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
