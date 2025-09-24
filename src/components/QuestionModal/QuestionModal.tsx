import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaCheck } from "react-icons/fa";
import type { Block, UserAnswer } from "../../types";
import "./QuestionModal.css";

interface QuestionModalProps {
  block: Block;
  existingAnswers: UserAnswer[];
  onComplete: (answers: UserAnswer[]) => void;
  onClose: () => void;
}

const QuestionModal: React.FC<QuestionModalProps> = ({
  block,
  existingAnswers,
  onComplete,
  onClose,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);

  useEffect(() => {
    // Initialize with existing answers for this block
    const blockAnswers = existingAnswers.filter((answer) =>
      block.questions.find((q) => q.id === answer.questionId)
    );
    setAnswers(blockAnswers);
  }, [block, existingAnswers]);

  const currentQuestion = block.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === block.questions.length - 1;
  const currentAnswer = answers.find(
    (a) => a.questionId === currentQuestion.id
  );

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedAnswerIndex: answerIndex,
      score: currentQuestion.answers[answerIndex].score,
    };

    setAnswers((prev) => [
      ...prev.filter((a) => a.questionId !== currentQuestion.id),
      newAnswer,
    ]);
  };

  const handleNext = () => {
    if (currentQuestionIndex < block.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    if (answers.length === block.questions.length) {
      onComplete(answers);
    }
  };

  const isQuestionAnswered = (questionIndex: number) => {
    const question = block.questions[questionIndex];
    return answers.some((a) => a.questionId === question.id);
  };

  const allQuestionsAnswered = answers.length === block.questions.length;

  return (
    <div className="modal-overlay">
      <div
        className="question-modal"
        style={{ "--block-color": block.color } as React.CSSProperties}
      >
        <div className="modal-header">
          <div className="header-info">
            <h2>{block.title}</h2>
            <div className="question-counter">
              Pergunta {currentQuestionIndex + 1} de {block.questions.length}
            </div>
          </div>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="progress-indicator">
          <div className="progress-steps">
            {block.questions.map((_, index) => (
              <div
                key={index}
                className={`step ${
                  index <= currentQuestionIndex ? "active" : ""
                } ${isQuestionAnswered(index) ? "answered" : ""}`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {isQuestionAnswered(index) ? <FaCheck /> : index + 1}
              </div>
            ))}
          </div>
          <div
            className="progress-bar"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / block.questions.length) * 100
              }%`,
            }}
          />
        </div>

        <div className="modal-body">
          <div className="question-container">
            <h3 className="question-text">{currentQuestion.text}</h3>

            <div className="answers-container">
              {currentQuestion.answers.map((answer, index) => (
                <button
                  key={index}
                  className={`answer-option ${
                    currentAnswer?.selectedAnswerIndex === index
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <div className="answer-content">
                    <div className="answer-text">{answer.text}</div>
                    <div className="answer-score">
                      Risco:{" "}
                      {answer.score === 0
                        ? "Baixo"
                        : answer.score === 1
                        ? "Moderado"
                        : "Alto"}
                    </div>
                  </div>
                  <div className="answer-radio">
                    <div
                      className={`radio ${
                        currentAnswer?.selectedAnswerIndex === index
                          ? "checked"
                          : ""
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <div className="navigation-buttons">
            <button
              className="nav-button previous"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              <FaArrowLeft /> Anterior
            </button>

            {!isLastQuestion ? (
              <button
                className="nav-button next"
                onClick={handleNext}
                disabled={!currentAnswer}
              >
                Próxima <FaArrowRight />
              </button>
            ) : (
              <button
                className="complete-button"
                onClick={handleComplete}
                disabled={!allQuestionsAnswered}
              >
                <FaCheck /> Concluir Bloco
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
