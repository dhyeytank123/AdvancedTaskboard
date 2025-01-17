import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import PropTypes from "prop-types";

const ActivityLogModal = ({ taskId, onClose }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchActivityLogs = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Ensure that userId is available in localStorage or your state
        const token = localStorage.getItem("authToken"); // Get the token from localStorage

        if (!token) {
          console.error("User is not authenticated.");
          return;
        }
        const { data } = await axiosInstance.get(`/activity-logs/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token as Authorization header
          },
        });
        setLogs(data); 
        console.log(data);
      } catch (error) {
        console.error("Error fetching activity logs:", error.message);
      }
    };

    fetchActivityLogs();
  }, [taskId]);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Activity Log</h2>
        <div className="h-64 overflow-y-auto mb-4">
          {logs.length > 0 ? (
            logs.map((log) => (
              <div key={log._id} className="border-b pb-2 mb-2">
                <p className="text-gray-800">
                  <strong>{log.userId.username}</strong> performed: {log.action}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(log.timestamp).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No activity logs yet.</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-200 px-4 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};


ActivityLogModal.propTypes = { 
    taskId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

export default ActivityLogModal;