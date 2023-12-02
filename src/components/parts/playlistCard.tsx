import Image from 'next/image';
import React from 'react';

function PlaylistCard({
  data,
  setCheckboxAction,
}: {
  setCheckboxAction: (playlist: any, bool: boolean) => void;
  data: any;
}) {
  const video = data.videos[0];

  return (
    <div className="hover:bg-slate-50 px-1 pb-2 w-80 rounded-lg hover:shadow-md">
      <input
        type="checkbox"
        name=""
        className="absolute scale-150 m-2 cursor-pointer checkbox"
        value={data.id}
        onChange={(e) => setCheckboxAction(data, e.target.checked)}
        id=""
      />
      <Image
        alt="動画サムネイル"
        className="rounded-md"
        src={video.thumbnails.medium.url}
        width={video.thumbnails.medium.width}
        height={video.thumbnails.medium.height}
      />
      <div className="flex p-1 space-x-1">
        <div className="">
          <p className="text-lg">
            {data.title.length <= 40
              ? data.title
              : data.title.slice(0, 40).concat('...')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PlaylistCard;
