import { useState } from "react";
import client, { urlFor } from "../client";
import { Link, useNavigate } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdDownloadForOffline } from "react-icons/md";
import { BsArrowUpCircleFill, BsFillArrowUpCircleFill } from "react-icons/bs";
import { fetchUser } from "../utils/fetchUser";
const Pin = ({ pin }) => {
  const { postedBy, image, title, _id, save, destination } = pin;
  const [postHovered, setPostHovered] = useState(false);
  const navigate = useNavigate();
  const user = fetchUser();

  let alreadySaved = !!pin?.save?.filter(
    (item) => item?.postedBy?._id === user?.sub
  )?.length;
  const savePin = async (_id) => {
    if (!alreadySaved) {
      client
        .patch(_id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: `${user?.sub}-${_id}`,
            userID: user.sub,
            postedBy: {
              _type: "postedBy",
              _ref: user.sub,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };
  return (
    <div className="m-2 ">
      <div
        className="relative cursor-zoom-in  w-auto hover:shadow-lg overflow-hidden duration-500 ease-in-out transition-all"
        onClick={() => navigate(`/pin-details/${_id}`)}
        onMouseLeave={() => setPostHovered(false)}
        onMouseEnter={() => setPostHovered(true)}
      >
        <img
          src={urlFor(image).width(250).url()}
          alt="image"
          className="w-full h-full rounded-md"
        />
        {postHovered && (
          <div className="absolute top-0 w-full h-full flex flex-col justify-between z-30">
            <div className="flex items-center justify-between">
              <div className="flex gap-3 ">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  onClick={(e) => e.stopPropagation()}
                  download
                  className="bg-gray-500 p-2 rounded-lg hover:bg-gray-800 transition-all duration-100 ease-in-out"
                >
                  <MdDownloadForOffline className="text-2xl text-white"></MdDownloadForOffline>
                </a>
              </div>

              {alreadySaved ? (
                <button className="bg-red-500 text-white rounded-lg opacity-70 hover:opacity-100 font-bold px-5 py-1 text-base hover:shadow-md outline-none">
                  {save?.length}Saved
                </button>
              ) : (
                <button
                  className="bg-red-500 text-white rounded-lg opacity-70 hover:opacity-100 font-bold px-5 py-1 text-base hover:shadow-md outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                >
                  Save
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-4 w-full">
              {destination && (
                <a className="items-center p-2 flex rounded-lg opacity-70 hover:opacity-100 hover:shadow-md font-bold text-base bg-white ">
                  <BsArrowUpCircleFill> </BsArrowUpCircleFill>
                  {destination.slice(8, 20)}
                </a>
              )}
              {postedBy?._id === user?.sub && (
                <button
                  className="items-center p-2 flex rounded-full opacity-70 hover:opacity-100 hover:shadow-md font-bold text-base bg-white "
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                >
                  <AiTwotoneDelete></AiTwotoneDelete>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`/user-profile/${postedBy?._id}`}
        className="flex gap-3 items-center my-3 mx-2"
      >
        <img src={postedBy?.image} alt="user profile" className="w-8 rounded-full"/>
        <p className="font-semibold">{postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;
