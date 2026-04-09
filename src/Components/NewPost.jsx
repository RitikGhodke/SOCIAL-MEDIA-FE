import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPost } from "../Utils/UserSlice";
import toast from "react-hot-toast";
import { ImagePlus, X } from "lucide-react";

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const NewPost = () => {
  const [temp, setTemp] = useState("");
  const [location, setLocation] = useState("");
  const [media, setMedia] = useState([]);
  const [enableBtn, setEnableBtn] = useState(true)
  const nav = useNavigate()
  const dispatch = useDispatch()

  async function postBtnHandler() {
    try {
      setEnableBtn(false)
      const base64Media = await Promise.all(media.map((item) => fileToBase64(item.item)))
      const res = await axios.post(
        import.meta.env.VITE_DOMAIN + "/api/posts/create",
        // { caption: temp, location: , media: base64Media },
        { caption: temp, location, media: base64Media },
        { withCredentials: true }
      )
      if (res.status == 201) {
        dispatch(addPost(res.data.data))
        nav("/profile")
      }
    } catch (error) {
      toast.error(error.response.data.error)
    } finally {
      setEnableBtn(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 px-4 py-6 pb-24 md:pb-6">
          <div className="max-w-2xl mx-auto space-y-4">

            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-800 text-center md:text-left">
              ✨ Create New Post
            </h2>

            {/* Upload Area */}
            <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
              
              {/* File Input */}
              <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-pink-300 rounded-xl cursor-pointer hover:bg-pink-50 transition">
                <ImagePlus className="text-pink-400 mb-2" size={32} />
                <p className="text-sm text-gray-500 font-medium">Tap to upload images</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG supported</p>
                <input
                  onChange={(e) => {
                    const files = Array.from(e.target.files)
                    const arr = files.map((item) => ({
                      item,
                      preview: URL.createObjectURL(item),
                    }))
                    setMedia([...media, ...arr])
                  }}
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  className="hidden"
                />
              </label>

              {/* Preview Grid */}
              {media.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {media.map((item, index) => (
                    <div key={index} className="relative w-full h-24 md:h-32 rounded-xl overflow-hidden border border-gray-200 group">
                      <img
                        src={item.preview}
                        alt={`preview-${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => setMedia(media.filter((_, i) => i !== index))}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-90 hover:opacity-100 transition"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Caption */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Caption
                </label>
                <input
                  value={temp}
                  onChange={(e) => setTemp(e.target.value)}
                  type="text"
                  placeholder="Write something..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              
 <div>
  <label className="block text-sm font-medium text-gray-600 mb-1">
    Location
  </label>
  <input
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    type="text"
    placeholder="Add location... (optional)"
    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
  />
</div>

              {/* Post Button */}
              {enableBtn ? (
                <button
                  onClick={postBtnHandler}
                  disabled={media.length === 0}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post 🚀
                </button>
              ) : (
                <button className="w-full bg-gray-300 text-gray-600 py-3 rounded-xl font-semibold cursor-not-allowed flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                  Uploading...
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;