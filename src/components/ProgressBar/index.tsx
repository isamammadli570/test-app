import React from 'react';
import { LinearProgress } from '@mui/material';
import { useQuizStore } from '@/store/quizStore';

import s from './style.module.scss';

export const ProgressBar = () => {
  const questionNumber = useQuizStore((store) => store.questionNumber);
  return (
    <div className={s.wrapper}>
      <LinearProgress
        variant="determinate"
        value={((questionNumber + 1) / 50) * 100}
        className={s.loader}
        sx={{
          backgroundColor: '#e2eded',
        }}
      />
      <span>{questionNumber + 1}</span>
    </div>
  );
};
