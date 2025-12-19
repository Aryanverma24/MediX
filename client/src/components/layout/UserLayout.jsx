import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import FeedbackModal from '../ui/FeedbackModal';
import UserSidebar from './UserSidebar';

const UserLayout = ({ children }) => {
  const FEEDBACK_PENDING_KEY = 'meeting_feedback_pending';
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [pendingMeta, setPendingMeta] = useState(null);

  const readPending = () => {
    try {
      const raw = localStorage.getItem(FEEDBACK_PENDING_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  };

  const openIfPending = () => {
    const meta = readPending();
    if (!meta) return;
    setPendingMeta(meta);
    setFeedbackOpen(true);
  };

  useEffect(() => {
    openIfPending();

    const handleFocus = () => openIfPending();
    const handleVisibilityChange = () => {
      if (!document.hidden) openIfPending();
    };
    const handlePendingEvent = () => openIfPending();

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('feedback:pending', handlePendingEvent);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('feedback:pending', handlePendingEvent);
    };
  }, []);

  const handleFeedbackClose = () => {
    localStorage.removeItem(FEEDBACK_PENDING_KEY);
    setPendingMeta(null);
    setFeedbackOpen(false);
  };

  const handleFeedbackSubmit = async (payload) => {
    const meta = readPending() || pendingMeta;
    localStorage.setItem('last_session_feedback', JSON.stringify({
      ...payload,
      ...(meta || {})
    }));
    localStorage.removeItem(FEEDBACK_PENDING_KEY);
    setPendingMeta(null);
    setFeedbackOpen(false);
    toast.success('Thank you for your feedback!');
  };

  return (
    <div className="flex min-h-screen">
          <UserSidebar />
           <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <FeedbackModal
          isOpen={feedbackOpen}
          onClose={handleFeedbackClose}
          onSubmit={handleFeedbackSubmit}
        />
        {children}
      </main>
    </div>
  );
};

export default UserLayout;
