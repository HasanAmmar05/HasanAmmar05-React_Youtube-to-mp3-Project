import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [mp3Url, setMp3Url] = useState('');
  const [loading, setLoading] = useState(false);

  const getTitle = async () => {
    setLoading(true);
    try {
      const options = {
        method: 'GET',
        url: 'https://youtube-to-mp315.p.rapidapi.com/title',
        params: { url },
        headers: {
          'x-rapidapi-key': '8a861615ffmsh66b922b5d300103p18a62ajsn09144303544c',
          'x-rapidapi-host': 'youtube-to-mp315.p.rapidapi.com',
        },
      };
      const response = await axios.request(options);
      setTitle(response.data.title);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadMp3 = async () => {
    setLoading(true);
    try {
      const options = {
        method: 'POST',
        url: 'https://youtube-to-mp315.p.rapidapi.com/download',
        params: { url, format: 'mp3' },
        headers: {
          'x-rapidapi-key': '8a861615ffmsh66b922b5d300103p18a62ajsn09144303544c',
          'x-rapidapi-host': 'youtube-to-mp315.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.request(options);
      setMp3Url(response.data.downloadUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-3xl font-bold mb-4">YouTube to MP3 Converter</h1>
      <input
        type="text"
        className="p-2 border border-gray-300 rounded w-full max-w-md mb-4"
        placeholder="Enter YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={getTitle}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-2"
      >
        Get Video Title
      </button>
      {loading && <p>Loading...</p>}
      {title && <p className="text-xl mb-4">Title: {title}</p>}
      <button
        onClick={downloadMp3}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Convert to MP3
      </button>
      {mp3Url && (
        <a
          href={mp3Url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 text-blue-500"
        >
          Download MP3
        </a>
      )}
    </div>
  );
}

export default App;
