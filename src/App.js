import React, { useState } from 'react';
import axios from 'axios';

function YouTubeDownloader() {
  const [url, setUrl] = useState('');
  const [downloadLinks, setDownloadLinks] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleGetInfo = async () => {
    setLoading(true);
    setError('');
    setVideoInfo(null);

    const videoId = extractVideoId(url);
    if (!videoId) {
      setError('Invalid YouTube URL. Please enter a valid URL.');
      setLoading(false);
      return;
    }

    const options = {
      method: 'GET',
      url: 'https://youtube-video-information1.p.rapidapi.com/api/youtube',
      params: { video_id: videoId },
      headers: {
        'x-rapidapi-key': '0a3e4b2b08msh2d2f05071f1b448p1b9b5djsn9b06c5e07881',
        'x-rapidapi-host': 'youtube-video-information1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setVideoInfo(response.data);
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching video information. Please try again.');
    } finally {
      setLoading(false);
    }
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

  const downloadVideo = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'video';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-3xl font-bold mb-4">YouTube Video Downloader & Info</h1>
      <input
        type="text"
        className="p-2 border border-gray-300 rounded w-full max-w-md mb-4"
        placeholder="Enter YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <div className="flex space-x-2 mb-4">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={loading || !url}
        >
          {loading ? 'Loading...' : 'Get Download Links'}
        </button>
        <button
          onClick={handleGetInfo}
          className="px-4 py-2 bg-green-500 text-white rounded"
          disabled={loading || !url}
        >
          {loading ? 'Loading...' : 'Get Video Info'}
        </button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {downloadLinks && (
        <div className="mt-4 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Download Links:</h2>
          <ul className="list-disc pl-5">
            {downloadLinks.formats.map((format, index) => (
              <li key={index} className="mb-2">
                <button 
                  onClick={() => downloadVideo(format.url, `video.${format.mimeType.split('/')[1].split(';')[0]}`)}
                  className="text-blue-600 hover:underline"
                >
                  Download {format.qualityLabel || 'Audio'} - {format.mimeType.split(';')[0]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {videoInfo && (
        <div className="mt-4 w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
          <img src={videoInfo.thumbnail} alt={videoInfo.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{videoInfo.title}</h2>
            <p className="text-gray-600 mb-2">Published: {new Date(videoInfo.published_at).toLocaleDateString()}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <p>Views: {videoInfo.view_count}</p>
              <p>Likes: {videoInfo.like_count}</p>
              <p>Duration: {videoInfo.duration.replace(/PT(\d+)M(\d+)S/, '$1:$2')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default YouTubeDownloader;