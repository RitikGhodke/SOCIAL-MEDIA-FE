import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import StoryViewer from './StoryViewer'

const Stories = () => {
    const [storyGroups, setStoryGroups] = useState([])
    const [selectedGroup, setSelectedGroup] = useState(null)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const myUserData = useSelector(store => store.user)
    const nav = useNavigate()

    useEffect(() => {
        async function getStories() {
            try {
                const res = await axios.get(
                    import.meta.env.VITE_DOMAIN + "/api/stories/feed",
                    { withCredentials: true }
                )
                setStoryGroups(res.data.data)
            } catch (err) {
                console.error(err)
            }
        }
        getStories()
    }, [])

    function openStory(group, index) {
        setSelectedGroup(group)
        setSelectedIndex(index)
    }

    return (
        <>
            <div className="flex gap-3 px-4 py-3 overflow-x-auto">

                {/* Add Story Button */}
                <div
                    onClick={() => nav("/add-story")}
                    className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer"
                >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 border-2 border-dashed border-pink-400 flex items-center justify-center hover:scale-105 transition">
                        <Plus size={24} className="text-pink-500" />
                    </div>
                    <span className="text-xs text-gray-500 w-16 text-center truncate">Your Story</span>
                </div>

                {/* Story circles */}
                {storyGroups.map((group) => (
                    <div
                        key={group.author._id}
                        onClick={() => openStory(group, 0)}
                        className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer"
                    >
                        <div className={`w-16 h-16 rounded-full p-0.5 ${group.hasUnread
                            ? "bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500"
                            : "bg-gray-300"
                        }`}>
                            <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
                                <img
                                    src={group.author.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                    alt={group.author.firstName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <span className="text-xs text-gray-600 w-16 text-center truncate">
                            {group.author._id === myUserData._id ? "You" : group.author.firstName}
                        </span>
                    </div>
                ))}
            </div>

            {/* Story Viewer */}
            {selectedGroup && (
                <StoryViewer
                    group={selectedGroup}
                    initialIndex={selectedIndex}
                    onClose={() => setSelectedGroup(null)}
                    onStoryViewed={(storyId) => {
                        setStoryGroups(prev => prev.map(g => {
                            if (g.author._id !== selectedGroup.author._id) return g
                            return {
                                ...g,
                                stories: g.stories.map(s =>
                                    s._id === storyId
                                        ? { ...s, viewers: [...s.viewers, myUserData._id] }
                                        : s
                                ),
                                hasUnread: g.stories.some(s =>
                                    s._id !== storyId && !s.viewers.includes(myUserData._id)
                                )
                            }
                        }))
                    }}
                />
            )}
        </>
    )
}

export default Stories