import React from 'react';
import { HelpCircle, CheckCircle2, MessageSquare, Lock } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';

export default function PredictAnswerView({ isReadOnly = false }) {
  const { currentQuestion, currentPredict, updatePredictAnswer } = useWorkspace();

  if (!currentQuestion || !currentQuestion.predictConfig) return null;

  const { options = [], requireExplanation, explanationPrompt } = currentQuestion.predictConfig;
  const selectedOptionId = currentPredict?.selectedOptionId;
  const explanation = currentPredict?.explanation || '';

  const handleSelectOption = (optionId) => {
    if (isReadOnly) return;
    updatePredictAnswer(optionId, explanation);
  };

  const handleExplanationChange = (e) => {
    if (isReadOnly) return;
    updatePredictAnswer(selectedOptionId, e.target.value);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-slate-50 flex flex-col gap-6">
      {/* Title & Question Prompt */}
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">
              {currentQuestion.type === 'MCQ' ? 'Select Correct Option' : 'Predict Expected Output'}
            </h2>
          </div>
          {isReadOnly && (
            <span className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              <Lock className="w-3 h-3" /> Submitted Attempt
            </span>
          )}
        </div>

        {currentQuestion.predictConfig?.question && (
          <p className="text-sm font-medium text-slate-800 mt-1">
            {currentQuestion.predictConfig.question}
          </p>
        )}
      </div>

      {/* Options List OR Direct Prediction Input */}
      {options && options.length > 0 ? (
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Available Choices
          </span>

          <div className="space-y-2.5">
            {options.map((option) => {
              const isSelected = selectedOptionId === option.id || selectedOptionId === option.label;
              return (
                <label
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  className={`flex items-start gap-3.5 p-4 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-500 ring-1 ring-blue-400 text-slate-900 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-100/50 text-slate-700'
                  } ${isReadOnly ? 'cursor-default opacity-80' : ''}`}
                >
                  <input
                    type="radio"
                    name="predict-option"
                    checked={isSelected}
                    onChange={() => handleSelectOption(option.id)}
                    disabled={isReadOnly}
                    className="mt-0.5 w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <div className="flex-1 font-mono text-xs sm:text-sm font-medium leading-relaxed break-all">
                    {option.label}
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Predicted Console Output
          </span>

          <input
            type="text"
            value={selectedOptionId || ''}
            onChange={(e) => handleSelectOption(e.target.value)}
            disabled={isReadOnly}
            placeholder="Type expected output (e.g. 12, Hello World, undefined, [1, 2, 3])..."
            className="w-full p-3.5 bg-white border border-slate-200 rounded-lg text-sm font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:bg-slate-100"
          />
          <p className="text-xs text-slate-500">
            Type the exact string or value that will be printed to the console when the code executes.
          </p>
        </div>
      )}
    </div>
  );
}
