import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { postQuiz, inputChange, resetForm } from '../state/action-creators';
import * as yup from 'yup'



export function Form(props) {

  const [disabled, setDisabled] = useState(true)

  const { inputChange, form, postQuiz, resetForm }= props

  useEffect(()=> {
    switchDisabled()
  }, [form])

  const switchDisabled = () => {
    if(form.newQuestion.trim().length > 1 && form.newTrueAnswer.trim().length > 1 && form.newFalseAnswer.trim().length > 1) {
      console.log('question, true, false:', form.newQuestion, form.newTrueAnswer, form.newFalseAnswer)
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }


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
      <button id="submitNewQuizBtn" disabled={disabled}>Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    form: state.form
  }
}

export default connect(mapStateToProps, { postQuiz, inputChange, resetForm })(Form)
