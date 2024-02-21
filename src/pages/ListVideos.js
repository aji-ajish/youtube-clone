import React, { useEffect, useState } from "react";
import AdminSideBAr from "../components/AdminSideBAr";
import { collection, deleteDoc, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { FcEmptyTrash } from "react-icons/fc";

export default function ListVideos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "videos"));
    onSnapshot(q, (snapShot) => {
      setVideos(
        snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  }, []);

  const deleteVideoHandler = async (videoId) => {
    await deleteDoc(doc(db, "videos", videoId));
  };

  return (
    <>
      <AdminSideBAr />
      <div className="bg-yt-black  h-screen w-full px-72 py-12 flex justify-center">
        <div className="bg-yt-light-1 w-full h-full mt-10 pb-5">
          <h2 className="text-center pt-10 text-yt-white font-semibold text-3xl">
            Video List
          </h2>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
            <table className="w-[90%]  table-auto">
              <thead className="text-sm text-yt-light-black uppercase bg-yt-gray ">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3">
                    channel
                  </th>
                  <th scope="col" className="px-6 py-3">
                    description
                  </th>
                  <th scope="col" className="px-4 py-3">
                    duration
                  </th>
                  <th scope="col" className="px-6 py-3">
                    link
                  </th>
                  <th scope="col" className="px-4 py-3">
                    logo
                  </th>
                  <th scope="col" className="px-4 py-3">
                    subscribers
                  </th>
                  <th scope="col" className="px-6 py-3">
                    thumbnail
                  </th>
                  <th scope="col" className="px-6 py-3">
                    title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    uploadTime
                  </th>
                  <th scope="col" className="px-4 py-3">
                    views
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {videos.length === 0 ? (
                  <tr>
                    <td className="text-yt-white">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  videos.map((video, i) => (
                    <tr
                      className="odd:bg-yt-white  even:bg-yt-gray border-b"
                      key={i}
                    >
                      <td className="px-4 py-4">{i + 1}</td>
                      <td className="px-6 py-4">{video.channel}</td>
                      <td className="px-6 py-4">
                        {video.description.substr(0, 20)}...
                      </td>
                      <td className="px-4 py-4">{video.duration}</td>
                      <td className="px-6 py-4">
                        {video.link.substr(0, 20)}...
                      </td>
                      <td className="px-4 py-4">
                        <img
                          src={video.logo}
                          className="object-contain w-10 h-10 rounded-full"
                          alt=""
                        />
                      </td>
                      <td className="px-4 py-4">{video.subscribers}</td>
                      <td className="px-4 py-4">
                        <img
                          src={video.thumbnail}
                          className="object-contain w-10 h-10 "
                          alt=""
                        />
                      </td>
                      <td className="px-6 py-4">
                        {video.title.substr(0, 20)}...
                      </td>
                      <td className="px-6 py-4">{video.uploadTime}</td>
                      <td className="px-4 py-4">{video.views}</td>
                      <td className="px-6 py-4">
                        <Link
                          to="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          <FcEmptyTrash size={22}  onClick={()=>deleteVideoHandler(video.id)}/>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
