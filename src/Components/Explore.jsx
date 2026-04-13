import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Compass, Heart, MessageCircle } from 'lucide-react'

const Explore = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const nav = useNavigate()

    useEffect(() => {
        async function getPosts() {
            try {
                const res = await axios.get(
                    import.meta.env.VITE_DOMAIN + "/api/posts/explore",
                    { withCredentials: true }
                )
                setPosts(res.data.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        getPosts()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="flex-1 px-4 py-6 pb-24 md:pb-6">

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6 max-w-5xl mx-auto">
                        <Compass className="text-pink-500" size={28} />
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Explore</h1>
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="grid grid-cols-3 gap-1 max-w-5xl mx-auto">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-lg"></div>
                            ))}
                        </div>
                    )}

                    {/* Empty */}
                    {!loading && posts.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                            <Compass size={48} className="mb-3 text-gray-300" />
                            <p className="font-medium">No posts to explore</p>
                            <p className="text-sm mt-1">Follow more people to see their posts here!</p>
                        </div>
                    )}

                    {/* Grid */}
                    {!loading && posts.length > 0 && (
                        <div className="grid grid-cols-3 gap-1 max-w-5xl mx-auto">
                            {posts.map((post, index) => (
                                <ExploreCard
                                    key={post._id || index}
                                    post={post}
                                    onClick={() => nav(`/profile/view/${post.author._id}`)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const ExploreCard = ({ post, onClick }) => {
    const [hovered, setHovered] = useState(false)

    return (
        <div
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <img
                src={post.media?.[0]}
                alt="post"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />

            {/* Hover overlay */}
            {hovered && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 transition-opacity">
                    <div className="flex items-center gap-1 text-white font-bold">
                        <Heart size={20} fill="white" />
                        <span>{post.likesCount || 0}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white font-bold">
                        <MessageCircle size={20} fill="white" />
                        <span>{post.commentsCount || 0}</span>
                    </div>
                </div>
            )}

            {/* Multiple images indicator */}
            {post.media?.length > 1 && (
                <div className="absolute top-2 right-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white drop-shadow" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm14 0H4v12h12V6zM18 8h2a2 2 0 012 2v10a2 2 0 01-2 2H8a2 2 0 01-2-2v-2h2v2h10V10h-2V8z"/>
                    </svg>
                </div>
            )}
        </div>
    )
}

export default Explore