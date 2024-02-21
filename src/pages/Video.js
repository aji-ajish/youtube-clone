import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { query, doc, onSnapshot, collection, addDoc } from "firebase/firestore";
import { auth, db, timeStamp } from "../firebase";
import { AiFillLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { HiDotsHorizontal, HiDownload } from "react-icons/hi";
import { MdOutlineSort } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "../slices/useSlice";
import { onAuthStateChanged } from "firebase/auth";
import Comment from "../components/Comment";
import { CategoryItems } from "../static/data";
import RecommendVideo from "../components/RecommendVideo";

export default function Video() {
  const [videos, setVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [data, setData] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(getUser);

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
    if (id) {
      const q = query(doc(db, "videos", id));
      onSnapshot(q, (snapShort) => {
        setData(snapShort.data());
      });
      const commentQuery = query(collection(db, "videos", id, "comments"));
      onSnapshot(commentQuery, (snapShort) => {
        setComments(
          snapShort.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    }
  }, [id]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });
  }, []);

  const addComment = async (e) => {
    e.preventDefault();
    let commentData = {
      image: user.photoURL,
      name: user.displayName,
      comment,
      uploaded: timeStamp,
    };
    if (id) {
      await addDoc(collection(db, "videos", id, "comments"), commentData);
      setComment("");
    }
  };

  return (
    <div className="py-20 px-9 bg-yt-black flex flex-row h-full">
      <div className="left flex-1">
        <div className="flex justify-center">
          <iframe
            src={`https://www.youtube.com/embed/${data?.link}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-[850px] h-[700px] flex-1"
          ></iframe>
        </div>
        <h2 className="lext-lg text-yt-white font-semibold mt-3 mb-1 ">
          {data?.title}
        </h2>
        <div className="flex">
          <div className="flex items-center">
            <img
              src={data?.logo}
              alt={data?.channel}
              className="rounded-full w-10 h-10"
            />
            <div className="px-3">
              <h3 className="text-yt-white text-sm font-medium">
                {data?.channel && data?.channel.length <= 15
                  ? data?.channel
                  : `${data?.channel.substr(0, 10)}...`}
              </h3>
              <p className="text-sm text-yt-gray">
                {data?.subscribers} Subscribers
              </p>
            </div>
            <button className="bg-yt-white py-2 px-3 rounded-lg text-sm font-medium ml-3">
              Subscribe
            </button>
            <div className="flex pl-28">
              <div className="flex px-3 bg-yt-light-black items-center rounded-2xl h-10 mx-1 hover:bg-yt-light-1">
                <div className="flex px-3 items-center border-r-2 border-r-yt-light-1 cursor-pointer">
                  <AiFillLike className="text-2xl text-yt-white" />
                  <p className="text-yt-white pl-2 pr-3 text-sm font-semibold">
                    300K
                  </p>
                </div>
                <div className="pl-4 pr-5 cursor-pointer">
                  <BiDislike className="text-[22px] font-extralight text-yt-white" />
                </div>
              </div>
              <div className="flex bg-yt-light-black items-center rounded-2xl h-10 mx-1 cursor-pointer hover:bg-yt-light-1">
                <div className="flex px-3 items-center cursor-pointer">
                  <RiShareForwardLine className="text-2xl text-yt-white font-thin" />
                  <p className="text-yt-white pl-2 pr-3 text-sm font-semibold">
                    Share
                  </p>
                </div>
              </div>
              <div className="flex bg-yt-light-black items-center rounded-2xl h-10 mx-1 cursor-pointer hover:bg-yt-light-1">
                <div className="flex px-3 items-center cursor-pointer">
                  <HiDownload className="text-2xl text-yt-white font-thin" />
                  <p className="text-yt-white pl-2 pr-3 text-sm font-semibold">
                    Download
                  </p>
                </div>
              </div>
              <div className="flex bg-yt-light-black items-center hover:bg-yt-light-1 cursor-pointer rounded-full justify-center w-10 h-10 text-yt-white">
                <HiDotsHorizontal />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl bg-yt-light-black mt-4 px-3 py-4 leading-6 rounded-2xl text-sm text-yt-white ">
          <div className="flex">
            <p className="font-medium pr-3">
              {data?.views}
              <span className="pl-1 text-xs">Views</span>
            </p>
            <p className="font-medium pr-3">{data?.uploadTime}</p>
          </div>
          <spam className="text-center font-medium">{data?.description}</spam>
        </div>
        <div className="text-yt-white mt-5">
          <div className="flex items-center">
            <h1> {comments.length} Comments</h1>
            <div className="flex items-center mx-10">
              <MdOutlineSort size={30} className="mx-3" />
              <h5>Sort by</h5>
            </div>
          </div>
          {user && (
            <form
              className="flex w-[800px] pt-4 item-start"
              onSubmit={addComment}
            >
              <img
                src={user?.photoURL}
                alt="profile"
                className="rounded-full mr-3 h-12 w-12"
              />
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="bg-[transparent] border-b border-b-yt-light-black outline-none text-sm p-1 w-full"
              />
            </form>
          )}
          <div className="mt-4">
            {comments.map((item, i) => (
              <Comment key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
      <div className="right px-3 overflow-y-hidden flex-[0.4]">
        <div>
          <div className="flex flex-row px-3 overflow-x-scroll relative scrollbar-hide">
            {CategoryItems.map((item, i) => (
              <h2
                key={i}
                className="text-yt-white bg-yt-light font-normal text-sm py-2 px-4 break-keep whitespace-nowrap mr-3 cursor-pointer rounded-lg hover:bg-yt-light-1"
              >
                {item}
              </h2>
            ))}
          </div>
        </div>
        <div className="pt-8 pl-5">
          {videos.map((video, i) => {
            if (video.id !== id) {
              return (
                <Link key={i} to={`/video/${video.id}`}>
                  <RecommendVideo {...video} />
                </Link>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
