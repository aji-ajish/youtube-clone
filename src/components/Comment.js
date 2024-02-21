import React from "react";
import { BiDislike, BiLike } from "react-icons/bi";

export default function Comment({ name, uploaded, image, comment }) {
  return (
    <div className="flex flex-row mb-3">
      <img
        src={image}
        alt={"profile"}
        className="w-11 h-11 rounded-full mr-3"
      />
      <div>
        <div className="flex items-center">
          <p className="text-sm font-medium pr-2">{name}</p>
          <p className="text-xs text-yt-gray">
            {new Date(uploaded?.toDate()).toString().slice(0, 25)}
          </p>
        </div>
        <p className="text-base pt-3 ">{comment}</p>
        <div className="flex py-3 justify-between w-36">
          <div className="flex">
            <BiLike size={22} className="cursor-pointer" />
            <p className="text-sm px-2 text-yt-gray">24</p>
          </div>
          <BiDislike size={22} className="cursor-pointer" />
          <p className="text-sm">Reply</p>
        </div>
      </div>
    </div>
  );
}
