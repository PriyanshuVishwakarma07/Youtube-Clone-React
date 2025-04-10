import React, { useState } from "react";
import useChannelDetails from "../utils/useChannelDetails";
import { formatTimeAgo, formatViewCount } from "./VideoCard";
import { IoClose } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import useChannelVideos from "../utils/useChannelVideos";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import VideoCard from "./VideoCard";
import { useSelector } from "react-redux";

const ChannelPage = () => {
  const [searchParams] = useSearchParams();
  const channelUrl = searchParams.get("c");

  const [subscribe, setSubscribe] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const channelVideos = useChannelVideos(channelUrl);

  const channelDetails = useChannelDetails(channelUrl);
  const isDarkTheme = useSelector((store) => store.app.isDarkTheme);

  if (!channelDetails) return null;
  if (channelVideos === null) {
    return <div>LOADING</div>;
  }

  const { snippet, statistics } = channelDetails;
  const { country, description, publishedAt, thumbnails, title, customUrl } =
    snippet;
  const { subscriberCount, videoCount, viewCount } = statistics;

  const truncatedDescription =
    description?.length > 100
      ? `${description.substring(0, 100)}...`
      : description;

  return (
    <div className="py-4 flex flex-col md:ml-36 mx-4 gap-6">
      <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
        <img
          src={thumbnails?.medium?.url}
          alt="Channel Thumbnail"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
        />
        <div
          className={`flex-1 text-center md:text-left ${
            isDarkTheme ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <h1 className="text-xl md:text-2xl font-bold">{title}</h1>
          <div className="flex justify-center items-center md:justify-start gap-2 mt-1 text-sm text-gray-600">
            <p
              className={`font-semibold  text-[16px] ${
                isDarkTheme ? " text-white" : " text-black"
              }`}
            >
              {customUrl}
            </p>
            <p>{formatViewCount(subscriberCount)} subscribers</p>
            <p>{formatViewCount(videoCount)} videos</p>
          </div>
          <p className="mt-2 text-sm md:text-base">
            {truncatedDescription}
            {description?.length > 100 && (
              <button
                onClick={() => setShowDescriptionModal(true)}
                className="ml-1 text-blue-500 hover:underline"
              >
                More
              </button>
            )}
          </p>
          <button
            onClick={() => setSubscribe(!subscribe)}
            className={`mt-3 px-4 py-2 rounded-full text-[18px] font-semibold ${
              subscribe ? "bg-gray-200 text-black" : "bg-red-600 text-white"
            }`}
          >
            {subscribe ? "Subscribed" : "Subscribe"}
          </button>
        </div>
      </div>

      {showDescriptionModal && (
        <div className="fixed md:top-24 w-[280px] md:w-[400px] top-32 left-[20px] md:h-[400px] h-[300px] md:left-[35%] bg-white border-[2px] rounded-[10px] flex items-center overflow-y-scroll [&::-webkit-scrollbar]:hidden  justify-center z-50 p-4">
          <div className="bg-white h-full rounded-lg max-w-md w-full md:px-6 px-2 py-1">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-2">About {title}</h2>
              <div onClick={() => setShowDescriptionModal(false)}>
                <IoClose />
              </div>
            </div>

            <p className="whitespace-pre-line mb-2 text-sm">{description}</p>
            <div className="space-y-2 text-sm text-gray-600 pb-2">
              {country && (
                <p>
                  <span className="font-semibold">Country:</span> {country}
                </p>
              )}
              <p>
                <span className="font-semibold">Joined:</span>{" "}
                {formatTimeAgo(publishedAt)}
              </p>
              <p>
                <span className="font-semibold">Subscribers:</span>{" "}
                {formatViewCount(subscriberCount)}
              </p>
              <p>
                <span className="font-semibold">Total Views:</span>{" "}
                {formatViewCount(viewCount)}
              </p>
              <p>
                <span className="font-semibold">Videos:</span>{" "}
                {formatViewCount(videoCount)}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="grid max-w-[87%] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 py-4 px-4 mx-5 md:mx-0 md:px-0">
        {channelVideos.map((video) => (
          <Link key={video?.etag} to={"/watch?v=" + video.id}>
            <VideoCard info={video} flag={true} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChannelPage;
