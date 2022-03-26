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
  return { type: SET_SELECTED_ANSWER, payload: id}
}
// check these two out !!!! ( after fixing reset form and post quiz )
export function setMessage() { }

export function setQuiz() { }

export function inputChange({ id, value }) {
  return { type: INPUT_CHANGE, payload: { id, value }}
}

export function resetForm() { 
  debugger
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
export function postAnswer(quiz_id, answer_id) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/answer', {"quiz_id": quiz_id, "answer_id": answer_id})
    .then(res=> {
      debugger
      dispatch({type:SET_INFO_MESSAGE, payload: res.data.message})
    })
    .catch(err=> {
      debugger
    })
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz

    // `[POST] http://localhost:9000/api/quiz/answer`
    // - Expects a payload with the following properties: `quiz_id`, `answer_id`
    // - Example of payload: `{ "quiz_id": "LVqUh", "answer_id": "0VEv0" }`
    // - A response to a proper request includes `200 OK` and feedback on the answer
  }
}
export function postQuiz(newQuestion, newTrueAnswer, newFalseAnswer) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new', { "question_text": newQuestion, "true_answer_text": newTrueAnswer, "false_answer_text": newFalseAnswer } )
    .then(res => { 
      dispatch({type: SET_INFO_MESSAGE, payload: `Congrats: ${res.data.question} is a great question!`})
      dispatch({type: RESET_FORM})
      // debugger
      // console.log('new post creator:', res)
    })
    .catch(res => {
      debugger
    })

    // expected payload: { "question_text": "Love JS?", "true_answer_text": "yes", "false_answer_text": "nah" }
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
