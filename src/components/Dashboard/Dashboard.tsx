import React, { useState } from "react";
import {
  FaFeatherAlt,
  FaTint,
  FaTruck,
  FaBoxes,
  FaTrashAlt,
  FaGraduationCap,
  FaBullseye,
  FaLock,
  FaBalanceScale,
  FaHeadphones,
  FaHandshake,
  FaEdit,
  FaBan,
  FaRedo,
} from "react-icons/fa";
import type { Block, Assessment, UserAnswer } from "../../types";
import { blocks } from "../../data/questions";
import BlockCard from "../BlockCard/BlockCard";
import QuestionModal from "../QuestionModal/QuestionModal";
import ResultsModal from "../ResultsModal/ResultsModal";
import "./Dashboard.css";

const iconMap = {
  shield: FaFeatherAlt,
  nutrition: FaTint,
  building: FaTruck,
  health: FaBoxes,
  waste: FaTrashAlt,
  training: FaGraduationCap,
};

const Dashboard: React.FC = () => {
  const [assessment, setAssessment] = useState<Assessment>({
    answers: [],
    totalScore: 0,
    completedBlocks: [],
    isComplete: false,
  });
  const [activeBlock, setActiveBlock] = useState<Block | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showResults, setShowResults] = useState(false);

  const handleBlockClick = (block: Block) => {
    setActiveBlock(block);
  };

  const handleWelcomeClose = () => {
    setShowWelcome(false);
  };

  const handleQuestionComplete = (answers: UserAnswer[]) => {
    if (!activeBlock) return;

    const newAnswers = [
      ...assessment.answers.filter(
        (a) => !activeBlock.questions.find((q) => q.id === a.questionId)
      ),
      ...answers,
    ];
    const newCompletedBlocks = [...assessment.completedBlocks];

    if (!newCompletedBlocks.includes(activeBlock.id)) {
      newCompletedBlocks.push(activeBlock.id);
    }

    const totalScore = newAnswers.reduce(
      (sum, answer) => sum + answer.score,
      0
    );
    const isComplete = newCompletedBlocks.length === blocks.length;

    setAssessment({
      answers: newAnswers,
      totalScore,
      completedBlocks: newCompletedBlocks,
      isComplete,
    });

    setActiveBlock(null);

    if (isComplete) {
      setShowResults(true);
    }
  };

  const handleCloseModal = () => {
    setActiveBlock(null);
  };

  const getBlockProgress = (blockId: number) => {
    const blockAnswers = assessment.answers.filter((a) =>
      blocks
        .find((b) => b.id === blockId)
        ?.questions.find((q) => q.id === a.questionId)
    );
    const totalQuestions =
      blocks.find((b) => b.id === blockId)?.questions.length || 0;
    return (blockAnswers.length / totalQuestions) * 100;
  };

  const isBlockCompleted = (blockId: number) => {
    return assessment.completedBlocks.includes(blockId);
  };

  const handleResetAssessment = () => {
    setAssessment({
      answers: [],
      totalScore: 0,
      completedBlocks: [],
      isComplete: false,
    });
    setShowResults(false);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="title-section">
            <h1>Avaliação de Risco para Influenza Aviária</h1>
            <p>
              Sistema de prevenção e controle de biosseguridade em granjas
              avícolas
            </p>
          </div>
          <button className="reset-button" onClick={handleResetAssessment}>
            <FaRedo className="reset-icon" />
            Reiniciar Avaliação
          </button>
        </div>

        <div className="progress-summary">
          <div className="progress-item">
            <span className="label">Blocos Concluídos:</span>
            <span className="value">
              {assessment.completedBlocks.length}/{blocks.length}
            </span>
          </div>
          <div className="progress-item">
            <span className="label">Pontuação Total:</span>
            <span className="value">{assessment.totalScore}/32</span>
          </div>
        </div>
      </div>

      <div className="blocks-grid">
        {blocks.map((block) => {
          const IconComponent = iconMap[block.icon as keyof typeof iconMap];
          return (
            <BlockCard
              key={block.id}
              block={block}
              icon={<IconComponent />}
              progress={getBlockProgress(block.id)}
              isCompleted={isBlockCompleted(block.id)}
              onClick={() => handleBlockClick(block)}
            />
          );
        })}
      </div>

      {assessment.isComplete && (
        <div className="completion-banner">
          <h2>Avaliação Concluída!</h2>
          <p>Clique no botão abaixo para visualizar seus resultados</p>
          <button
            className="results-button"
            onClick={() => setShowResults(true)}
          >
            Ver Resultados Completos
          </button>
        </div>
      )}

      {showWelcome && (
        <div className="modal-overlay">
          <div className="welcome-modal">
            <div className="modal-header-welcome">
              <h2 className="orientations-title">
                Bem-vindo ao Sistema de Avaliação de Risco
              </h2>
            </div>
            <div className="modal-body">
              <div className="welcome-content">
                <div className="welcome-icon">
                  <FaGraduationCap />
                </div>
                <h3>Avaliação de Risco para Influenza Aviária</h3>
                <p>
                  Sistema de prevenção e controle de biosseguridade em granjas
                  avícolas
                </p>
              </div>

              <div className="interview-guidelines">
                <h3>
                  <FaEdit className="section-icon" />
                  Orientações para o Entrevistador
                </h3>
                <div className="guidelines-content">
                  <div className="guideline-item">
                    <div className="guideline-header">
                      <FaBullseye className="guideline-icon" />
                      <strong>Objetivo da Visita:</strong>
                    </div>
                    <p>
                      Comunique claramente que o propósito é uma orientação para
                      melhorar a biosseguridade, não uma penalização. O objetivo
                      é ajudar a proteger o plantel contra influenza aviária.
                    </p>
                  </div>

                  <div className="guideline-item">
                    <div className="guideline-header">
                      <FaLock className="guideline-icon" />
                      <strong>Confidencialidade:</strong>
                    </div>
                    <p>
                      Garanta que todas as informações fornecidas serão mantidas
                      em confidencialidade, respeitando a privacidade e
                      protegendo os dados pessoais do entrevistado.
                    </p>
                  </div>

                  <div className="guideline-item">
                    <div className="guideline-header">
                      <FaBalanceScale className="guideline-icon" />
                      <strong>Postura Neutra:</strong>
                    </div>
                    <p>
                      Mantenha uma postura neutra e imparcial durante toda a
                      entrevista, sem expressar concordância ou discordância com
                      as respostas.
                    </p>
                  </div>

                  <div className="guideline-item">
                    <div className="guideline-header">
                      <FaHeadphones className="guideline-icon" />
                      <strong>Escuta Ativa:</strong>
                    </div>
                    <p>
                      Demonstre interesse genuíno nas respostas, ouvindo com
                      atenção e evitando interrupções desnecessárias.
                    </p>
                  </div>

                  <div className="guideline-item">
                    <div className="guideline-header">
                      <FaHandshake className="guideline-icon" />
                      <strong>Respeito e Empatia:</strong>
                    </div>
                    <p>
                      Trate o entrevistado com respeito e empatia, reconhecendo
                      suas preocupações e garantindo um ambiente confortável
                      para a comunicação.
                    </p>
                  </div>

                  <div className="guideline-item">
                    <div className="guideline-header">
                      <FaEdit className="guideline-icon" />
                      <strong>Clareza nas Perguntas:</strong>
                    </div>
                    <p>
                      Apresente as perguntas de forma clara e objetiva, evitando
                      ambiguidades que possam levar a interpretações errôneas.
                    </p>
                  </div>

                  <div className="guideline-item">
                    <div className="guideline-header">
                      <FaBan className="guideline-icon" />
                      <strong>Sem Indução:</strong>
                    </div>
                    <p>
                      Evite induzir ou sugerir respostas. Permita que o
                      entrevistado responda de acordo com suas próprias
                      percepções e experiências.
                    </p>
                  </div>
                </div>
              </div>

              <div className="instructions-content">
                <h3>Como usar o sistema:</h3>
                <ul>
                  <li>Clique em qualquer bloco para iniciar a avaliação</li>
                  <li>Leia cada pergunta com atenção</li>
                  <li>
                    Selecione a resposta que melhor descreve a situação atual
                  </li>
                  <li>Seja honesto para obter uma avaliação precisa</li>
                  <li>
                    Você pode revisar e alterar respostas a qualquer momento
                  </li>
                </ul>
                <p>
                  <strong>Total de blocos disponíveis:</strong> {blocks.length}
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="primary-button" onClick={handleWelcomeClose}>
                Entendi, Vamos Começar!
              </button>
            </div>
          </div>
        </div>
      )}

      {activeBlock && (
        <QuestionModal
          block={activeBlock}
          existingAnswers={assessment.answers}
          onComplete={handleQuestionComplete}
          onClose={handleCloseModal}
        />
      )}

      {showResults && (
        <ResultsModal
          assessment={assessment}
          onClose={() => setShowResults(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
