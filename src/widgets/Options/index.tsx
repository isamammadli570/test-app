'use client';

import React from 'react';
import s from './style.module.scss';
import { useQuizStore } from '@/store/quizStore';
import { useRouter } from 'next/navigation';
import { GrPrevious } from 'react-icons/gr';
import { GrNext } from 'react-icons/gr';
import { IoEyeOutline } from 'react-icons/io5';
import { IoEyeOffOutline } from 'react-icons/io5';

export const Options = () => {
  const selectedAnswers = useQuizStore((store) => store.selectedAnswers);
  const questionNumber = useQuizStore((store) => store.questionNumber);
  const setQuestionNumber = useQuizStore((store) => store.setQuestionNumber);
  const setShowCorrectVariant = useQuizStore(
    (store) => store.setShowCorrectVariant
  );
  const showCorrectVariant = useQuizStore((store) => store.showCorrectVariant);
  const randomQuestions = useQuizStore((store) => store.randomQuestions);
  const router = useRouter();
  const handleNext = () => {
    if (questionNumber === randomQuestions.length - 1) {
      return null;
    }
    setQuestionNumber(1);
    setShowCorrectVariant(false);
  };

  const handlePrevious = () => {
    if (questionNumber === 0) {
      return null;
    }
    setQuestionNumber(-1);
    setShowCorrectVariant(false);
  };

  const handleNavigate = () => {
    const existingData = localStorage.getItem('total');
    const parsedData = existingData ? JSON.parse(existingData) : [];

    const newEntry = {
      totalQuestion: randomQuestions,
      answeredQuestion: selectedAnswers,
    };
    const updatedData = [...parsedData, newEntry];

    localStorage.setItem('total', JSON.stringify(updatedData));

    if (selectedAnswers.length !== 0) {
      router.push(`/result/${parsedData.length === 0 ? 0 : parsedData.length}`);
    }
  };

  return (
    <div className={s.options}>
      <div className={s.buttons}>
        {showCorrectVariant ? (
          <button
            type="button"
            className={s.secondary}
            onClick={() => setShowCorrectVariant(false)}
          >
            <IoEyeOffOutline size={40} />
          </button>
        ) : (
          <button
            type="button"
            className={s.secondary}
            onClick={() => setShowCorrectVariant(true)}
          >
            <IoEyeOutline  size={40} />
          </button>
        )}

        <button
          disabled={selectedAnswers.length === 0}
          onClick={handleNavigate}
          className={s.finish}
        >
          Bitir
        </button>

        <div className={s.navigation}>
          <button
            type="button"
            className={s.primary}
            onClick={handlePrevious}
            disabled={questionNumber === 0}
          >
            {/* <PrevIcon color="#cfbacf" /> */}
            <GrPrevious color="#cfbacf" size={24} />
          </button>

          <button
            type="button"
            className={s.primary}
            onClick={handleNext}
            disabled={questionNumber === randomQuestions.length - 1}
          >
            <GrNext color="#cfbacf" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
