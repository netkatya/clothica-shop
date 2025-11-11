'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './PaymentStatus.module.css';

type Status = 'loading' | 'success' | 'failed';

interface MotionCheckProps {
  status: Status;
}

export default function MotionCheck({ status }: MotionCheckProps) {
  return (
    <div className={styles.container}>
      {status === 'success'}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={
          status === 'success'
            ? { scale: 1, opacity: 1 }
            : { scale: 0.9, opacity: 0.8 }
        }
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={styles.checkWrapper}
      >
        <div className={styles.circle}>
          <svg viewBox="0 0 24 24" className={styles.check}>
            <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
          </svg>
          <div className={styles.glow}></div>
        </div>
      </motion.div>
    </div>
  );
}
