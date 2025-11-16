'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { getTelegramLinked, getMeTelegramLink } from '@/lib/api/clientApi';
import { SiTelegram } from 'react-icons/si';
import css from './ConnectTelegram.module.css';
import Loading from '@/app/loading';

const ConnectTelegram = () => {
  const { user } = useAuthStore();
  const [isLinked, setIsLinked] = useState(user?.telegramLinked || false);
  const [loading, setLoading] = useState(true);
  const [telegramLink, setTelegramLink] = useState('');

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const data = await getTelegramLinked();

        setIsLinked(data?.isLinked);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getTelegramLink = async () => {
      try {
        if (user) {
          const { success, data } = await getMeTelegramLink();

          setTelegramLink(success ? data.link : '');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getTelegramLink();
  }, [user]);

  if (loading) return Loading();

  return (
    <div className={css.container}>
      {isLinked ? (
        <div className={css.successMsg}>
          <span className={css.successIcon}>✓</span>
          Telegram Connected!
        </div>
      ) : (
        <>
          <p className={css.description}>
            Click the button below to connect your Telegram account.
          </p>

          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className={css.button}
          >
            <SiTelegram className={css.icon} />
            Open Bot
          </a>

          <p className={css.note}>
            After starting the bot, the connection status will update
            automatically.
          </p>
        </>
      )}
    </div>
  );
};

export default ConnectTelegram;
