
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../services/axiosConfig'; // Use apiClient

const StoryDetail = () => {
  const { id } = useParams(); // Get the story ID from the route parameter
  const [story, setStory] = useState({}); // Set initial state to null
  const [contributions, setContributions] = useState([]);
  const [newContribution, setNewContribution] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the story details and contributions from the API
    fetchStory();
  }, [id]);

  const fetchStory = async () => {
    try {
      // Use apiClient to make the request with token handling
      const response = await apiClient.get(`/stories/${id}/`);
      console.log('API Response:', response); // Log the full response to the console
      console.log('Data:', response.data.story);
      setStory(response.data.story); // Assuming the response data contains the story object
      setContributions(response.data.contributions);

    } catch (err) {
      setError('Unable to fetch story details. Please try again.');
      console.error('Error fetching story:', err);
    }
  };

  const handleAddContribution = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await apiClient.post(
        `/stories/${id}/contribute/`,
        { content: newContribution }
      );
      setNewContribution(''); // Clear input after successful contribution
      navigate('/stories'); // Reload the story page to show the new contribution
      alert('seccessfully contributed to the story');
    } catch (err) {
      setError('unable to add contribution. Check if the word count is more than 20 or the contribution reached maximum limit.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white">
      <div className="bg-white text-orange-600 rounded-lg shadow-lg p-8 w-full max-w-3xl">
        {error && <p className="text-red-500 mb-4">{error}</p>}
  
        {story ? (
          <>
            {/* Main Story Content Only */}
            <div className="mb-6 p-4 border rounded-lg shadow-md bg-white">
              <h2 className="text-2xl font-bold mb-2 text-center">{story.title}</h2>
              <h3 className="mb-2 text-center font-bold text-gray-700">Author: {story.author_username}</h3>
              <p className="mb-10 mt-10 text-black font-semibold">{story.content}</p>
              
              <p className={`text-right ${story.is_completed ? 'text-green-500' : 'text-red-500'}`}>
                <span className="text-right text-black">Status:</span> {story.is_completed ? 'Completed' : 'Ongoing'}
              </p>
            </div>
  
            {/* Contributions Display (Outside the Main Story Box) */}
            <div className="mb-4">
              <h3 className=" text-lg font-semibold mb-2">Contributions</h3>
              <ul className="list-disc pl-5">
                {contributions.map((contribution, index) => (
                  <li key={index} className="mb-2 p-2 text-black border-b border-gray-300">
                    <strong>contributed by {contribution.author_username}</strong> :: <span>{contribution.content}</span>
                    <h3 className='mt-2'>Created at: {contribution.created_at}</h3>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Contribution Form */}
            <form onSubmit={handleAddContribution}>
              <div className="mb-4">
                <label className="block mb-2">Add your contribution (max 20 words)</label>
                <textarea
                  className="w-full p-2 border rounded-lg"
                  value={newContribution}
                  onChange={(e) => setNewContribution(e.target.value)}
                  
                  required
                />
              </div>
              <div className="flex justify-between gap-2">
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300"
              >
                Add Contribution
              </button>
              <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
                  onClick={() => navigate('/stories')} // Back to story list
                >
                  Back
                </button>
              </div>
            </form>
          </>
        ) : (
          <p>Loading story details...</p>
        )}
      </div>
    </div>
  );
  
}

export default StoryDetail;
