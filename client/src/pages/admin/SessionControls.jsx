import React from 'react';
import { toast } from 'react-hot-toast';
import API from '../../utils/api';

const SessionControls = ({ session, onStatusChange }) => {
  const handleStatusChange = async (action) => {
    try {
      const endpoint = `/meetings/sessions/${session._id}/${action}`;
      const response = await API.post(endpoint);

      if (response.data.session.status === action) {
      toast.success(`Session ${action} successfully`);
      onStatusChange();
    } else {
      toast.error('Failed to update session status');
      console.error('Status mismatch:', response.data);
    }
  } catch (error) {
    console.error('Error:', error);
    toast.error(error.response?.data?.message || 'Failed to update session status');
  }
};

  return (
    <div className="flex space-x-4 mt-4">

{session.status === 'completed' && (
  <button
    onClick={() => handleStatusChange('scheduled')}
    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
  >
    Reschedule Session
  </button>
)}

      {session.status === 'scheduled' && (
        <button
          onClick={() => handleStatusChange('live')}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Start Session
        </button>
      )}
      
      {session.status === 'live' && (
        <button
          onClick={() => handleStatusChange('completed')}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          End Session
        </button>
      )}
      
      <span className="px-4 py-2 bg-gray-200 rounded-lg">
        Status: <span className="font-medium">{session.status}</span>
      </span>
    </div>
  );
};

export default SessionControls;