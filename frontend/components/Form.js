import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { postQuiz, inputChange, resetForm } from '../state/action-creators';
import * as yup from 'yup'



export function Form(props) {

  const schema = yup.object().shape({
    newQuestion: yup.string().required('question is required').min(1)
    // newTrueAnswer
    // newFalseAnswer
  })


  // useEffect(() => {
  //   if(form.newQuestion.length > 0 && form.newTrueAnswer.length > 0 && form.newTrueAnswer.length > 0) {
      
  //   }
  //   // schema.isValid(form).then(valid => )
  // }, [form])


  const { inputChange, form, postQuiz, resetForm }= props

  const onChange = evt => {
    const { id, value } = evt.target
    inputChange({ id, value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    postQuiz(form.newQuestion, form.newTrueAnswer, form.newFalseAnswer)
    resetForm()
  }
 // expected payload: { "question_text": "Love JS?", "true_answer_text": "yes", "false_answer_text": "nah" }
  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled={!form.newQuestion}>Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    form: state.form
  }
}

export default connect(mapStateToProps, { postQuiz, inputChange, resetForm })(Form)
