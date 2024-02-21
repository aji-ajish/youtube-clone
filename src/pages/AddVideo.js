import React, { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import AdminSideBAr from "../components/AdminSideBAr";

export default function AddVideo() {
  const initialValues = {
    channel: "",
    description: "",
    duration: "",
    link: "",
    logo: "",
    subscribers: "",
    thumbnail: "",
    title: "",
    uploadTime: "",
    views: "",
  };
  const [data, setData] = useState(initialValues);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleAddData = async (e) => {
    e.preventDefault();
    const requiredFields = [
      "title",
      "link",
      "thumbnail",
      "description",
      "duration",
      "uploadTime",
      "views",
      "channel",
      "logo",
      "subscribers",
    ];

    const isEmpty = requiredFields.some((field) => !data[field].trim());

    if (isEmpty) {
      // Handle the case where any required field is empty
      alert("Please fill in all required fields.");
      return;
    } else {
      await addDoc(collection(db, "videos"), data);
    }

    // setData(initialValues);
  };

  return (
    <>
      <AdminSideBAr />

      <div className="bg-yt-black  h-[calc(100%-240px)] w-full px-72 py-12 flex justify-center">
        <div className="bg-yt-light-1 w-full h-full mt-10 pb-5">
          <h2 className="text-center pt-10 text-yt-white font-semibold text-3xl">
            Add Video
          </h2>
          <div className="flex  pt-4 justify-center ">
            <form
              className="flex  pt-4 w-[500px] flex-col space-y-5"
              onSubmit={handleAddData}
            >
              <input
                type="text"
                placeholder="Enter Video Title"
                className="bg-yt-light-black px-2 py-3 rounded-lg border-b border-b-yt-white outline-none text-sm p-1 w-full text-yt-white"
                value={data.title}
                onChange={handleChange}
                name="title"
              />
              <div>
              <input
                type="text"
                placeholder="Enter Video Link"
                className="bg-yt-light-black px-2 py-3 rounded-lg border-b border-b-yt-white outline-none text-sm p-1 w-full text-yt-white"
                value={data.link}
                onChange={handleChange}
                name="link"
              />
              <span className="text-yt-gray text-xs">ex:"https://www.youtube.com/watch?v=ja7NGg7kKH4" &rarr; "ja7NGg7kKH4" </span>
              </div>
              <input
                type="text"
                placeholder="Enter Video Thumbnail URL"
                className="bg-yt-light-black px-2 py-3 rounded-lg border-b border-b-yt-white outline-none text-sm p-1 w-full text-yt-white"
                value={data.thumbnail}
                onChange={handleChange}
                name="thumbnail"
              />
              <input
                type="text"
                placeholder="Enter Video Description"
                className="bg-yt-light-black px-2 py-3 rounded-lg border-b border-b-yt-white outline-none text-sm p-1 w-full text-yt-white"
                value={data.description}
                onChange={handleChange}
                name="description"
              />
              <input
                type="text"
                placeholder="Enter Video Duration"
                className="bg-yt-light-black px-2 py-3 rounded-lg border-b border-b-yt-white outline-none text-sm p-1 w-full text-yt-white"
                value={data.duration}
                onChange={handleChange}
                name="duration"
              />
              <input
                type="text"
                placeholder="Enter Video UploadTime"
                className="bg-yt-light-black px-2 py-3 rounded-lg border-b border-b-yt-white outline-none text-sm p-1 w-full text-yt-white"
                value={data.uploadTime}
                onChange={handleChange}
                name="uploadTime"
              />
              <input
                type="text"
                placeholder="Enter Total Views"
                className="bg-yt-light-black px-2 py-3 rounded-lg border-b border-b-yt-white outline-none text-sm p-1 w-full text-yt-white"
                value={data.views}
                onChange={handleChange}
                name="views"
              />
              <input
                type="text"
                placeholder="Enter Channel Name"
                className="bg-yt-light-black px-2 py-3 rounded-lg border-b border-b-yt-white outline-none text-sm p-1 w-full text-yt-white"
                value={data.channel}
                onChange={handleChange}
                name="channel"
              />
              <input
                type="text"
                placeholder="Enter Channel Logo URL"
                className="bg-yt-light-black px-2 py-3 rounded-lg border-b border-b-yt-white outline-none text-sm p-1 w-full text-yt-white"
                value={data.logo}
                onChange={handleChange}
                name="logo"
              />
              <input
                type="text"
                placeholder="Enter Total Subscribers"
                className="bg-yt-light-black px-2 py-3 rounded-lg border-b border-b-yt-white outline-none text-sm p-1 w-full text-yt-white"
                value={data.subscribers}
                onChange={handleChange}
                name="subscribers"
              />
              <button className="bg-[#3ee3a2] mx-auto w-1/3 py-2 rounded-2xl text-yt-light font-medium text-base">
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
