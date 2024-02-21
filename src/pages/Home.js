import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { CategoryItems } from "../static/data";
import { collection, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Link } from "react-router-dom";
import Video from "../components/Video";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/useSlice";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();

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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);

  return (
    <>
      <SideBar />
      <div className="w-[calc(100%-240px)] h-screen pt-16 bg-yt-black ml-60">
        <Link to="/admin/addvideo">Admin</Link>
        <div className="flex flex-row px-3 overflow-x-auto relative scrollbar-hide">
          {CategoryItems.map((item, i) => (
            <h2
              key={i}
              className="text-yt-white bg-yt-light font-normal text-sm py-2 px-4 break-keep whitespace-nowrap mr-3 cursor-pointer rounded-lg hover:bg-yt-light-1"
            >
              {item}
            </h2>
          ))}
        </div>
        <div className="pt-12 px-5 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-x-3 gap-y-8">
          {videos.length === 0 ? (
            <div className="h-[86vh]"></div>
          ) : (
            videos.map((video, i) => (
              <Link to={`/video/${video.id}`} key={video.id}>
                <Video {...video} />
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}
