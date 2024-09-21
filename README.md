# YouTube to MP3/4 Downloader

**Hasan's YouTube to MP3/4 Downloader** is a React-based web application that allows users to extract video information and download YouTube videos in various formats (MP3/MP4). The app fetches video data and download links from the YouTube API using Axios and displays video details like title, views, likes, and download options.

## Features
- **YouTube URL Validation**: The app validates if a URL is a valid YouTube video link.
- **Video Information Fetching**: Fetches and displays video title, views, likes, publish date, and duration.
- **Download Links**: Provides downloadable links for both video (highest quality) and audio.
- **Loading States**: Displays appropriate loading messages when fetching data or processing downloads.
- **Error Handling**: Shows user-friendly error messages if something goes wrong (e.g., invalid URL or failed API request).

## Website Link : 


## Tech Stack
- **Frontend**: React (functional components, hooks)
- **Styling**: Tailwind CSS for a modern and responsive design
- **API Integration**: Axios for making HTTP requests to the YouTube API (via RapidAPI)

## How It Works
1. Enter a valid YouTube URL in the input field.
2. Click on the **Get Info** button to fetch video details.
3. Click on the **Download** button to fetch download links for the highest quality video and audio formats.
4. Click the provided links to download the video or audio directly.

## Setup Instructions

1. **Clone the repository:**
    ```bash
    git clone https://github.com/HasanAmmar05/youtube-downloader.git
    cd youtube-downloader
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Run the app:**
    ```bash
    npm start
    ```
    The app will be available at [http://localhost:3000](http://localhost:3000).

4. **Update API Keys**: Replace the `x-rapidapi-key` in the `handleGetInfo` and `handleDownload` functions with your own RapidAPI key.

## API Usage

This app uses two endpoints from the YouTube API via RapidAPI:

1. **YouTube Video Info**: Retrieves video information based on the video ID.
    - **URL**: `https://youtube-video-information1.p.rapidapi.com/api/youtube`
    - **Method**: GET

2. **YouTube Download Links**: Fetches download links for the specified video.
    - **URL**: `https://ytstream-download-youtube-videos.p.rapidapi.com/dl`
    - **Method**: GET

