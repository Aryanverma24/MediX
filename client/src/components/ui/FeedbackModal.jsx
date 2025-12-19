import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Star, Sparkles, Send, ThumbsUp, ThumbsDown } from "lucide-react";

const chipOptions = [
  "Calming",
  "Easy to follow",
  "Loved the guidance",
  "Audio issues",
  "Video issues",
  "Too long",
  "Too short",
  "Would join again",
];

const moods = [
  { value: "relaxed", label: "Relaxed" },
  { value: "focused", label: "Focused" },
  { value: "energized", label: "Energized" },
  { value: "neutral", label: "Neutral" },
];

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const sheet = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 520, damping: 38 },
  },
  exit: { opacity: 0, y: 18, scale: 0.985, transition: { duration: 0.16 } },
};

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const FeedbackModal = ({
  isOpen,
  onClose,
  onSubmit,
  heading = "How was today’s session?",
  subheading = "Your feedback helps us improve your meditation experience.",
  defaultValues,
}) => {
  const initial = useMemo(
    () => ({
      rating: clamp(Number(defaultValues?.rating || 0), 0, 5),
      mood: defaultValues?.mood || "relaxed",
      recommend: Boolean(defaultValues?.recommend ?? true),
      message: defaultValues?.message || "",
      chips: Array.isArray(defaultValues?.chips) ? defaultValues.chips : [],
    }),
    [defaultValues]
  );

  const [rating, setRating] = useState(initial.rating);
  const [hoverRating, setHoverRating] = useState(0);
  const [mood, setMood] = useState(initial.mood);
  const [recommend, setRecommend] = useState(initial.recommend);
  const [message, setMessage] = useState(initial.message);
  const [chips, setChips] = useState(initial.chips);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const visibleRating = hoverRating || rating;

  const toggleChip = (chip) => {
    setChips((prev) => {
      if (prev.includes(chip)) return prev.filter((c) => c !== chip);
      return [...prev, chip].slice(0, 6);
    });
  };

  const reset = () => {
    setRating(initial.rating);
    setHoverRating(0);
    setMood(initial.mood);
    setRecommend(initial.recommend);
    setMessage(initial.message);
    setChips(initial.chips);
    setSubmitting(false);
    setError("");
  };

  const handleClose = () => {
    reset();
    onClose?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!rating) {
      setError("Please select a rating.");
      return;
    }

    if ((message || "").trim().length < 6) {
      setError("Please add a short message (min 6 characters).");
      return;
    }

    const payload = {
      rating,
      mood,
      recommend,
      message: message.trim(),
      chips,
      createdAt: new Date().toISOString(),
    };

    try {
      setSubmitting(true);
      await onSubmit?.(payload);
      handleClose();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="min-h-screen fixed inset-0 z-[60] flex items-start justify-center p-4 sm:items-center"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdrop}
        >
          <motion.button
            type="button"
            aria-label="Close feedback"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-xl h-[90vh] sm:h-[min(90vh,760px)] overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/90 via-white/80 to-white/70 shadow-[0_30px_90px_-25px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            variants={sheet}
          >
            <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-gradient-to-br from-purple-400/35 to-pink-400/35 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-gradient-to-br from-emerald-400/25 to-sky-400/25 blur-2xl" />

            <div className="relative flex h-full min-h-0 flex-col p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-purple-200/70 bg-purple-50/60 px-3 py-1 text-xs font-semibold text-purple-700">
                    <Sparkles className="h-4 w-4" />
                    Feedback
                  </div>
                  <h2 className="mt-3 text-xl font-bold text-gray-900 sm:text-2xl">{heading}</h2>
                  <p className="mt-1 text-sm text-gray-600">{subheading}</p>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/70 text-gray-700 shadow-sm transition hover:bg-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain pr-1">
                <div className="rounded-2xl border border-gray-200/70 bg-white/70 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-800">Rate the session</p>
                    <p className="text-xs text-gray-500">{rating ? `${rating}/5` : ""}</p>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, idx) => {
                      const value = idx + 1;
                      const active = value <= visibleRating;
                      return (
                        <button
                          key={value}
                          type="button"
                          onMouseEnter={() => setHoverRating(value)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(value)}
                          className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white/70 transition hover:scale-[1.02] hover:bg-white"
                          aria-label={`Rate ${value} star`}
                        >
                          <Star
                            className={`h-5 w-5 transition ${
                              active ? "fill-amber-400 text-amber-500" : "text-gray-400"
                            } group-hover:fill-amber-300 group-hover:text-amber-500`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-gray-200/70 bg-white/70 p-4">
                    <label className="text-sm font-semibold text-gray-800">Mood after session</label>
                    <select
                      value={mood}
                      onChange={(e) => setMood(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
                    >
                      {moods.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="rounded-2xl border border-gray-200/70 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-gray-800">Would you recommend?</p>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setRecommend(true)}
                        className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition ${
                          recommend
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <ThumbsUp className="h-4 w-4" />
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setRecommend(false)}
                        className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition ${
                          !recommend
                            ? "border-rose-200 bg-rose-50 text-rose-700"
                            : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <ThumbsDown className="h-4 w-4" />
                        No
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200/70 bg-white/70 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-800">Quick highlights</p>
                    <p className="text-xs text-gray-500">Pick up to 6</p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {chipOptions.map((chip) => {
                      const active = chips.includes(chip);
                      return (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => toggleChip(chip)}
                          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                            active
                              ? "border-purple-200 bg-purple-50 text-purple-700"
                              : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {chip}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200/70 bg-white/70 p-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-800">Write a message</label>
                    <p className="text-xs text-gray-500">{message.length}/300</p>
                  </div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, 300))}
                    rows={4}
                    placeholder="Tell us what you liked, and what we can improve…"
                    className="mt-2 w-full resize-none rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
                  />
                  {error ? <p className="mt-2 text-sm font-medium text-rose-600">{error}</p> : null}
                </div>

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
                    disabled={submitting}
                  >
                    Close
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition ${
                      submitting
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    }`}
                  >
                    <Send className="h-4 w-4" />
                    {submitting ? "Submitting…" : "Submit Feedback"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default FeedbackModal;
