import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchQuiz, selectAnswer } from '../state/action-creators'

export function Quiz(props) {

  const { quiz, fetchQuiz, selectedAnswer, selectAnswer} = props

  useEffect(()=> {
    fetchQuiz()
  }, [])

  const onAnswerClick = id => {
    console.log('id inside click function:', id)
    selectAnswer(id)
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
                  <div className={answer.answer_id === selectedAnswer ? "selected answer" : "answer"} key={answer.id}>
                    {answer.text}
                    <button onClick={() => onAnswerClick(answer.answer_id)}> {answer.answer_id === selectedAnswer ? "Selected" : "Select"} </button>
                  </div>
                ))}
              </div>

            <button id="submitAnswerBtn">Submit answer</button>
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
export default connect(mapStateToProps, { fetchQuiz, selectAnswer })(Quiz)