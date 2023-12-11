import React from 'react';

function PlaylistSection() {
  return (
    <div
      id="section-playlist"
      className="w-full flex flex-col justify-center items-center space-y-10 py-24"
    >
      <p className="text-3xl">YouTube動画のURLで追加・検索</p>
      <video
        controls
        muted
        width={1000}
        height={700}
        className="border rounded-lg"
      >
        <source src="/search.mp4" />
      </video>
    </div>
  );
}

export default PlaylistSection;
