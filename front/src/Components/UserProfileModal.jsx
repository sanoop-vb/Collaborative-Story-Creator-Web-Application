import React from 'react';

const UserProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Retrieve user info from localStorage
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">User Profile</h2>
        <p className="mb-2"><strong>Name:</strong> {username}</p>
        <p className="mb-4"><strong>Email:</strong> {email}</p>
        <button
          className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserProfileModal;
