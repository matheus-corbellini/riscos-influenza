import React, { useRef } from "react";
import {
  FaDownload,
  FaTimes,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import type { Assessment, ImprovementPoint } from "../../types";
import { blocks, scoreRanges } from "../../data/questions";
import "./ResultsModal.css";

interface ResultsModalProps {
  assessment: Assessment;
  onClose: () => void;
}

const ResultsModal: React.FC<ResultsModalProps> = ({ assessment, onClose }) => {
  const resultsRef = useRef<HTMLDivElement>(null);

  const getScoreLevel = () => {
    return (
      scoreRanges.find(
        (range) =>
          assessment.totalScore >= range.min &&
          assessment.totalScore <= range.max
      ) || scoreRanges[0]
    );
  };

  const getImprovementPoints = (): ImprovementPoint[] => {
    const improvements: ImprovementPoint[] = [];

    assessment.answers.forEach((answer) => {
      // Considera risco alto qualquer pontuação >= 2 (incluindo pontuação 3)
      if (answer.score >= 2) {
        const question = blocks
          .flatMap((block) => block.questions)
          .find((q) => q.id === answer.questionId);

        const block = blocks.find((b) =>
          b.questions.some((q) => q.id === answer.questionId)
        );

        if (question && block) {
          improvements.push({
            questionText: question.text,
            feedback: question.feedback,
            blockTitle: block.title,
          });
        }
      }
    });

    return improvements;
  };

  const scoreLevel = getScoreLevel();
  const improvementPoints = getImprovementPoints();
  const riskPercentage = (assessment.totalScore / 30) * 100;

  const generatePDF = async () => {
    if (!resultsRef.current) return;

    try {
      // Garantir que todo o conteúdo seja visível antes de capturar
      const originalOverflow = resultsRef.current.style.overflow;
      const originalMaxHeight = resultsRef.current.style.maxHeight;

      resultsRef.current.style.overflow = "visible";
      resultsRef.current.style.maxHeight = "none";

      // Aguardar um momento para garantir que o layout seja recalculado
      await new Promise((resolve) => setTimeout(resolve, 300));

      const canvas = await html2canvas(resultsRef.current, {
        scale: 1.5,
        useCORS: true,
        backgroundColor: "#ffffff",
        height: resultsRef.current.scrollHeight,
        windowHeight: resultsRef.current.scrollHeight,
        allowTaint: true,
        logging: false,
        scrollX: 0,
        scrollY: 0,
      });

      // Restaurar estilos originais
      resultsRef.current.style.overflow = originalOverflow;
      resultsRef.current.style.maxHeight = originalMaxHeight;

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      const margin = 10; // Margem em mm

      const contentWidth = pdfWidth - margin * 2;
      const maxContentHeight = pdfHeight - margin * 2;

      // Calcular dimensões da imagem
      const imgAspectRatio = canvas.width / canvas.height;
      const imgWidth = contentWidth;
      const imgHeight = contentWidth / imgAspectRatio;

      // Adicionar sobreposição para evitar cortes visuais (5mm)
      const overlap = 5; // mm
      const effectivePageHeight = maxContentHeight + overlap;

      // Calcular quantas "fatias" precisamos
      const totalPages = Math.ceil(imgHeight / maxContentHeight);

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) {
          pdf.addPage();
        }

        // Calcular a porção da imagem para esta página
        let sourceY = (page * maxContentHeight * canvas.height) / imgHeight;
        let sourceHeight = Math.min(
          (effectivePageHeight * canvas.height) / imgHeight,
          canvas.height - sourceY
        );

        // Para páginas subsequentes, adicionar sobreposição no início
        if (page > 0) {
          const overlapPixels = (overlap * canvas.height) / imgHeight;
          sourceY = Math.max(0, sourceY - overlapPixels);
          sourceHeight = Math.min(
            sourceHeight + overlapPixels,
            canvas.height - sourceY
          );
        }

        // Criar canvas temporário para esta seção
        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");
        tempCanvas.width = canvas.width;
        tempCanvas.height = sourceHeight;

        if (tempCtx) {
          // Desenhar apenas a seção necessária
          tempCtx.drawImage(
            canvas,
            0,
            sourceY,
            canvas.width,
            sourceHeight,
            0,
            0,
            canvas.width,
            sourceHeight
          );

          const tempImgData = tempCanvas.toDataURL("image/png", 1.0);
          const sectionHeight = (sourceHeight * imgWidth) / canvas.width;

          // Ajustar posição Y para páginas subsequentes com sobreposição
          let yPosition = margin;
          if (page > 0) {
            yPosition = margin - (overlap * imgWidth) / canvas.width;
          }

          pdf.addImage(
            tempImgData,
            "PNG",
            margin,
            yPosition,
            imgWidth,
            sectionHeight
          );
        }
      }

      const today = new Date().toLocaleDateString("pt-BR");
      pdf.save(`relatorio-avaliacao-aviario-${today}.pdf`);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Erro ao gerar o PDF. Tente novamente.");
    }
  };

  const getLevelIcon = () => {
    switch (scoreLevel.level) {
      case "muito baixo":
      case "baixo":
        return <FaCheckCircle className="level-icon success" />;
      case "moderado":
        return <FaExclamationTriangle className="level-icon warning" />;
      case "alto":
      case "muito alto":
        return <FaExclamationTriangle className="level-icon danger" />;
      default:
        return <FaCheckCircle className="level-icon success" />;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="results-modal">
        <div className="modal-header">
          <h2 className="modal-header-title">Resultados da Avaliação</h2>
          <div className="header-actions">
            <button className="download-button" onClick={generatePDF}>
              <FaDownload /> Exportar PDF
            </button>
            <button className="close-button" onClick={onClose}>
              <FaTimes />
            </button>
          </div>
        </div>

        <div className="modal-body" ref={resultsRef}>
          <div className="results-header">
            <div className="score-section">
              <div
                className="score-display"
                style={{ color: scoreLevel.color }}
              >
                {getLevelIcon()}
                <div className="score-info">
                  <div className="score-number">{assessment.totalScore}/30</div>
                  <div className="score-label">Pontuação Total</div>
                </div>
              </div>

              <div className="risk-meter">
                <div className="risk-label">
                  Nível de Risco: {scoreLevel.level.toUpperCase()}
                </div>
                <div className="risk-bar">
                  <div
                    className="risk-fill"
                    style={{
                      width: `${riskPercentage}%`,
                      backgroundColor: scoreLevel.color,
                    }}
                  />
                </div>
                <div className="risk-percentage">
                  {Math.round(riskPercentage)}%
                </div>
              </div>
            </div>

            <div className="message-section">
              <div
                className="level-badge"
                style={{ backgroundColor: scoreLevel.color }}
              >
                {scoreLevel.level.toUpperCase()}
              </div>
              <p className="score-message">{scoreLevel.message}</p>
            </div>
          </div>

          <div className="blocks-summary">
            <h3>Resumo por Bloco</h3>
            <div className="blocks-grid">
              {blocks.map((block) => {
                const blockAnswers = assessment.answers.filter((a) =>
                  block.questions.find((q) => q.id === a.questionId)
                );
                const blockScore = blockAnswers.reduce(
                  (sum, a) => sum + a.score,
                  0
                );
                const maxBlockScore = block.questions.length * 2;
                const blockRisk = (blockScore / maxBlockScore) * 100;

                return (
                  <div key={block.id} className="block-summary">
                    <div className="block-header">
                      <h4>{block.title}</h4>
                      <span className="block-score">
                        {blockScore}/{maxBlockScore}
                      </span>
                    </div>
                    <div className="block-progress">
                      <div
                        className="block-progress-fill"
                        style={{
                          width: `${blockRisk}%`,
                          backgroundColor: block.color,
                        }}
                      />
                    </div>
                    <div className="block-risk">
                      {Math.round(blockRisk)}% de risco
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {improvementPoints.length > 0 && (
            <div className="improvements-section">
              <div className="critical-alert">
                <div className="alert-content">
                  <h3 className="alert-title">
                    <FaExclamationTriangle className="alert-title-icon" />
                    PONTOS CRÍTICOS IDENTIFICADOS
                  </h3>
                  <p className="alert-message">
                    <strong>ATENÇÃO:</strong> Foram identificados{" "}
                    {improvementPoints.length} pontos de ALTO RISCO que aumentam
                    significativamente a vulnerabilidade da sua granja à
                    influenza aviária. Estas questões requerem{" "}
                    <strong>AÇÃO IMEDIATA</strong> para proteger seu plantel.
                  </p>
                </div>
              </div>

              <h3 className="section-title">
                <FaExclamationTriangle className="section-icon" />
                Pontos que Necessitam Intervenção Urgente
              </h3>
              <p className="improvements-intro">
                Os itens abaixo apresentaram pontuação de risco alto/crítico e
                requerem atenção imediata:
              </p>

              <div className="improvements-list">
                {improvementPoints.map((point, index) => (
                  <div key={index} className="improvement-item">
                    <div className="improvement-header">
                      <span className="block-tag">{point.blockTitle}</span>
                      <span className="priority-badge">
                        <FaExclamationTriangle className="priority-icon" />
                        URGENTE
                      </span>
                    </div>
                    <div className="improvement-question">
                      <strong>Ponto Crítico:</strong> {point.questionText}
                    </div>
                    <div className="improvement-feedback">
                      <strong>Ação Necessária:</strong> {point.feedback}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="recommendations-section">
            <h3>Próximos Passos</h3>
            <div className="recommendations-list">
              {(scoreLevel.level === "muito baixo" ||
                scoreLevel.level === "baixo") && (
                <div className="recommendation">
                  <FaCheckCircle className="rec-icon success" />
                  <div>
                    Continue mantendo as boas práticas implementadas e realize
                    avaliações periódicas para monitorar o nível de
                    biosseguridade.
                  </div>
                </div>
              )}
              {scoreLevel.level === "moderado" && (
                <>
                  <div className="recommendation">
                    <FaExclamationTriangle className="rec-icon warning" />
                    <div>
                      Priorize a implementação das melhorias nos pontos críticos
                      identificados acima.
                    </div>
                  </div>
                  <div className="recommendation">
                    <FaExclamationTriangle className="rec-icon warning" />
                    <div>
                      Desenvolva um plano de ação com prazos definidos para cada
                      melhoria (recomendação: 30-60 dias).
                    </div>
                  </div>
                  <div className="recommendation">
                    <FaExclamationTriangle className="rec-icon warning" />
                    <div>
                      Realize nova avaliação em 60 dias para verificar o
                      progresso.
                    </div>
                  </div>
                </>
              )}
              {(scoreLevel.level === "alto" ||
                scoreLevel.level === "muito alto") && (
                <>
                  <div className="recommendation">
                    <FaExclamationTriangle className="rec-icon danger" />
                    <div>
                      <strong>URGENTE:</strong> Implemente IMEDIATAMENTE as
                      medidas corretivas nos pontos críticos identificados
                      acima.
                    </div>
                  </div>
                  <div className="recommendation">
                    <FaExclamationTriangle className="rec-icon danger" />
                    <div>
                      Busque orientação técnica especializada de um veterinário
                      especialista em aves para as áreas de maior risco.
                    </div>
                  </div>
                  <div className="recommendation">
                    <FaExclamationTriangle className="rec-icon danger" />
                    <div>
                      Realize nova avaliação em 15-30 dias para verificar as
                      melhorias implementadas.
                    </div>
                  </div>
                  <div className="recommendation">
                    <FaExclamationTriangle className="rec-icon danger" />
                    <div>
                      Considere suspender temporariamente a entrada de
                      pessoas/veículos não essenciais até implementar as
                      correções críticas.
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="report-footer">
            <div className="generation-info">
              <p>
                Relatório gerado em:{" "}
                {new Date().toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p>Sistema de Avaliação de Riscos Aviários v1.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsModal;
