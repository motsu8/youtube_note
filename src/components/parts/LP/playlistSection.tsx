import React from 'react'

function PlaylistSection() {
  return (
    <>
      <p className="text-3xl">YouTube動画のURLで追加・検索</p>
      <video
        controls
        muted
        width={800}
        height={700}
        className="border rounded"
      >
        <source src="/search.mp4" />
      </video>
    </>
  )
}

export default PlaylistSection