import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../services/axiosConfig';
import axios from 'axios';
 // Import the service

const StoryList = () => {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // State to hold user info (you can fetch this from localStorage or context)
  const {id}=useParams
  useEffect(() => {
    fetchStories();
    const fetchedUser = {
      username: localStorage.getItem('username'),
      isAdmin: localStorage.getItem('isAdmin') === 'true' // Assuming you store admin status in localStorage
    };
    setUser(fetchedUser);
  }, []);

  const fetchStories = async () => {
    try {
      const response = await apiClient.get('/stories/');
      setStories(response.data);
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };
 
  const handleDeleteStory = async (storyId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this story?");
    if (confirmDelete) {
      try {
        await apiClient.delete(`/stories/${storyId}/delete`);
        setStories(stories.filter(story => story.id !== storyId)); // Remove the deleted story from the state
      } catch (error) {
        console.error('Error deleting story:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-orange-100 p-4 relative">
       {/* Back to Home Button */}
       <button
        onClick={() => navigate('/home')}
        className="absolute top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 z-10"
      >
        Go Back to Home
      </button>
      <h1
       className="text-4xl font-bold text-orange-600 mb-6 text-center animate-slide-in z-10" // Adding z-index to ensure proper layering
        style={{ fontFamily: "'Playfair Display', serif" }}>Unfolding The Tales</h1>       
      
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {stories.map((story) => (
          <li
            key={story.id}
            className="p-4 bg-white shadow rounded-lg cursor-pointer min-h-[150px] transition-transform duration-200 ease-in-out transform hover:scale-105"
            onClick={() => navigate(`/stories/${story.id}`)}
          >
            <h2 className="text-xl font-bold">{story.title}</h2>
            <p className="mt-2 text-sm font-semibold">Author: {story.author_username}</p>
            <p className='mt-4 mb-4'> {story.content}</p>
            <p className={`text-left ${story.is_completed ? 'text-green-500' : 'text-red-500'}`}> <span className='text-black font-semibold'> status: </span> {story.is_completed ? 'Completed' : 'Ongoing'}</p>
            {/* Delete button: visible only to the author and admin */}
            {(user && (story.author_username === user.username || user.isAdmin)) && (
              <button
                className="mt-2 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-300"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the story click event
                  handleDeleteStory(story.id);
                }}
              >
                Delete Story
              </button>
            )}

          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoryList;

