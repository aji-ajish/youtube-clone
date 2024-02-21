import React from "react";
import { MdVerified } from "react-icons/md";

export default function RecommendVideo({
  thumbnail,
  title,
  views,
  uploadTime,
  channel,
}) {
  return (
    <div className="text-yt-white flex cursor-pointer bg-yt-light mt-3 items-center">
      <img
        src={thumbnail}
        alt=""
        className="h-32 w-32 rounded-2xl object-contain"
      />
      <div className="pl-2">
        <h2 className="text-sm font-medium">
          {title.length <= 50 ? title : `${title.substr(0, 50)}...`}
        </h2>
        <p className="text-xs text-yt-gray pt-2 flex item-center">
          {channel}
          <span className="p-1">
            <MdVerified />
          </span>
        </p>
        <div className="flex">
          <p className="text-xs text-yt-gray pr-1">{views} Views</p>
          <p className="text-xs text-yt-gray pr-1">{uploadTime}</p>
        </div>
      </div>
    </div>
  );
}
