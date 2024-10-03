import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiUser } from 'react-icons/fi'; // Import the user icon
import UserProfileModal from './UserProfileModal'; // Import the modal component
import backgroundImage from './photos/background.jpg'

const HomePage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility


  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to log out?");
    if (isConfirmed) {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      navigate('/');
    }
    
  };

  // Function to open the user profile modal
  const handleUserProfile = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-orange-100  ">
      <header className="bg-orange-500 p-4 text-white text-center text-3xl font-bold">
        Story Creator
      </header>
      <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        height:'vh'
      }}
    >
      <div className="flex justify-between items-center mt-1 p-5" >
        {/* Left-aligned buttons */}
        <div className="flex space-x-4">
          <button
            className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
            onClick={() => navigate('/create')}
          >
            Create a New Story
          </button>
          <button
            className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
            onClick={() => navigate('/stories')}
          >
            View Story List
          </button>

          {/* User Profile Button with Icon */}
          <button
            className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 flex items-center"
            onClick={handleUserProfile}
          >
            <FiUser className="mr-2" /> User Profile
          </button>
        </div>

        {/* Right-aligned logout button */}
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      </div>
    </div>
  );
};

export default HomePage;
