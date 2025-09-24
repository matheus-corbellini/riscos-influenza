import React from "react";
import { FaCheck, FaPlay } from "react-icons/fa";
import type { Block } from "../../types";
import "./BlockCard.css";

interface BlockCardProps {
  block: Block;
  icon: React.ReactNode;
  progress: number;
  isCompleted: boolean;
  onClick: () => void;
}

const BlockCard: React.FC<BlockCardProps> = ({
  block,
  icon,
  progress,
  isCompleted,
  onClick,
}) => {
  return (
    <div
      className={`block-card ${isCompleted ? "completed" : ""}`}
      onClick={onClick}
      style={{ "--block-color": block.color } as React.CSSProperties}
    >
      <div className="card-header">
        <div className="icon-container">{icon}</div>
        <div className="status-indicator">
          {isCompleted ? (
            <FaCheck className="check-icon" />
          ) : (
            <FaPlay className="play-icon" />
          )}
        </div>
      </div>

      <div className="card-content">
        <h3>{block.title}</h3>
        <p>{block.description}</p>

        <div className="questions-info">
          <span>{block.questions.length} perguntas</span>
        </div>
      </div>

      <div className="card-footer">
        <div className="progress-container">
          <div className="progress-label">
            {isCompleted ? "Concluído" : `${Math.round(progress)}% completo`}
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="card-action">
        <span className="action-text">
          {isCompleted ? "Revisar Respostas" : "Iniciar Avaliação"}
        </span>
      </div>
    </div>
  );
};

export default BlockCard;
