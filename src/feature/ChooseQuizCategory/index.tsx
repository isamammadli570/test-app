import React from 'react';
import s from './style.module.scss';
import Link from 'next/link';

export const ChooseQuizCategory = () => {
  return (
    <div className={s.wrapper}>
      <h1>Uyğun Fənnə Aid İmtahanı Seç</h1>
      <div className={s.buttonWrapper}>
        <Link href="/quiz?q=istehsal" className={s.link}>
          Fəlsəfə
        </Link>
        <Link href="/quiz?q=multi" className={s.link}>
          İqtisadiyyat
        </Link>
        <Link href="/quiz?q=cografiya" className={s.link}>
          Coğrafiya
        </Link>
        <Link href="/quiz?q=mektebsunasliq" className={s.link}>
          Məktəb sünaslıq
        </Link>
      </div>
    </div>
  );
};
