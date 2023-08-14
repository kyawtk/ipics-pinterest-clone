import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import client from "../client";
import Spinner from "./Spinner";
import { categories } from "../utils/data";
const CreatePin = ({ user }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState("");
  const [wrongImageType, setWrongImageType] = useState(false);
  const [imageAsset, setImageAsset] = useState("");

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/jpg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/svg+xml"
    ) {
      setWrongImageType(false);

      setLoading(true);
      client.assets
        .upload("image", selectedFile, {
          type: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((asset) => {
          setImageAsset(asset);
          setLoading(false);
          console.log(asset);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    if (title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type: 'pin',
        title,
        about,
        destination,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        },
        category,
      };
      client.create(doc).then(() => {
        navigate('/');
      });
    } else {
      setFields(true);

      setTimeout(
        () => {
          setFields(false);
        },
        2000,
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      {fields && (
        <p className="text-red-500 text-xl mb-5 transition-all ease-in duration-150">
          Please fill in all the fields
        </p>
      )}
      <div className="flex lg:flex-row flex-col items-center bg-white lg:p-5 p-3 w-full lg:w-4/5">
        <div className="bg-secondaryColor p-3 felx flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && (
              <p className="text-red-500 text-xl mb-5 transition-all ease-in duration-150">
                Wrong Image Type
              </p>
            )}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full cursor-pointer">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Upload Image</p>
                  </div>
                  <p className="text-gray-500">
                    Use high quality jpg, svg,png, gif or Tiff less than 200kb
                  </p>
                </div>
                <input
                  type="file"
                  className="w-0 h-0"
                  onChange={uploadImage}
                  name="upload-Image"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="absolute inset-3 w-10 h-10 flex items-center justify-center hover:bg-red-500 rounded-full outline-none hover:shadow-md transition-all duration-150 ease-in-out text-black bg-secondaryColor p-2 cursor-pointer"
                >
                  <MdDelete onClick={() => setImageAsset(null)} />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 lg:mt-5 w-full ">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add Title "
            className="p-2 border-2 border-gray-300 w-full outline-none "
          />
          {user && (
            <div className="flex gap-3 my-2 items-center ">
              <img
                src={user.image}
                className="w-10 h-10 rounded-full"
                alt="user logo"
              />
              <p>{user.userName}</p>
            </div>
          )}
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="What is the pin about?"
            className="p-2 border-2 border-gray-300 w-full outline-none "
          />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Where is the pin going to?"
            className="p-2 border-2 border-gray-300 w-full outline-none "
          />
          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text:lg sm:text-xl">
                Choose Pin Category
              </p>
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option value="others" className="sm:text-bg bg-white">
                  Select Category
                </option>
                {categories.map((item) => (
                  <option
                  key={item.name}
                    className="text-base border-0 outline-none capitalize bg-white text-black "
                    value={item.name}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5">
              <button
                type="button"
                onClick={savePin}
                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
              >
                Save Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
