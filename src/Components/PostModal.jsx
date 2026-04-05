// import axios from "axios"
// import { X, Heart, MessageCircle } from "lucide-react"
// import { useEffect, useState } from "react"

// const PostModal = ({ setUseModal, post }) => {
//   const [currMedia, setCurrMedia] = useState(0)
//   const [comment, setComment] = useState("")
//   const [allComments, setAllComments] = useState(post.comments || [])
//   console.log(allComments)
//   const [replyInputs, setReplyInputs] = useState({}) // toggles reply input
//   const [viewReplies, setViewReplies] = useState({}) // toggles reply view
//   const [likedComments, setLikedComments] = useState(
//     Object.fromEntries((post.comments || []).map((c) => [c._id, c.isLikedByMe || false]))
//   )
//   const[replyText, setReplyText] = useState("")

// //   console.log(likedComments)

//   useEffect(() => {
//     const scrollY = window.scrollY
//     document.body.style.position = "fixed"
//     document.body.style.top = `-${scrollY}px`
//     document.body.style.width = "100%"

//     return () => {
//       document.body.style.position = ""
//       document.body.style.top = ""
//       window.scrollTo(0, scrollY)
//     }
//   }, [])

//   const handleAddComment = async () => {
//     if (!comment.trim()) return
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_DOMAIN}/api/comments/${post._id}`,
//         { text: comment },
//         { withCredentials: true }
//       )
//       setComment("")
//       setAllComments([...allComments, res.data.data])
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   const handleToggleReply = (commentId) => {
//     setReplyInputs((prev) => ({
//       ...prev,
//       [commentId]: !prev[commentId],
//     }))
//   }

//   const handleToggleViewReplies = (commentId) => {
//     setViewReplies((prev) => ({
//       ...prev,
//       [commentId]: !prev[commentId],
//     }))
//   }

//   const handleToggleLike = async (commentId) => {
//     const isCurrentlyLiked = likedComments[commentId]

//     // Optimistic UI update
//     setLikedComments((prev) => ({
//       ...prev,
//       [commentId]: !isCurrentlyLiked,
//     }))

//     try {
//       if (isCurrentlyLiked) {
//         const res = await axios.patch(`${import.meta.env.VITE_DOMAIN}/api/comments/${post._id}/${commentId}/unlike`,
//           {},
//           { withCredentials: true }
//         )
//         console.log("Unliked comment:", res.data)

//         setAllComments((prev) =>
//           prev.map((c) =>
//             c._id === commentId ? { ...c, likesCount: (c.likesCount || 1) - 1 } : c
//           )
//         )
//       } else {
//         const res = await axios.post(`${import.meta.env.VITE_DOMAIN}/api/comments/${post._id}/${commentId}/like`,
//           {},
//           { withCredentials: true }
//         )
//         console.log("Liked comment:", res.data)

//         setAllComments((prev) =>
//           prev.map((c) =>
//             c._id === commentId ? { ...c, likesCount: (c.likesCount || 0) + 1 } : c
//           )
//         )
//       }
//     } catch (err) {
//       console.error("Error liking comment:", err)
//       // revert
//       setLikedComments((prev) => ({
//         ...prev,
//         [commentId]: isCurrentlyLiked,
//       }))
//     }
//   }

//   return (
//     <div className="h-[100vh] w-[100vw] bg-gray-400/70 fixed left-0 top-0 z-50 flex justify-center items-center">
//       <div className="h-[70vh] w-[70vw] bg-white relative rounded-2xl overflow-hidden flex">
//         {/* Close Button */}
//         <X
//           onClick={() => setUseModal(false)}
//           className="absolute right-3 top-3 cursor-pointer hover:scale-110 transition-transform z-10 text-white drop-shadow-md"
//         />

//         {/* Left: Media Section */}
//         <div className="h-full w-[70%] relative bg-black">
//           <aside className="absolute top-0 left-0 flex items-center p-3 w-full bg-gradient-to-b from-black/70 to-transparent z-10">
//             <img
//               className="h-[50px] w-[50px] rounded-full object-cover border-2 border-white"
//               src={post.author.profilePicture}
//               alt={post.author.username}
//             />
//             <p className="ml-3 text-white font-semibold">@{post.author.username}</p>
//           </aside>

//           {/* Carousel */}
//           {post.media.length > 1 && (
//             <>
//               <i
//                 onClick={() =>
//                   setCurrMedia(currMedia === 0 ? post.media.length - 1 : currMedia - 1)
//                 }
//                 className="fa-solid fa-square-caret-left text-3xl absolute left-3 top-1/2 -translate-y-1/2 text-white/80 cursor-pointer hover:text-white"
//               ></i>
//               <i
//                 onClick={() =>
//                   setCurrMedia(currMedia === post.media.length - 1 ? 0 : currMedia + 1)
//                 }
//                 className="fa-solid fa-square-caret-right text-3xl absolute right-3 top-1/2 -translate-y-1/2 text-white/80 cursor-pointer hover:text-white"
//               ></i>
//             </>
//           )}

//           <img
//             className="h-full w-full object-cover"
//             src={post.media[currMedia]}
//             alt="Post media"
//           />
//         </div>

//         {/* Right: Comments Section */}
//         <div className="h-full w-[30%] flex flex-col border-l border-gray-200">
//           {/* Caption */}
//           <div className="p-4 border-b border-gray-200">
//             <p className="text-gray-800 text-sm">{post.caption}</p>
//           </div>

//           {/* Comments */}
//           <div className="flex-1 overflow-y-auto p-4 space-y-4">
//             {allComments.length === 0 ? (
//               <p className="text-gray-400 text-sm text-center mt-10">
//                 No comments yet. Be the first!
//               </p>
//             ) : (
//               allComments.map((item) => (
                
//                 <div key={item._id} className="space-y-1">
//                   <div className="flex items-start space-x-3">
//                     <img
//                       src={item.author?.profilePicture || "/default-avatar.png"}
//                       alt={item.author?.username || "user"}
//                       className="h-9 w-9 rounded-full object-cover"
//                     />
//                     <div className="flex-1">
//                       <p className="text-sm font-semibold">
//                         {item.author?.username || "Unknown"}
//                       </p>
//                       <p className="text-gray-700 text-sm">{item.text}</p>

//                       {/* Actions */}
//                       <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
//                         <button
//                           onClick={() => handleToggleLike(item._id)}
//                           className="flex items-center gap-1 hover:text-red-500 transition-colors"
//                         >
//                           <Heart
//                             size={14}
//                             fill={likedComments[item._id] ? "red" : "none"}
//                             className={
//                               likedComments[item._id]
//                                 ? "text-red-500"
//                                 : "text-gray-400"
//                             }
//                           />
//                           <span>Like</span>
//                           {item.likesCount > 0 && (
//                             <span className="ml-1 text-[11px] text-gray-500">
//                               {item.likesCount}
//                             </span>
//                           )}
//                         </button>

//                         <button
//                           onClick={() => handleToggleReply(item._id)}
//                           className="flex items-center gap-1 hover:text-black transition-colors"
//                         >
//                           <MessageCircle size={14} />
//                           Reply
//                         </button>

//                         {item.reply?.length > 0 && (
//                           <button
//                             onClick={() => handleToggleViewReplies(item._id)}
//                             className="hover:text-black"
//                           >
//                             {viewReplies[item._id]
//                               ? "Hide replies"
//                               : `View ${item.reply.length} replies`}
//                           </button>
//                         )}
//                       </div>

//                       {/* Reply Input */}
//                       {replyInputs[item._id] && (
//                         <div className="mt-2 flex gap-2">
//                           <input
//                           value={replyText}
//                           onChange={(e) => {
//                             setReplyText(e.target.value)
//                           }}
//                             type="text"
//                             placeholder="Write a reply..."
//                             className="flex-1 border border-gray-300 rounded-full px-3 py-1 text-xs outline-none"
//                           />
//                           <button onClick={() => {
//                             async function replyCOmment()
//                             {
//                                 const res = await axios.post( `${import.meta.env.VITE_DOMAIN}/api/comments/${post._id}/${item._id}/reply`, {text : replyText}, {withCredentials : true})
//                                 console.log(res)
//                                 setReplyText("")
//                                 const newCOmmentsArray = allComments.map((i) => {
//                                     if(i._id != item._id) // is this the comment jispe reply kiya gya hai ?
//                                     {
//                                         return i
//                                     }
//                                     else
//                                     {
//                                         i.reply.push(res.data.data)
//                                         return item
//                                     }
//                                 })
//                                 setAllComments(newCOmmentsArray)
//                             }
//                             replyCOmment()
//                           }} className="text-xs px-2 py-1 bg-black text-white rounded-full hover:bg-gray-800">
//                             Reply
//                           </button>
//                         </div>
//                       )}

//                       {/* Replies */}
//                       {viewReplies[item._id] && item.reply?.length > 0 && (
//                         <div className="mt-2 space-y-2 pl-6 border-l border-gray-200">
//                           {item.reply.map((rep, i) => (
//                             <div key={i} className="flex items-start gap-2">
//                               <img
//                                 src={rep.author?.profilePicture || "/default-avatar.png"}
//                                 className="h-7 w-7 rounded-full object-cover"
//                               />
//                               <div>
//                                 <p className="text-xs font-semibold">
//                                   {rep.author?.username || "User"}
//                                 </p>
//                                 <p className="text-xs text-gray-700">{rep.text}</p>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Add Comment */}
//           <div className="p-4 border-t border-gray-200 flex gap-2">
//             <input
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               type="text"
//               placeholder="Add a comment..."
//               className="flex-1 border border-gray-300 rounded-full px-3 py-1 text-sm outline-none focus:ring-1 focus:ring-gray-400"
//             />
//             <button
//               onClick={handleAddComment}
//               className="px-3 py-1 bg-black text-white text-sm rounded-full hover:bg-gray-800 disabled:opacity-50"
//               disabled={!comment.trim()}
//             >
//               Post
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PostModal









// import axios from "axios"
// import { X, Heart, MessageCircle } from "lucide-react"
// import { useEffect, useState } from "react"

// const PostModal = ({ setUseModal, post }) => {
//   const [currMedia, setCurrMedia] = useState(0)
//   const [comment, setComment] = useState("")
//   const [allComments, setAllComments] = useState(post.comments || [])
//   const [replyInputs, setReplyInputs] = useState({})
//   const [viewReplies, setViewReplies] = useState({})
//   const [likedComments, setLikedComments] = useState(
//     Object.fromEntries((post.comments || []).map((c) => [c._id, c.isLikedByMe || false]))
//   )
//   const [replyText, setReplyText] = useState("")
//   const [showComments, setShowComments] = useState(false)

//   useEffect(() => {
//     const scrollY = window.scrollY
//     document.body.style.position = "fixed"
//     document.body.style.top = `-${scrollY}px`
//     document.body.style.width = "100%"
//     return () => {
//       document.body.style.position = ""
//       document.body.style.top = ""
//       window.scrollTo(0, scrollY)
//     }
//   }, [])

//   const handleAddComment = async () => {
//     if (!comment.trim()) return
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_DOMAIN}/api/comments/${post._id}`,
//         { text: comment },
//         { withCredentials: true }
//       )
//       setComment("")
//       setAllComments([...allComments, res.data.data])
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   const handleToggleReply = (commentId) => {
//     setReplyInputs((prev) => ({ ...prev, [commentId]: !prev[commentId] }))
//   }

//   const handleToggleViewReplies = (commentId) => {
//     setViewReplies((prev) => ({ ...prev, [commentId]: !prev[commentId] }))
//   }

//   const handleToggleLike = async (commentId) => {
//     const isCurrentlyLiked = likedComments[commentId]
//     setLikedComments((prev) => ({ ...prev, [commentId]: !isCurrentlyLiked }))
//     try {
//       if (isCurrentlyLiked) {
//         await axios.patch(
//           `${import.meta.env.VITE_DOMAIN}/api/comments/${post._id}/${commentId}/unlike`,
//           {},
//           { withCredentials: true }
//         )
//         setAllComments((prev) =>
//           prev.map((c) => c._id === commentId ? { ...c, likesCount: (c.likesCount || 1) - 1 } : c)
//         )
//       } else {
//         await axios.post(
//           `${import.meta.env.VITE_DOMAIN}/api/comments/${post._id}/${commentId}/like`,
//           {},
//           { withCredentials: true }
//         )
//         setAllComments((prev) =>
//           prev.map((c) => c._id === commentId ? { ...c, likesCount: (c.likesCount || 0) + 1 } : c)
//         )
//       }
//     } catch (err) {
//       setLikedComments((prev) => ({ ...prev, [commentId]: isCurrentlyLiked }))
//     }
//   }

//   const CommentsSection = () => (
//     <div className="h-full flex flex-col">
//       {/* Caption */}
//       <div className="p-3 border-b border-gray-200">
//         <p className="text-gray-800 text-sm">{post.caption}</p>
//       </div>

//       {/* Comments */}
//       <div className="flex-1 overflow-y-auto p-3 space-y-4">
//         {allComments.length === 0 ? (
//           <p className="text-gray-400 text-sm text-center mt-10">
//             No comments yet. Be the first!
//           </p>
//         ) : (
//           allComments.map((item) => (
//             <div key={item._id} className="space-y-1">
//               <div className="flex items-start space-x-2">
//                 <img
//                   src={item.author?.profilePicture || "/default-avatar.png"}
//                   alt={item.author?.username || "user"}
//                   className="h-8 w-8 rounded-full object-cover flex-shrink-0"
//                 />
//                 <div className="flex-1">
//                   <p className="text-xs font-semibold">{item.author?.username || "Unknown"}</p>
//                   <p className="text-gray-700 text-xs">{item.text}</p>

//                   {/* Actions */}
//                   <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
//                     <button
//                       onClick={() => handleToggleLike(item._id)}
//                       className="flex items-center gap-1 hover:text-red-500 transition-colors"
//                     >
//                       <Heart
//                         size={12}
//                         fill={likedComments[item._id] ? "red" : "none"}
//                         className={likedComments[item._id] ? "text-red-500" : "text-gray-400"}
//                       />
//                       <span>Like</span>
//                       {item.likesCount > 0 && (
//                         <span className="text-[10px] text-gray-500">{item.likesCount}</span>
//                       )}
//                     </button>

//                     <button
//                       onClick={() => handleToggleReply(item._id)}
//                       className="flex items-center gap-1 hover:text-black transition-colors"
//                     >
//                       <MessageCircle size={12} />
//                       Reply
//                     </button>

//                     {item.reply?.length > 0 && (
//                       <button onClick={() => handleToggleViewReplies(item._id)} className="hover:text-black">
//                         {viewReplies[item._id] ? "Hide" : `${item.reply.length} replies`}
//                       </button>
//                     )}
//                   </div>

//                   {/* Reply Input */}
//                   {replyInputs[item._id] && (
//                     <div className="mt-2 flex gap-2">
//                       <input
//                         value={replyText}
//                         onChange={(e) => setReplyText(e.target.value)}
//                         type="text"
//                         placeholder="Write a reply..."
//                         className="flex-1 border border-gray-300 rounded-full px-3 py-1 text-xs outline-none"
//                       />
//                       <button
//                         onClick={() => {
//                           async function replyComment() {
//                             const res = await axios.post(
//                               `${import.meta.env.VITE_DOMAIN}/api/comments/${post._id}/${item._id}/reply`,
//                               { text: replyText },
//                               { withCredentials: true }
//                             )
//                             setReplyText("")
//                             const newCommentsArray = allComments.map((i) => {
//                               if (i._id != item._id) return i
//                               else { i.reply.push(res.data.data); return item }
//                             })
//                             setAllComments(newCommentsArray)
//                           }
//                           replyComment()
//                         }}
//                         className="text-xs px-2 py-1 bg-black text-white rounded-full hover:bg-gray-800"
//                       >
//                         Reply
//                       </button>
//                     </div>
//                   )}

//                   {/* Replies */}
//                   {viewReplies[item._id] && item.reply?.length > 0 && (
//                     <div className="mt-2 space-y-2 pl-4 border-l border-gray-200">
//                       {item.reply.map((rep, i) => (
//                         <div key={i} className="flex items-start gap-2">
//                           <img
//                             src={rep.author?.profilePicture || "/default-avatar.png"}
//                             className="h-6 w-6 rounded-full object-cover"
//                           />
//                           <div>
//                             <p className="text-xs font-semibold">{rep.author?.username || "User"}</p>
//                             <p className="text-xs text-gray-700">{rep.text}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Add Comment */}
//       <div className="p-3 border-t border-gray-200 flex gap-2">
//         <input
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           type="text"
//           placeholder="Add a comment..."
//           className="flex-1 border border-gray-300 rounded-full px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-gray-400"
//         />
//         <button
//           onClick={handleAddComment}
//           className="px-3 py-1 bg-black text-white text-sm rounded-full hover:bg-gray-800 disabled:opacity-50"
//           disabled={!comment.trim()}
//         >
//           Post
//         </button>
//       </div>
//     </div>
//   )

//   return (
//     <div className="h-[100vh] w-[100vw] bg-gray-400/70 fixed left-0 top-0 z-50 flex justify-center items-center p-2 md:p-0">
      
//       {/* ✅ DESKTOP — side by side */}
//       <div className="hidden md:flex h-[80vh] w-[75vw] bg-white relative rounded-2xl overflow-hidden">
//         <X
//           onClick={() => setUseModal(false)}
//           className="absolute right-3 top-3 cursor-pointer hover:scale-110 transition-transform z-10 text-white drop-shadow-md"
//         />

//         {/* Left: Media */}
//         <div className="h-full w-[65%] relative bg-black">
//           <aside className="absolute top-0 left-0 flex items-center p-3 w-full bg-gradient-to-b from-black/70 to-transparent z-10">
//             <img
//               className="h-[45px] w-[45px] rounded-full object-cover border-2 border-white"
//               src={post.author?.profilePicture}
//               alt={post.author?.username}
//             />
//             <p className="ml-3 text-white font-semibold">@{post.author?.username}</p>
//           </aside>

//           {post.media.length > 1 && (
//             <>
//               <i
//                 onClick={() => setCurrMedia(currMedia === 0 ? post.media.length - 1 : currMedia - 1)}
//                 className="fa-solid fa-square-caret-left text-3xl absolute left-3 top-1/2 -translate-y-1/2 text-white/80 cursor-pointer hover:text-white"
//               ></i>
//               <i
//                 onClick={() => setCurrMedia(currMedia === post.media.length - 1 ? 0 : currMedia + 1)}
//                 className="fa-solid fa-square-caret-right text-3xl absolute right-3 top-1/2 -translate-y-1/2 text-white/80 cursor-pointer hover:text-white"
//               ></i>
//             </>
//           )}
//           <img className="h-full w-full object-cover" src={post.media[currMedia]} alt="Post media" />
//         </div>

//         {/* Right: Comments */}
//         <div className="h-full w-[35%] border-l border-gray-200">
//           <CommentsSection />
//         </div>
//       </div>

//       {/* ✅ MOBILE — fullscreen with tabs */}
//       <div className="md:hidden w-full h-[95vh] bg-white rounded-2xl overflow-hidden flex flex-col">
        
//         {/* Header */}
//         <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
//           <div className="flex items-center gap-2">
//             <img
//               className="h-9 w-9 rounded-full object-cover border border-gray-300"
//               src={post.author?.profilePicture}
//               alt={post.author?.username}
//             />
//             <p className="font-semibold text-sm">@{post.author?.username}</p>
//           </div>
//           <X onClick={() => setUseModal(false)} className="cursor-pointer text-gray-600" size={22} />
//         </div>

//         {/* Tab buttons */}
//         <div className="flex border-b border-gray-200">
//           <button
//             onClick={() => setShowComments(false)}
//             className={`flex-1 py-2 text-sm font-semibold transition ${!showComments ? "border-b-2 border-black text-black" : "text-gray-400"}`}
//           >
//             📷 Photo
//           </button>
//           <button
//             onClick={() => setShowComments(true)}
//             className={`flex-1 py-2 text-sm font-semibold transition ${showComments ? "border-b-2 border-black text-black" : "text-gray-400"}`}
//           >
//             💬 Comments ({allComments.length})
//           </button>
//         </div>

//         {/* Content */}
//         {!showComments ? (
//           <div className="flex-1 relative bg-black">
//             {post.media.length > 1 && (
//               <>
//                 <i
//                   onClick={() => setCurrMedia(currMedia === 0 ? post.media.length - 1 : currMedia - 1)}
//                   className="fa-solid fa-square-caret-left text-2xl absolute left-3 top-1/2 -translate-y-1/2 text-white/80 cursor-pointer z-10"
//                 ></i>
//                 <i
//                   onClick={() => setCurrMedia(currMedia === post.media.length - 1 ? 0 : currMedia + 1)}
//                   className="fa-solid fa-square-caret-right text-2xl absolute right-3 top-1/2 -translate-y-1/2 text-white/80 cursor-pointer z-10"
//                 ></i>
//               </>
//             )}
//             <img className="h-full w-full object-contain" src={post.media[currMedia]} alt="Post media" />
            
//             {/* Caption overlay */}
//             {post.caption && (
//               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
//                 <p className="text-white text-sm">{post.caption}</p>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="flex-1 overflow-hidden">
//             <CommentsSection />
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default PostModal








// import axios from "axios"
// import { X, Heart, MessageCircle, Trash2 } from "lucide-react"
// import { useEffect, useState } from "react"
// import { useSelector } from "react-redux"

// const PostModal = ({ setUseModal, post }) => {
//   const [currMedia, setCurrMedia] = useState(0)
//   const [comment, setComment] = useState("")
//   const [allComments, setAllComments] = useState(post.comments || [])
//   const [replyInputs, setReplyInputs] = useState({})
//   const [viewReplies, setViewReplies] = useState({})
//   const [likedComments, setLikedComments] = useState(
//     Object.fromEntries((post.comments || []).map((c) => [c._id, c.isLikedByMe || false]))
//   )
//   const [replyText, setReplyText] = useState("")
//   const [showComments, setShowComments] = useState(false)
//   const myUserData = useSelector(store => store.user) // ✅ current user

//   useEffect(() => {
//     const scrollY = window.scrollY
//     document.body.style.position = "fixed"
//     document.body.style.top = `-${scrollY}px`
//     document.body.style.width = "100%"
//     return () => {
//       document.body.style.position = ""
//       document.body.style.top = ""
//       window.scrollTo(0, scrollY)
//     }
//   }, [])

//   const handleAddComment = async () => {
//     if (!comment.trim()) return
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_DOMAIN}/api/comments/${post._id}`,
//         { text: comment },
//         { withCredentials: true }
//       )
//       setComment("")
//       setAllComments([...allComments, res.data.data])
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   // ✅ Delete comment
//   const handleDeleteComment = async (commentId) => {
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_DOMAIN}/api/comments/${post._id}/${commentId}`,
//         { withCredentials: true }
//       )
//       setAllComments(allComments.filter(c => c._id !== commentId))
//     } catch (err) {
//       console.error("Delete comment error:", err)
//     }
//   }

//   const handleToggleReply = (commentId) => {
//     setReplyInputs((prev) => ({ ...prev, [commentId]: !prev[commentId] }))
//   }

//   const handleToggleViewReplies = (commentId) => {
//     setViewReplies((prev) => ({ ...prev, [commentId]: !prev[commentId] }))
//   }

//   const handleToggleLike = async (commentId) => {
//     const isCurrentlyLiked = likedComments[commentId]
//     setLikedComments((prev) => ({ ...prev, [commentId]: !isCurrentlyLiked }))
//     try {
//       if (isCurrentlyLiked) {
//         await axios.patch(
//           `${import.meta.env.VITE_DOMAIN}/api/comments/${post._id}/${commentId}/unlike`,
//           {},
//           { withCredentials: true }
//         )
//         setAllComments((prev) =>
//           prev.map((c) => c._id === commentId ? { ...c, likesCount: (c.likesCount || 1) - 1 } : c)
//         )
//       } else {
//         await axios.post(
//           `${import.meta.env.VITE_DOMAIN}/api/comments/${post._id}/${commentId}/like`,
//           {},
//           { withCredentials: true }
//         )
//         setAllComments((prev) =>
//           prev.map((c) => c._id === commentId ? { ...c, likesCount: (c.likesCount || 0) + 1 } : c)
//         )
//       }
//     } catch (err) {
//       setLikedComments((prev) => ({ ...prev, [commentId]: isCurrentlyLiked }))
//     }
//   }

//   const CommentsSection = () => (
//     <div className="h-full flex flex-col">
//       {/* Caption */}
//       <div className="p-3 border-b border-gray-200">
//         <p className="text-gray-800 text-sm">{post.caption}</p>
//       </div>

//       {/* Comments */}
//       <div className="flex-1 overflow-y-auto p-3 space-y-4">
//         {allComments.length === 0 ? (
//           <p className="text-gray-400 text-sm text-center mt-10">
//             No comments yet. Be the first!
//           </p>
//         ) : (
//           allComments.map((item) => (
//             <div key={item._id} className="space-y-1">
//               <div className="flex items-start space-x-2">
//                 <img
//                   src={item.author?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
//                   alt={item.author?.username || "user"}
//                   className="h-8 w-8 rounded-full object-cover flex-shrink-0"
//                 />
//                 <div className="flex-1">
//                   <p className="text-xs font-semibold">{item.author?.username || "Unknown"}</p>
//                   <p className="text-gray-700 text-xs">{item.text}</p>

//                   {/* Actions */}
//                   <div className="flex items-center gap-3 text-xs text-gray-500 mt-1 flex-wrap">
//                     {/* ✅ Like button */}
//                     <button
//                       onClick={() => handleToggleLike(item._id)}
//                       className="flex items-center gap-1 hover:text-red-500 transition-colors"
//                     >
//                       <Heart
//                         size={12}
//                         fill={likedComments[item._id] ? "red" : "none"}
//                         className={likedComments[item._id] ? "text-red-500" : "text-gray-400"}
//                       />
//                       <span>Like</span>
//                       {item.likesCount > 0 && (
//                         <span className="text-[10px] text-gray-500">{item.likesCount}</span>
//                       )}
//                     </button>

//                     {/* Reply button */}
//                     <button
//                       onClick={() => handleToggleReply(item._id)}
//                       className="flex items-center gap-1 hover:text-black transition-colors"
//                     >
//                       <MessageCircle size={12} />
//                       Reply
//                     </button>

//                     {item.reply?.length > 0 && (
//                       <button onClick={() => handleToggleViewReplies(item._id)} className="hover:text-black">
//                         {viewReplies[item._id] ? "Hide" : `${item.reply.length} replies`}
//                       </button>
//                     )}

//                     {/* ✅ Delete button — sirf apna comment */}
//                     {(item.author?._id === myUserData?._id ||
//                       item.author === myUserData?._id ||
//                       post.author?._id === myUserData?._id) && (
//                       <button
//                         onClick={() => handleDeleteComment(item._id)}
//                         className="flex items-center gap-1 hover:text-red-500 transition-colors ml-auto"
//                       >
//                         <Trash2 size={12} />
//                       </button>
//                     )}
//                   </div>

//                   {/* Reply Input */}
//                   {replyInputs[item._id] && (
//                     <div className="mt-2 flex gap-2">
//                       <input
//                         value={replyText}
//                         onChange={(e) => setReplyText(e.target.value)}
//                         type="text"
//                         placeholder="Write a reply..."
//                         className="flex-1 border border-gray-300 rounded-full px-3 py-1 text-xs outline-none"
//                       />
//                       <button
//                         onClick={() => {
//                           async function replyComment() {
//                             const res = await axios.post(
//                               `${import.meta.env.VITE_DOMAIN}/api/comments/${post._id}/${item._id}/reply`,
//                               { text: replyText },
//                               { withCredentials: true }
//                             )
//                             setReplyText("")
//                             const newCommentsArray = allComments.map((i) => {
//                               if (i._id != item._id) return i
//                               else { i.reply.push(res.data.data); return item }
//                             })
//                             setAllComments(newCommentsArray)
//                           }
//                           replyComment()
//                         }}
//                         className="text-xs px-2 py-1 bg-black text-white rounded-full hover:bg-gray-800"
//                       >
//                         Reply
//                       </button>
//                     </div>
//                   )}

//                   {/* Replies */}
//                   {viewReplies[item._id] && item.reply?.length > 0 && (
//                     <div className="mt-2 space-y-2 pl-4 border-l border-gray-200">
//                       {item.reply.map((rep, i) => (
//                         <div key={i} className="flex items-start gap-2">
//                           <img
//                             src={rep.author?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
//                             className="h-6 w-6 rounded-full object-cover"
//                           />
//                           <div>
//                             <p className="text-xs font-semibold">{rep.author?.username || "User"}</p>
//                             <p className="text-xs text-gray-700">{rep.text}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* ✅ Add Comment — fixed bottom, keyboard ke upar rahega */}
//       <div className="p-3 border-t border-gray-200 flex gap-2 bg-white">
//         <input
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           onKeyDown={(e) => { if (e.key === "Enter") handleAddComment() }}
//           type="text"
//           placeholder="Add a comment..."
//           className="flex-1 border border-gray-300 rounded-full px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-gray-400"
//         />
//         <button
//           onClick={handleAddComment}
//           className="px-3 py-1 bg-black text-white text-sm rounded-full hover:bg-gray-800 disabled:opacity-50"
//           disabled={!comment.trim()}
//         >
//           Post
//         </button>
//       </div>
//     </div>
//   )

//   return (
//     <div className="h-[100vh] w-[100vw] bg-gray-400/70 fixed left-0 top-0 z-50 flex justify-center items-center p-2 md:p-0">

//       {/* DESKTOP */}
//       <div className="hidden md:flex h-[80vh] w-[75vw] bg-white relative rounded-2xl overflow-hidden">
//         <X
//           onClick={() => setUseModal(false)}
//           className="absolute right-3 top-3 cursor-pointer hover:scale-110 transition-transform z-10 text-white drop-shadow-md"
//         />
//         <div className="h-full w-[65%] relative bg-black">
//           <aside className="absolute top-0 left-0 flex items-center p-3 w-full bg-gradient-to-b from-black/70 to-transparent z-10">
//             <img
//               className="h-[45px] w-[45px] rounded-full object-cover border-2 border-white"
//               src={post.author?.profilePicture}
//               alt={post.author?.username}
//             />
//             <p className="ml-3 text-white font-semibold">@{post.author?.username}</p>
//           </aside>
//           {post.media.length > 1 && (
//             <>
//               <i onClick={() => setCurrMedia(currMedia === 0 ? post.media.length - 1 : currMedia - 1)}
//                 className="fa-solid fa-square-caret-left text-3xl absolute left-3 top-1/2 -translate-y-1/2 text-white/80 cursor-pointer hover:text-white"></i>
//               <i onClick={() => setCurrMedia(currMedia === post.media.length - 1 ? 0 : currMedia + 1)}
//                 className="fa-solid fa-square-caret-right text-3xl absolute right-3 top-1/2 -translate-y-1/2 text-white/80 cursor-pointer hover:text-white"></i>
//             </>
//           )}
//           <img className="h-full w-full object-cover" src={post.media[currMedia]} alt="Post media" />
//         </div>
//         <div className="h-full w-[35%] border-l border-gray-200">
//           <CommentsSection />
//         </div>
//       </div>

//       {/* ✅ MOBILE — keyboard fix */}
//       <div className="md:hidden w-full bg-white rounded-2xl overflow-hidden flex flex-col"
//         style={{ height: "95dvh" }}  // ✅ dvh — keyboard ke saath adjust hota hai
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 flex-shrink-0">
//           <div className="flex items-center gap-2">
//             <img
//               className="h-9 w-9 rounded-full object-cover border border-gray-300"
//               src={post.author?.profilePicture}
//               alt={post.author?.username}
//             />
//             <p className="font-semibold text-sm">@{post.author?.username}</p>
//           </div>
//           <X onClick={() => setUseModal(false)} className="cursor-pointer text-gray-600" size={22} />
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b border-gray-200 flex-shrink-0">
//           <button
//             onClick={() => setShowComments(false)}
//             className={`flex-1 py-2 text-sm font-semibold transition ${!showComments ? "border-b-2 border-black text-black" : "text-gray-400"}`}
//           >
//             📷 Photo
//           </button>
//           <button
//             onClick={() => setShowComments(true)}
//             className={`flex-1 py-2 text-sm font-semibold transition ${showComments ? "border-b-2 border-black text-black" : "text-gray-400"}`}
//           >
//             💬 Comments ({allComments.length})
//           </button>
//         </div>

//         {/* Content */}
//         {!showComments ? (
//           <div className="flex-1 relative bg-black overflow-hidden">
//             {post.media.length > 1 && (
//               <>
//                 <i onClick={() => setCurrMedia(currMedia === 0 ? post.media.length - 1 : currMedia - 1)}
//                   className="fa-solid fa-square-caret-left text-2xl absolute left-3 top-1/2 -translate-y-1/2 text-white/80 cursor-pointer z-10"></i>
//                 <i onClick={() => setCurrMedia(currMedia === post.media.length - 1 ? 0 : currMedia + 1)}
//                   className="fa-solid fa-square-caret-right text-2xl absolute right-3 top-1/2 -translate-y-1/2 text-white/80 cursor-pointer z-10"></i>
//               </>
//             )}
//             <img className="h-full w-full object-contain" src={post.media[currMedia]} alt="Post media" />
//             {post.caption && (
//               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
//                 <p className="text-white text-sm">{post.caption}</p>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="flex-1 overflow-hidden flex flex-col min-h-0">
//             <CommentsSection />
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default PostModal












// import axios from "axios"
// import { X, Heart, MessageCircle, Trash2 } from "lucide-react"
// import { useEffect, useRef, useState } from "react"
// import { useSelector } from "react-redux"

// const PostModal = ({ setUseModal, post }) => {
//   const [currMedia, setCurrMedia] = useState(0)
//   const [comment, setComment] = useState("")
//   const [allComments, setAllComments] = useState(post.comments || [])
//   const [replyInputs, setReplyInputs] = useState({})
//   const [viewReplies, setViewReplies] = useState({})
//   const [likedComments, setLikedComments] = useState(
//     Object.fromEntries((post.comments || []).map((c) => [c._id, c.isLikedByMe || false]))
//   )
//   const [replyText, setReplyText] = useState("")
//   const [showComments, setShowComments] = useState(false)
//   const [isPostLiked, setIsPostLiked] = useState(false) // ✅ post like state
//   const [postLikesCount, setPostLikesCount] = useState(post.likes?.length || 0)
//   const myUserData = useSelector(store => store.user)
//   const commentInputRef = useRef(null)

//   useEffect(() => {
//     // ✅ Check if already liked
//     if (post.likes && myUserData) {
//       const liked = post.likes.some(id =>
//         id === myUserData._id || id?._id === myUserData._id
//       )
//       setIsPostLiked(liked)
//     }
//   }, [])

//   // ✅ Post like handler
//   const handlePostLike = async () => {
//     try {
//       if (isPostLiked) {
//         await axios.patch(
//           `${import.meta.env.VITE_DOMAIN}/api/posts/${post._id}/unlike`,
//           {},
//           { withCredentials: true }
//         )
//         setIsPostLiked(false)
//         setPostLikesCount(prev => prev - 1)
//       } else {
//         await axios.patch(
//           `${import.meta.env.VITE_DOMAIN}/api/posts/${post._id}/like`,
//           {},
//           { withCredentials: true }
//         )
//         setIsPostLiked(true)
//         setPostLikesCount(prev => prev + 1)
//       }
//     } catch (err) {
//       console.error("Post like error:", err)
//     }
//   }

//   const handleAddComment = async () => {
//     if (!comment.trim()) return
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_DOMAIN}/api/comments/${post._id}`,
//         { text: comment },
//         { withCredentials: true }
//       )
//       setComment("")
//       setAllComments([...allComments, res.data.data])
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   const handleDeleteComment = async (commentId) => {
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_DOMAIN}/api/comments/${post._id}/${commentId}`,
//         { withCredentials: true }
//       )
//       setAllComments(allComments.filter(c => c._id !== commentId))
//     } catch (err) {
//       console.error("Delete comment error:", err)
//     }
//   }

//   const handleToggleReply = (commentId) => {
//     setReplyInputs((prev) => ({ ...prev, [commentId]: !prev[commentId] }))
//   }

//   const handleToggleViewReplies = (commentId) => {
//     setViewReplies((prev) => ({ ...prev, [commentId]: !prev[commentId] }))
//   }

//   const handleToggleLike = async (commentId) => {
//     const isCurrentlyLiked = likedComments[commentId]
//     setLikedComments((prev) => ({ ...prev, [commentId]: !isCurrentlyLiked }))
//     try {
//       if (isCurrentlyLiked) {
//         await axios.patch(
//           `${import.meta.env.VITE_DOMAIN}/api/comments/${post._id}/${commentId}/unlike`,
//           {},
//           { withCredentials: true }
//         )
//         setAllComments((prev) =>
//           prev.map((c) => c._id === commentId ? { ...c, likesCount: (c.likesCount || 1) - 1 } : c)
//         )
//       } else {
//         await axios.post(
//           `${import.meta.env.VITE_DOMAIN}/api/comments/${post._id}/${commentId}/like`,
//           {},
//           { withCredentials: true }
//         )
//         setAllComments((prev) =>
//           prev.map((c) => c._id === commentId ? { ...c, likesCount: (c.likesCount || 0) + 1 } : c)
//         )
//       }
//     } catch (err) {
//       setLikedComments((prev) => ({ ...prev, [commentId]: isCurrentlyLiked }))
//     }
//   }

//   const CommentsSection = () => (
//     <div className="flex flex-col h-full">
//       {/* Caption + Like bar */}
//       <div className="p-3 border-b border-gray-200 flex-shrink-0">
//         <p className="text-gray-800 text-sm mb-2">{post.caption}</p>
//         {/* ✅ Post like button */}
//         <div className="flex items-center gap-2">
//           <button
//             onClick={handlePostLike}
//             className="flex items-center gap-1.5 text-sm font-medium transition"
//           >
//             <Heart
//               size={20}
//               fill={isPostLiked ? "red" : "none"}
//               className={isPostLiked ? "text-red-500" : "text-gray-500"}
//             />
//             <span className={isPostLiked ? "text-red-500" : "text-gray-600"}>
//               {postLikesCount} likes
//             </span>
//           </button>
//         </div>
//       </div>

//       {/* Comments list */}
//       <div className="flex-1 overflow-y-auto p-3 space-y-4 min-h-0">
//         {allComments.length === 0 ? (
//           <p className="text-gray-400 text-sm text-center mt-10">
//             No comments yet. Be the first!
//           </p>
//         ) : (
//           allComments.map((item) => (
//             <div key={item._id} className="space-y-1">
//               <div className="flex items-start space-x-2">
//                 <img
//                   src={item.author?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
//                   alt={item.author?.username || "user"}
//                   className="h-8 w-8 rounded-full object-cover flex-shrink-0"
//                 />
//                 <div className="flex-1 min-w-0">
//                   <p className="text-xs font-semibold">{item.author?.username || "Unknown"}</p>
//                   <p className="text-gray-700 text-xs break-words">{item.text}</p>

//                   <div className="flex items-center gap-3 text-xs text-gray-500 mt-1 flex-wrap">
//                     <button
//                       onClick={() => handleToggleLike(item._id)}
//                       className="flex items-center gap-1 hover:text-red-500 transition-colors"
//                     >
//                       <Heart
//                         size={12}
//                         fill={likedComments[item._id] ? "red" : "none"}
//                         className={likedComments[item._id] ? "text-red-500" : "text-gray-400"}
//                       />
//                       <span>Like</span>
//                       {item.likesCount > 0 && (
//                         <span className="text-[10px]">{item.likesCount}</span>
//                       )}
//                     </button>

//                     <button
//                       onClick={() => handleToggleReply(item._id)}
//                       className="flex items-center gap-1 hover:text-black transition-colors"
//                     >
//                       <MessageCircle size={12} />
//                       Reply
//                     </button>

//                     {item.reply?.length > 0 && (
//                       <button onClick={() => handleToggleViewReplies(item._id)} className="hover:text-black">
//                         {viewReplies[item._id] ? "Hide" : `${item.reply.length} replies`}
//                       </button>
//                     )}

//                     {(item.author?._id === myUserData?._id ||
//                       item.author === myUserData?._id ||
//                       post.author?._id === myUserData?._id) && (
//                       <button
//                         onClick={() => handleDeleteComment(item._id)}
//                         className="flex items-center gap-1 hover:text-red-500 transition-colors"
//                       >
//                         <Trash2 size={12} />
//                       </button>
//                     )}
//                   </div>

//                   {replyInputs[item._id] && (
//                     <div className="mt-2 flex gap-2">
//                       <input
//                         value={replyText}
//                         onChange={(e) => setReplyText(e.target.value)}
//                         type="text"
//                         placeholder="Write a reply..."
//                         className="flex-1 border border-gray-300 rounded-full px-3 py-1 text-xs outline-none"
//                       />
//                       <button
//                         onClick={() => {
//                           async function replyComment() {
//                             const res = await axios.post(
//                               `${import.meta.env.VITE_DOMAIN}/api/comments/${post._id}/${item._id}/reply`,
//                               { text: replyText },
//                               { withCredentials: true }
//                             )
//                             setReplyText("")
//                             const newCommentsArray = allComments.map((i) => {
//                               if (i._id != item._id) return i
//                               else { i.reply.push(res.data.data); return item }
//                             })
//                             setAllComments(newCommentsArray)
//                           }
//                           replyComment()
//                         }}
//                         className="text-xs px-2 py-1 bg-black text-white rounded-full hover:bg-gray-800 flex-shrink-0"
//                       >
//                         Reply
//                       </button>
//                     </div>
//                   )}

//                   {viewReplies[item._id] && item.reply?.length > 0 && (
//                     <div className="mt-2 space-y-2 pl-4 border-l border-gray-200">
//                       {item.reply.map((rep, i) => (
//                         <div key={i} className="flex items-start gap-2">
//                           <img
//                             src={rep.author?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
//                             className="h-6 w-6 rounded-full object-cover flex-shrink-0"
//                           />
//                           <div>
//                             <p className="text-xs font-semibold">{rep.author?.username || "User"}</p>
//                             <p className="text-xs text-gray-700">{rep.text}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* ✅ Comment input — fixed, keyboard ke upar */}
//       <div className="flex-shrink-0 p-3 border-t border-gray-200 bg-white flex gap-2">
//         <input
//           ref={commentInputRef}
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           onKeyDown={(e) => { if (e.key === "Enter") handleAddComment() }}
//           type="text"
//           placeholder="Add a comment..."
//           className="flex-1 border border-gray-300 rounded-full px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-gray-400"
//         />
//         <button
//           onClick={handleAddComment}
//           className="px-3 py-1 bg-black text-white text-sm rounded-full hover:bg-gray-800 disabled:opacity-50 flex-shrink-0"
//           disabled={!comment.trim()}
//         >
//           Post
//         </button>
//       </div>
//     </div>
//   )

//   return (
//     // ✅ Fixed position — body ko fix nahi karna
//     <div className="fixed inset-0 bg-gray-400/70 z-50 flex justify-center items-center p-2 md:p-0">

//       {/* DESKTOP */}
//       <div className="hidden md:flex h-[80vh] w-[75vw] bg-white relative rounded-2xl overflow-hidden">
//         <X
//           onClick={() => setUseModal(false)}
//           className="absolute right-3 top-3 cursor-pointer hover:scale-110 transition-transform z-10 text-white drop-shadow-md"
//         />
//         <div className="h-full w-[65%] relative bg-black">
//           <aside className="absolute top-0 left-0 flex items-center p-3 w-full bg-gradient-to-b from-black/70 to-transparent z-10">
//             <img
//               className="h-[45px] w-[45px] rounded-full object-cover border-2 border-white"
//               src={post.author?.profilePicture}
//               alt={post.author?.username}
//             />
//             <p className="ml-3 text-white font-semibold">@{post.author?.username}</p>
//           </aside>
//           {post.media?.length > 1 && (
//             <>
//               <i onClick={() => setCurrMedia(currMedia === 0 ? post.media.length - 1 : currMedia - 1)}
//                 className="fa-solid fa-square-caret-left text-3xl absolute left-3 top-1/2 -translate-y-1/2 text-white/80 cursor-pointer hover:text-white"></i>
//               <i onClick={() => setCurrMedia(currMedia === post.media.length - 1 ? 0 : currMedia + 1)}
//                 className="fa-solid fa-square-caret-right text-3xl absolute right-3 top-1/2 -translate-y-1/2 text-white/80 cursor-pointer hover:text-white"></i>
//             </>
//           )}
//           <img className="h-full w-full object-cover" src={post.media?.[currMedia]} alt="Post media" />
//         </div>
//         <div className="h-full w-[35%] border-l border-gray-200 flex flex-col">
//           <CommentsSection />
//         </div>
//       </div>

//       {/* ✅ MOBILE — keyboard fix, no body fixed */}
//       <div
//         className="md:hidden w-full bg-white rounded-2xl overflow-hidden flex flex-col"
//         style={{ height: "90dvh" }}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 flex-shrink-0">
//           <div className="flex items-center gap-2">
//             <img
//               className="h-9 w-9 rounded-full object-cover border border-gray-300"
//               src={post.author?.profilePicture}
//               alt={post.author?.username}
//             />
//             <p className="font-semibold text-sm">@{post.author?.username}</p>
//           </div>
//           <X onClick={() => setUseModal(false)} className="cursor-pointer text-gray-600" size={22} />
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b border-gray-200 flex-shrink-0">
//           <button
//             onClick={() => setShowComments(false)}
//             className={`flex-1 py-2 text-sm font-semibold transition ${!showComments ? "border-b-2 border-black text-black" : "text-gray-400"}`}
//           >
//             📷 Photo
//           </button>
//           <button
//             onClick={() => setShowComments(true)}
//             className={`flex-1 py-2 text-sm font-semibold transition ${showComments ? "border-b-2 border-black text-black" : "text-gray-400"}`}
//           >
//             💬 {allComments.length}
//           </button>
//         </div>

//         {/* Content */}
//         {!showComments ? (
//           <div className="flex-1 relative bg-black overflow-hidden">
//             {post.media?.length > 1 && (
//               <>
//                 <i onClick={() => setCurrMedia(currMedia === 0 ? post.media.length - 1 : currMedia - 1)}
//                   className="fa-solid fa-square-caret-left text-2xl absolute left-3 top-1/2 -translate-y-1/2 text-white/80 cursor-pointer z-10"></i>
//                 <i onClick={() => setCurrMedia(currMedia === post.media.length - 1 ? 0 : currMedia + 1)}
//                   className="fa-solid fa-square-caret-right text-2xl absolute right-3 top-1/2 -translate-y-1/2 text-white/80 cursor-pointer z-10"></i>
//               </>
//             )}
//             <img className="h-full w-full object-contain" src={post.media?.[currMedia]} alt="Post media" />
//             {/* ✅ Like button on photo tab */}
//             <div className="absolute bottom-4 left-4 flex items-center gap-2">
//               <button onClick={handlePostLike} className="flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-full">
//                 <Heart
//                   size={18}
//                   fill={isPostLiked ? "red" : "none"}
//                   className={isPostLiked ? "text-red-500" : "text-white"}
//                 />
//                 <span className="text-white text-sm">{postLikesCount}</span>
//               </button>
//             </div>
//             {post.caption && (
//               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pb-14">
//                 <p className="text-white text-sm">{post.caption}</p>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="flex-1 overflow-hidden flex flex-col min-h-0">
//             <CommentsSection />
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default PostModal










import axios from "axios"
import { X, Heart, MessageCircle, Trash2 } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import { useSelector } from "react-redux"

// ✅ CommentsSection ko BAHAR nikalo — alag component
const CommentsSection = ({
  post,
  allComments,
  setAllComments,
  likedComments,
  setLikedComments,
  replyInputs,
  setReplyInputs,
  viewReplies,
  setViewReplies,
  isPostLiked,
  postLikesCount,
  handlePostLike,
  myUserData
}) => {
  const [comment, setComment] = useState("")
  const [replyText, setReplyText] = useState("")

  const handleAddComment = async () => {
    if (!comment.trim()) return
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_DOMAIN}/api/comments/${post._id}`,
        { text: comment },
        { withCredentials: true }
      )
      setComment("")
      setAllComments(prev => [...prev, res.data.data])
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_DOMAIN}/api/comments/${post._id}/${commentId}`,
        { withCredentials: true }
      )
      setAllComments(prev => prev.filter(c => c._id !== commentId))
    } catch (err) {
      console.error(err)
    }
  }

  const handleToggleLike = async (commentId) => {
    const isCurrentlyLiked = likedComments[commentId]
    setLikedComments((prev) => ({ ...prev, [commentId]: !isCurrentlyLiked }))
    try {
      if (isCurrentlyLiked) {
        await axios.patch(
          `${import.meta.env.VITE_DOMAIN}/api/comments/${post._id}/${commentId}/unlike`,
          {},
          { withCredentials: true }
        )
        setAllComments((prev) =>
          prev.map((c) => c._id === commentId ? { ...c, likesCount: (c.likesCount || 1) - 1 } : c)
        )
      } else {
        await axios.post(
          `${import.meta.env.VITE_DOMAIN}/api/comments/${post._id}/${commentId}/like`,
          {},
          { withCredentials: true }
        )
        setAllComments((prev) =>
          prev.map((c) => c._id === commentId ? { ...c, likesCount: (c.likesCount || 0) + 1 } : c)
        )
      }
    } catch (err) {
      setLikedComments((prev) => ({ ...prev, [commentId]: isCurrentlyLiked }))
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Caption + Like */}
      <div className="p-3 border-b border-gray-200 flex-shrink-0">
        <p className="text-gray-800 text-sm mb-2">{post.caption}</p>
        <button
          onClick={handlePostLike}
          className="flex items-center gap-1.5 text-sm font-medium transition"
        >
          <Heart
            size={20}
            fill={isPostLiked ? "red" : "none"}
            className={isPostLiked ? "text-red-500" : "text-gray-500"}
          />
          <span className={isPostLiked ? "text-red-500" : "text-gray-600"}>
            {postLikesCount} likes
          </span>
        </button>
      </div>

      {/* Comments list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 min-h-0">
        {allComments.length === 0 ? (
          <p className="text-gray-400 text-sm text-center mt-10">
            No comments yet. Be the first!
          </p>
        ) : (
          allComments.map((item) => (
            <div key={item._id} className="space-y-1">
              <div className="flex items-start space-x-2">
                <img
                  src={item.author?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                  className="h-8 w-8 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold">{item.author?.username || "Unknown"}</p>
                  <p className="text-gray-700 text-xs break-words">{item.text}</p>

                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1 flex-wrap">
                    <button
                      onClick={() => handleToggleLike(item._id)}
                      className="flex items-center gap-1 hover:text-red-500 transition-colors"
                    >
                      <Heart
                        size={12}
                        fill={likedComments[item._id] ? "red" : "none"}
                        className={likedComments[item._id] ? "text-red-500" : "text-gray-400"}
                      />
                      <span>Like</span>
                      {item.likesCount > 0 && (
                        <span className="text-[10px]">{item.likesCount}</span>
                      )}
                    </button>

                    <button
                      onClick={() => setReplyInputs((prev) => ({ ...prev, [item._id]: !prev[item._id] }))}
                      className="flex items-center gap-1 hover:text-black transition-colors"
                    >
                      <MessageCircle size={12} />
                      Reply
                    </button>

                    {item.reply?.length > 0 && (
                      <button
                        onClick={() => setViewReplies((prev) => ({ ...prev, [item._id]: !prev[item._id] }))}
                        className="hover:text-black"
                      >
                        {viewReplies[item._id] ? "Hide" : `${item.reply.length} replies`}
                      </button>
                    )}

                    {(item.author?._id === myUserData?._id ||
                      item.author === myUserData?._id ||
                      post.author?._id === myUserData?._id) && (
                      <button
                        onClick={() => handleDeleteComment(item._id)}
                        className="flex items-center gap-1 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>

                  {replyInputs[item._id] && (
                    <div className="mt-2 flex gap-2">
                      <input
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        type="text"
                        placeholder="Write a reply..."
                        className="flex-1 border border-gray-300 rounded-full px-3 py-1 text-xs outline-none"
                      />
                      <button
                        onClick={async () => {
                          const res = await axios.post(
                            `${import.meta.env.VITE_DOMAIN}/api/comments/${post._id}/${item._id}/reply`,
                            { text: replyText },
                            { withCredentials: true }
                          )
                          setReplyText("")
                          setAllComments(prev => prev.map((i) => {
                            if (i._id !== item._id) return i
                            return { ...i, reply: [...(i.reply || []), res.data.data] }
                          }))
                        }}
                        className="text-xs px-2 py-1 bg-black text-white rounded-full hover:bg-gray-800 flex-shrink-0"
                      >
                        Reply
                      </button>
                    </div>
                  )}

                  {viewReplies[item._id] && item.reply?.length > 0 && (
                    <div className="mt-2 space-y-2 pl-4 border-l border-gray-200">
                      {item.reply.map((rep, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <img
                            src={rep.author?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                            className="h-6 w-6 rounded-full object-cover flex-shrink-0"
                          />
                          <div>
                            <p className="text-xs font-semibold">{rep.author?.username || "User"}</p>
                            <p className="text-xs text-gray-700">{rep.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Comment Input */}
      <div className="flex-shrink-0 p-3 border-t border-gray-200 bg-white flex gap-2">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleAddComment() }}
          type="text"
          placeholder="Add a comment..."
          className="flex-1 border border-gray-300 rounded-full px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-gray-400"
        />
        <button
          onClick={handleAddComment}
          className="px-3 py-1 bg-black text-white text-sm rounded-full hover:bg-gray-800 disabled:opacity-50 flex-shrink-0"
          disabled={!comment.trim()}
        >
          Post
        </button>
      </div>
    </div>
  )
}

const PostModal = ({ setUseModal, post }) => {
  const [currMedia, setCurrMedia] = useState(0)
  const [allComments, setAllComments] = useState(post.comments || [])
  const [replyInputs, setReplyInputs] = useState({})
  const [viewReplies, setViewReplies] = useState({})
  const [likedComments, setLikedComments] = useState(
    Object.fromEntries((post.comments || []).map((c) => [c._id, c.isLikedByMe || false]))
  )
  const [showComments, setShowComments] = useState(false)
  const [isPostLiked, setIsPostLiked] = useState(false)
  const [postLikesCount, setPostLikesCount] = useState(post.likes?.length || 0)
  const myUserData = useSelector(store => store.user)

  useEffect(() => {
    if (post.likes && myUserData) {
      const liked = post.likes.some(id =>
        id === myUserData._id || id?._id === myUserData._id
      )
      setIsPostLiked(liked)
    }
  }, [])

  const handlePostLike = async () => {
    try {
      if (isPostLiked) {
        await axios.patch(
          `${import.meta.env.VITE_DOMAIN}/api/posts/${post._id}/unlike`,
          {},
          { withCredentials: true }
        )
        setIsPostLiked(false)
        setPostLikesCount(prev => prev - 1)
      } else {
        await axios.patch(
          `${import.meta.env.VITE_DOMAIN}/api/posts/${post._id}/like`,
          {},
          { withCredentials: true }
        )
        setIsPostLiked(true)
        setPostLikesCount(prev => prev + 1)
      }
    } catch (err) {
      console.error("Post like error:", err)
    }
  }

  const commonProps = {
    post, allComments, setAllComments,
    likedComments, setLikedComments,
    replyInputs, setReplyInputs,
    viewReplies, setViewReplies,
    isPostLiked, postLikesCount,
    handlePostLike, myUserData
  }

  return (
    <div className="fixed inset-0 bg-gray-400/70 z-50 flex justify-center items-center p-2 md:p-0">

      {/* DESKTOP */}
      <div className="hidden md:flex h-[80vh] w-[75vw] bg-white relative rounded-2xl overflow-hidden">
        <X
          onClick={() => setUseModal(false)}
          className="absolute right-3 top-3 cursor-pointer hover:scale-110 transition-transform z-10 text-white drop-shadow-md"
        />
        <div className="h-full w-[65%] relative bg-black">
          <aside className="absolute top-0 left-0 flex items-center p-3 w-full bg-gradient-to-b from-black/70 to-transparent z-10">
            <img
              className="h-[45px] w-[45px] rounded-full object-cover border-2 border-white"
              src={post.author?.profilePicture}
              alt={post.author?.username}
            />
            <p className="ml-3 text-white font-semibold">@{post.author?.username}</p>
          </aside>
          {post.media?.length > 1 && (
            <>
              <i onClick={() => setCurrMedia(currMedia === 0 ? post.media.length - 1 : currMedia - 1)}
                className="fa-solid fa-square-caret-left text-3xl absolute left-3 top-1/2 -translate-y-1/2 text-white/80 cursor-pointer hover:text-white"></i>
              <i onClick={() => setCurrMedia(currMedia === post.media.length - 1 ? 0 : currMedia + 1)}
                className="fa-solid fa-square-caret-right text-3xl absolute right-3 top-1/2 -translate-y-1/2 text-white/80 cursor-pointer hover:text-white"></i>
            </>
          )}
          <img className="h-full w-full object-cover" src={post.media?.[currMedia]} alt="Post media" />
        </div>
        <div className="h-full w-[35%] border-l border-gray-200 flex flex-col">
          <CommentsSection {...commonProps} />
        </div>
      </div>

      {/* MOBILE */}
      <div
        className="md:hidden w-full bg-white rounded-2xl overflow-hidden flex flex-col"
        style={{ height: "90dvh" }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-2">
            <img
              className="h-9 w-9 rounded-full object-cover border border-gray-300"
              src={post.author?.profilePicture}
              alt={post.author?.username}
            />
            <p className="font-semibold text-sm">@{post.author?.username}</p>
          </div>
          <X onClick={() => setUseModal(false)} className="cursor-pointer text-gray-600" size={22} />
        </div>

        <div className="flex border-b border-gray-200 flex-shrink-0">
          <button
            onClick={() => setShowComments(false)}
            className={`flex-1 py-2 text-sm font-semibold transition ${!showComments ? "border-b-2 border-black text-black" : "text-gray-400"}`}
          >
            📷 Photo
          </button>
          <button
            onClick={() => setShowComments(true)}
            className={`flex-1 py-2 text-sm font-semibold transition ${showComments ? "border-b-2 border-black text-black" : "text-gray-400"}`}
          >
            💬 {allComments.length}
          </button>
        </div>

        {!showComments ? (
          <div className="flex-1 relative bg-black overflow-hidden">
            {post.media?.length > 1 && (
              <>
                <i onClick={() => setCurrMedia(currMedia === 0 ? post.media.length - 1 : currMedia - 1)}
                  className="fa-solid fa-square-caret-left text-2xl absolute left-3 top-1/2 -translate-y-1/2 text-white/80 cursor-pointer z-10"></i>
                <i onClick={() => setCurrMedia(currMedia === post.media.length - 1 ? 0 : currMedia + 1)}
                  className="fa-solid fa-square-caret-right text-2xl absolute right-3 top-1/2 -translate-y-1/2 text-white/80 cursor-pointer z-10"></i>
              </>
            )}
            <img className="h-full w-full object-contain" src={post.media?.[currMedia]} alt="Post media" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <button onClick={handlePostLike} className="flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-full">
                <Heart
                  size={18}
                  fill={isPostLiked ? "red" : "none"}
                  className={isPostLiked ? "text-red-500" : "text-white"}
                />
                <span className="text-white text-sm">{postLikesCount}</span>
              </button>
            </div>
            {post.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pb-14">
                <p className="text-white text-sm">{post.caption}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 overflow-hidden flex flex-col min-h-0">
            <CommentsSection {...commonProps} />
          </div>
        )}
      </div>
    </div>
  )
}

export default PostModal