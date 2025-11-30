import React, { useState } from 'react';
import { FiPlay, FiClock } from 'react-icons/fi';

const VideoCard = ({ video, onSelect }) => {

  const getThumbnailUrl = (url) => {
    const videoId = url.split('v=')[1];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onSelect(video)}
    >
      <div className="relative pb-[56.25%] bg-gray-100">
        <img 
          src={getThumbnailUrl(video.url)} 
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center">
            <FiPlay className="text-purple-600 text-xl ml-1" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-medium text-gray-900 line-clamp-2">{video.title}</h4>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <FiClock className="mr-1" />
          <span>{video.duration}</span>
        </div>
      </div>
    </div>
  );
};

const VideoPlayer = ({ video, onClose, onBack }) => {
  const videoId = video.url.split('v=')[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0`;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">{video.title}</h3>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <iframe
          className="w-full h-96 rounded-lg"
          src={embedUrl}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <button
        onClick={onBack}
        className="text-purple-600 hover:text-purple-800 font-medium flex items-center"
      >
        ← Back to videos
      </button>
    </div>
  );
};

const SavedVideos = ({ videos, onBack, onJoinClick }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Meditation Videos</h1>
            </div>
            
            {selectedVideo ? (
              <VideoPlayer 
                video={selectedVideo} 
                onClose={() => setSelectedVideo(null)}
                onBack={() => setSelectedVideo(null)}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <VideoCard 
                    key={video.id} 
                    video={video} 
                    onSelect={setSelectedVideo} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedVideos;
