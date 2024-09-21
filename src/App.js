import React, { useState } from 'react';
import axios from 'axios';

function YouTubeDownloader() {
  const [url, setUrl] = useState('');
  const [downloadLinks, setDownloadLinks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleDownload = async () => {
    setLoading(true);
    setError('');
    setDownloadLinks(null);

    const videoId = extractVideoId(url);
    if (!videoId) {
      setError('Invalid YouTube URL. Please enter a valid URL.');
      setLoading(false);
      return;
    }

    const options = {
      method: 'GET',
      url: 'https://ytstream-download-youtube-videos.p.rapidapi.com/dl',
      params: { id: videoId },
      headers: {
        'x-rapidapi-key': '0a3e4b2b08msh2d2f05071f1b448p1b9b5djsn9b06c5e07881',
        'x-rapidapi-host': 'ytstream-download-youtube-videos.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setDownloadLinks(response.data);
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching download links. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-3xl font-bold mb-4">YouTube Video Downloader</h1>
      <input
        type="text"
        className="p-2 border border-gray-300 rounded w-full max-w-md mb-4"
        placeholder="Enter YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-2"
        disabled={loading || !url}
      >
        {loading ? 'Loading...' : 'Get Download Links'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {downloadLinks && (
        <div className="mt-4 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Download Links:</h2>
          <ul className="list-disc pl-5">
            {downloadLinks.formats.map((format, index) => (
              <li key={index} className="mb-2">
                <a 
                  href={format.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline"
                >
                  {format.qualityLabel || 'Audio'} - {format.mimeType.split(';')[0]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default YouTubeDownloader;