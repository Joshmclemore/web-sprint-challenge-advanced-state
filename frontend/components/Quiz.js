import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators'

export function Quiz(props) {
  const [disabled, setDisabled] = useState(true)
  const { quiz, fetchQuiz, selectedAnswer, selectAnswer, postAnswer} = props

  useEffect(()=> {
    fetchQuiz()
  }, [])

  const switchDisabled = () => {
    setDisabled(false)
  }

  const onAnswerClick = id => {
    selectAnswer(id)
    switchDisabled()
  }

  const onSubmitClick = (quiz_id, answer_id) => {
    fetchQuiz()
    postAnswer(quiz_id, answer_id)
  }
  // const fieldValidation = () => {

  //   var answer = document.querySelector('SELECTED')
  //   if(answer === true) {
  //     return true
  //   }
  // }
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>
              <div id="quizAnswers">         
                {quiz.answers.map(answer => (
                  <div className={answer.answer_id === selectedAnswer ? "selected answer" : "answer"} id={answer.answer_id} key={answer.answer_id}>
                    {answer.text}
                    <button onClick={() => onAnswerClick(answer.answer_id)}> {answer.answer_id === selectedAnswer ? "SELECTED" : "Select"} </button>
                  </div>
                ))}
              </div>

            <button id="submitAnswerBtn" disabled={disabled} onClick={() => onSubmitClick(quiz.quiz_id, selectedAnswer)} >Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer
  }
}
export default connect(mapStateToProps, { fetchQuiz, selectAnswer, postAnswer })(Quiz)