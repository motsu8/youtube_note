import Image from 'next/image';
import React from 'react';

function VideoCard({ video }: { video: any }) {
  if (video) {
    return (
      <div className="hover:bg-slate-50 px-1 pb-2 w-80 rounded-lg hover:shadow-md">
        <Image
          alt="動画サムネイル"
          className="rounded-md"
          src={video.thumbnails.medium.url}
          width={video.thumbnails.medium.width}
          height={video.thumbnails.medium.height}
        />
        <div className="flex p-1 space-x-1">
          <Image
            alt="チャンネルサムネイル"
            className="rounded-full w-9 h-9"
            src={video.channel_thumbnails.default.url}
            width={35}
            height={35}
          />
          <div className="">
            <p className="text-sm">{video.title.slice(0, 40).concat('...')}</p>
            <p className="text-sm text-neutral-600">{video.channel}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoCard;
