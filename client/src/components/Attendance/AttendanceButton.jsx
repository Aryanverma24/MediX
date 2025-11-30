// src/components/Attendance/AttendanceButton.jsx
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {useAuth} from "../../hooks/useAuth";
import API from "../../utils/api";

export default function AttendanceButton({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const { updateLocalUser } = useAuth();

  const handle = async () => {
    try {
      setLoading(true);
      const res = await API.post("/attendance/mark");
      toast.success("Attendance marked");
      if (res.data?.userProgress) updateLocalUser(res.data.userProgress);
      if (onSuccess) onSuccess(res.data.userProgress);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-teal-400 text-white font-semibold" onClick={handle} disabled={loading}>
      {loading ? "Marking..." : "Join Today's Session"}
    </button>
  );
}
