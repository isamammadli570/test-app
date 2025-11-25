'use client';
import React, { useMemo } from 'react';
import s from './style.module.scss';
import clsx from 'clsx';
import { useQuizStore } from '@/store/quizStore';
import { CheckMarkIcon } from '@/assets/icons/CheckMarkIcon';
import { BookMarkEmptyIcon } from '@/assets/icons/BookMarkEmpty';
import { QuestionProp } from '@/types/types';
import { BookmarkIcon } from '@/assets/icons/BookmarkIcon';
import { ProgressBar } from '@/components/ProgressBar';
import { useSavedQuestions } from '@/hooks/useSavedQuestions';
import { handleAddToSaved, handleDeleteFromSaved } from '@/helpers/handleSave';

interface TestWrapperProp {
  question: QuestionProp;
}

export const TestWrapper = ({ question }: TestWrapperProp) => {
  const { savedQuestions, isSaved, setIsSaved } = useSavedQuestions(question);

  const showCorrectVariant = useQuizStore((store) => store.showCorrectVariant);
  const selectedAnswers = useQuizStore((store) => store.selectedAnswers);
  const setSelectedAnswer = useQuizStore((store) => store.setSelectedAnswer);

  const selectedAnswer = selectedAnswers.find(
    (q) => q.question === question?.question
  )?.answer;

  const shuffleArray = (array: string[]) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };
  const shuffledOptions = useMemo(
    () => shuffleArray(question.options),
    [question]
  );

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <h2>{question?.question}</h2>
        <div className={s.savedIcons}>
          {isSaved ? (
            <span
              onClick={() =>
                handleDeleteFromSaved(savedQuestions, question, setIsSaved)
              }
            >
              <BookmarkIcon color="#a29bfe" />
            </span>
          ) : (
            <span
              onClick={() =>
                handleAddToSaved(savedQuestions, isSaved, setIsSaved, question)
              }
            >
              <BookMarkEmptyIcon color="#a29bfe" />
            </span>
          )}
        </div>
      </div>

      <ProgressBar />
      <ul className={s.answers}>
        {shuffledOptions.map((answer: string) => {
          const isCorrect = answer === question.correctAnswer;
          const isSelected = answer === selectedAnswer;

          return (
            <div
              key={answer}
              className={clsx(s.default, {
                [s.correct]: showCorrectVariant && isCorrect,
                [s.selected]: isSelected,
              })}
              onClick={() => setSelectedAnswer(question.question, answer)}
            >
              <button>{answer}</button>
              {showCorrectVariant && isCorrect && (
                <span className={s.icon}>
                  <CheckMarkIcon color="#e0eeeb" />
                </span>
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
};
