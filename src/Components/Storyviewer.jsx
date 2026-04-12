import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { X, ChevronLeft, ChevronRight, Eye, Trash2 } from 'lucide-react'

const StoryViewer = ({ group, initialIndex, onClose, onStoryViewed }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex || 0)
    const [progress, setProgress] = useState(0)
    const [paused, setPaused] = useState(false)
    const [showViewers, setShowViewers] = useState(false)
    const [viewers, setViewers] = useState([])
    const progressInterval = useRef(null)
    const myUserData = useSelector(store => store.user)
    const DURATION = 5000 // 5 seconds per story

    const currentStory = group.stories[currentIndex]
    const isMyStory = group.author._id === myUserData._id

    useEffect(() => {
        markViewed()
        startProgress()
        return () => clearInterval(progressInterval.current)
    }, [currentIndex])

    async function markViewed() {
        try {
            await axios.patch(
                import.meta.env.VITE_DOMAIN + `/api/stories/${currentStory._id}/view`,
                {},
                { withCredentials: true }
            )
            onStoryViewed?.(currentStory._id)
        } catch (err) {
            console.error(err)
        }
    }

    function startProgress() {
        setProgress(0)
        clearInterval(progressInterval.current)
        progressInterval.current = setInterval(() => {
            if (!paused) {
                setProgress(prev => {
                    if (prev >= 100) {
                        goNext()
                        return 0
                    }
                    return prev + (100 / (DURATION / 100))
                })
            }
        }, 100)
    }

    function goNext() {
        if (currentIndex < group.stories.length - 1) {
            setCurrentIndex(prev => prev + 1)
        } else {
            onClose()
        }
    }

    function goPrev() {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1)
        }
    }

    async function handleDelete() {
        try {
            await axios.delete(
                import.meta.env.VITE_DOMAIN + `/api/stories/${currentStory._id}`,
                { withCredentials: true }
            )
            if (group.stories.length === 1) {
                onClose()
            } else {
                goNext()
            }
        } catch (err) {
            console.error(err)
        }
    }

    async function loadViewers() {
        try {
            const res = await axios.get(
                import.meta.env.VITE_DOMAIN + `/api/stories/${currentStory._id}/viewers`,
                { withCredentials: true }
            )
            setViewers(res.data.data)
            setShowViewers(true)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
            <div className="relative w-full h-full max-w-md mx-auto">

                {/* ✅ Progress bars */}
                <div className="absolute top-3 left-3 right-3 flex gap-1 z-20">
                    {group.stories.map((_, i) => (
                        <div key={i} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white rounded-full transition-none"
                                style={{
                                    width: i < currentIndex ? "100%" : i === currentIndex ? `${progress}%` : "0%"
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* ✅ Header */}
                <div className="absolute top-8 left-3 right-3 flex items-center justify-between z-20">
                    <div className="flex items-center gap-2">
                        <img
                            src={group.author.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                            className="w-9 h-9 rounded-full object-cover border-2 border-white"
                            alt="author"
                        />
                        <div>
                            <p className="text-white font-semibold text-sm">
                                {group.author.firstName} {group.author.lastName}
                            </p>
                            <p className="text-white/70 text-xs">
                                {new Date(currentStory.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {isMyStory && (
                            <>
                                <button onClick={loadViewers} className="text-white/80 hover:text-white">
                                    <Eye size={20} />
                                </button>
                                <button onClick={handleDelete} className="text-white/80 hover:text-red-400">
                                    <Trash2 size={20} />
                                </button>
                            </>
                        )}
                        <button onClick={onClose} className="text-white/80 hover:text-white">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* ✅ Story Image */}
                <img
                    src={currentStory.media}
                    alt="story"
                    className="w-full h-full object-cover"
                    onTouchStart={() => setPaused(true)}
                    onTouchEnd={() => setPaused(false)}
                    onMouseDown={() => setPaused(true)}
                    onMouseUp={() => setPaused(false)}
                />

                {/* ✅ Text Overlay */}
                {currentStory.text && (
                    <div className={`absolute left-4 right-4 z-20 ${currentStory.textPosition === "top"
                        ? "top-24"
                        : currentStory.textPosition === "bottom"
                            ? "bottom-24"
                            : "top-1/2 -translate-y-1/2"
                        }`}>
                        <p
                            className="text-center text-xl font-bold px-4 py-2 rounded-xl bg-black/30 backdrop-blur-sm"
                            style={{ color: currentStory.textColor || "#ffffff" }}
                        >
                            {currentStory.text}
                        </p>
                    </div>
                )}

                {/* ✅ Left/Right tap zones */}
                <button
                    className="absolute left-0 top-0 w-1/3 h-full z-10 flex items-center justify-start pl-2 opacity-0 hover:opacity-100"
                    onClick={goPrev}
                >
                    <ChevronLeft size={32} className="text-white drop-shadow-lg" />
                </button>
                <button
                    className="absolute right-0 top-0 w-1/3 h-full z-10 flex items-center justify-end pr-2 opacity-0 hover:opacity-100"
                    onClick={goNext}
                >
                    <ChevronRight size={32} className="text-white drop-shadow-lg" />
                </button>

                {/* ✅ Viewers Modal */}
                {showViewers && (
                    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-4 z-30 max-h-[50vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <p className="font-bold text-gray-800">Viewers ({viewers.length})</p>
                            <button onClick={() => setShowViewers(false)}>
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>
                        {viewers.length === 0 ? (
                            <p className="text-gray-400 text-sm text-center py-4">No viewers yet</p>
                        ) : (
                            viewers.map((v, i) => (
                                <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-none">
                                    <img
                                        src={v.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                        className="w-10 h-10 rounded-full object-cover"
                                        alt="viewer"
                                    />
                                    <div>
                                        <p className="font-semibold text-sm text-gray-800">{v.firstName} {v.lastName}</p>
                                        <p className="text-xs text-gray-500">@{v.username}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default StoryViewer