import React from 'react';
import { IconProps } from '@/assets/icons/HomeIcon';

export const BookMarkEmptyIcon = ({ color }: IconProps) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2h12a2 2 0 0 1 2 2v17l-8-5-8 5V4a2 2 0 0 1 2-2z" />
  </svg>
);
