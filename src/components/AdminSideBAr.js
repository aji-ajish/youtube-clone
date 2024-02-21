import React from "react";
import { Md10K } from "react-icons/md";
import { FcVideoCall, FcVideoFile } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function AdminSideBAr() {
  // const [active, setActive] = useState("Home");
  return (
    <div className="yt-scrollbar scrollbar-hide w-60 bg-yt-black h-[calc(100vh-53px)] mt-14 fixed top-0 left-0 text-yt-white p-3 overflow-scroll">
      <div className="mb-4">
        <Link to="/admin/addvideo">
          <div
            className={`h-10 flex justify-start px-3 rounded-xl items-center cursor-pointer hover:bg-yt-light-black my-1`}
          >
            <span className="mr-5">
              <FcVideoCall size={23} />
            </span>
            <p className="p-2 text-sm font-medium">Add Video</p>
          </div>
        </Link>
        <Link to="/admin/listvideo">
          <div
            className={`h-10 flex justify-start px-3 rounded-xl items-center cursor-pointer hover:bg-yt-light-black my-1`}
          >
            <span className="mr-5">
              <FcVideoFile size={23} />
            </span>
            <p className="p-2 text-sm font-medium">List All Video</p>
          </div>
        </Link>
      </div>
      <hr className="text-yt-light-black my-2" />
    </div>
  );
}
