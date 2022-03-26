import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators'

export function Quiz(props) {

  const { quiz, fetchQuiz, selectedAnswer, selectAnswer, postAnswer} = props

  useEffect(()=> {
    fetchQuiz()
  }, [])

  const onAnswerClick = id => {
    selectAnswer(id)
  }

  const onSubmitClick = (quiz_id, answer_id) => {
    debugger
    postAnswer(quiz_id, answer_id)
        // - Example of payload: `{ "quiz_id": "LVqUh", "answer_id": "0VEv0" }`
  }

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
                    <button onClick={() => onAnswerClick(answer.answer_id)}> {answer.answer_id === selectedAnswer ? "Selected" : "Select"} </button>
                  </div>
                ))}
              </div>

            <button id="submitAnswerBtn" onClick={() => onSubmitClick(quiz.quiz_id, selectedAnswer)} >Submit answer</button>
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