import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import FeedbackModal from "../../components/ui/FeedbackModal";

const Feedback = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  const handleSubmit = async (payload) => {
    localStorage.setItem("last_session_feedback", JSON.stringify(payload));
    toast.success("Thank you for your feedback!");
  };

  return (
    <FeedbackModal
      isOpen={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
    />
  );
};

export default Feedback;
