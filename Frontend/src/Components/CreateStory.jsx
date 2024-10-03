
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateStory = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  

  

  
  const handleCreateStory = async (e) => {
    e.preventDefault();
    setError('');

    const token = localStorage.getItem('access');
    if (!token) {
      setError('Unauthorized. Please log in.');
      return;
    }

    try {
      await axios.post(
        'http://127.0.0.1:8000/stories/new/', 
        { title, content,  },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      navigate('/stories');  // Navigate to the Story List page after successful creation
    } catch (err) {
      setError('Error creating story. Please try again.');
      console.error();
      
    }
  };
  const handleBack = () => {
    navigate('/home'); // Navigate back to the home page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white">
      <div className="bg-white text-orange-600 rounded-lg shadow-lg p-8 w-full max-w-2xl  ">
        <h2 className="text-2xl font-bold mb-6 text-center">Create a New Story</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleCreateStory}>
          <div className="mb-4">
            <label className="block mb-2">Story Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">First sentence</label>
            <textarea
              className="w-full p-2 mb-2 border rounded-lg"
              style={{ height: '150px' }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={300}
              required
            />
          </div>
          <div className="flex justify-between gap-2">
          <button
            type="submit"
            className="w-full bg-orange-500  text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Create Story
          </button>
                      {/* Back Button */}
                      <button
              type="button"
              onClick={handleBack}
              className="bg-gray-500 text-white  py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateStory;
