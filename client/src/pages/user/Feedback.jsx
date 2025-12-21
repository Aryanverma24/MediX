import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import FeedbackModal from "../../components/ui/FeedbackModal";
import API from "../../utils/api";

const Feedback = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [open, setOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  const handleSubmit = async (payload) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Add sessionId to payload if available
      const feedbackData = sessionId 
        ? { ...payload, sessionId }
        : payload;

         console.log('Sending to API:', feedbackData); // Debug log

      const response = await API.post('/feedback', feedbackData);
         console.log('API Response:', response.data); // Debug log

      // Save to local storage as fallback
      localStorage.setItem("last_session_feedback", JSON.stringify(response.data.data));
      
      toast.success("Thank you for your feedback!");
      handleClose();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      const errorMessage = error.response?.data?.message || 'Failed to submit feedback. Please try again.';
      toast.error(errorMessage);
      setError(errorMessage);
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FeedbackModal
      isOpen={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={error}
    />
  );
};

export default Feedback;
