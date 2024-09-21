import React, { useState } from 'react';
import axios from 'axios';

const Logo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

function YouTubeDownloader() {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadLinks, setDownloadLinks] = useState(null);

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
      
      // Find the highest quality video link
      const videoFormats = response.data.formats.filter(format => format.mimeType.startsWith('video/mp4'));
      const highestQualityVideo = videoFormats.reduce((prev, current) => 
        (prev.qualityLabel > current.qualityLabel) ? prev : current
      );

      setDownloadLinks({
        video: highestQualityVideo.url,
        audio: response.data.adaptiveFormats.find(format => format.mimeType.startsWith('audio/mp4')).url
      });
    } catch (error) {   
      console.error(error);
      setError('An error occurred while fetching download links. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center p-8">
      <header className="w-full max-w-4xl flex justify-between items-center mb-8">
        <div className="flex items-center space-x-2 text-purple-300">
          <Logo />
          <h1 className="text-2xl font-bold">Hasan's YT to MP3/4 Downloader</h1>
        </div>
        <a
          href="https://github.com/HasanAmmar05"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-300 hover:text-purple-400 transition-colors"
        >
          <GitHubIcon />
        </a>
      </header>
      <main className="w-full max-w-4xl bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="relative mb-8">
            <input
              type="text"
              className="w-full px-6 py-4 bg-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter YouTube URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <div className="absolute right-2 top-2 flex space-x-2">
              <button
                onClick={handleDownload}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-semibold transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
                disabled={loading || !url}
              >
                {loading ? 'Downloading...' : 'Download'}
              </button>
              <button
                onClick={handleGetInfo}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full font-semibold transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={loading || !url}
              >
                {loading ? 'Loading...' : 'Get Info'}
              </button>
            </div>
          </div>
          {error && (
            <div className="bg-red-900 bg-opacity-50 text-red-200 p-4 rounded-lg mb-6">
              <p>{error}</p>
            </div>
          )}
          {videoInfo && (
            <div className="bg-gray-700 bg-opacity-50 rounded-2xl overflow-hidden shadow-xl mb-6">
              <div className="relative">
                <img src={videoInfo.thumbnail} alt={videoInfo.title} className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">{videoInfo.title}</h2>
                  <p className="text-sm opacity-80">Published: {new Date(videoInfo.published_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="p-6 flex justify-between text-sm text-gray-300">
                <p>Views: {videoInfo.view_count.toLocaleString()}</p>
                <p>Likes: {videoInfo.like_count.toLocaleString()}</p>
                <p>Duration: {videoInfo.duration.replace(/PT(\d+)M(\d+)S/, '$1:$2')}</p>
              </div>
            </div>
          )}
          {downloadLinks && (
            <div className="bg-gray-700 bg-opacity-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-purple-300">Download Links</h3>
              <div className="space-y-4">
                <a
                  href={downloadLinks.video}
                  className="block px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-center font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Video (Highest Quality)
                </a>
                <a
                  href={downloadLinks.audio}
                  className="block px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full text-center font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Audio
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default YouTubeDownloader;