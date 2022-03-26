import React from 'react'
import { connect } from 'react-redux'
import { postQuiz, inputChange } from '../state/action-creators'

export function Form(props) {

  const { inputChange, form, postQuiz }= props

  const onChange = evt => {
    const { id, value } = evt.target
    inputChange({ id, value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    postQuiz(form.newQuestion, form.newTrueAnswer, form.newFalseAnswer)
  }
 // expected payload: { "question_text": "Love JS?", "true_answer_text": "yes", "false_answer_text": "nah" }
  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    form: state.form
  }
}

export default connect(mapStateToProps, { postQuiz, inputChange })(Form)
