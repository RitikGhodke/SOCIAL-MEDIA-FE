// import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// const ConvCard = ({ data }) => {
//   const myData = useSelector(store => store.user)
//   const [dataToBeDisplayed] = useState(
//     myData._id === data.sender._id ? data.receiver : data.sender
//   )

//   const nav = useNavigate()

//   return (
//     <div
//     onClick={() => {
//         nav("/chat/" + dataToBeDisplayed._id)
//     }}
//       className="flex mt-3 items-center gap-4 p-4 rounded-xl hover:bg-gray-100 transition-all cursor-pointer border-b border-gray-200"
//     >
//       {/* Profile Image */}
//       <img
//         src={
//           dataToBeDisplayed.profilePicture ||
//           "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
//         }
//         alt={dataToBeDisplayed.firstName}
//         className="w-12 h-12 rounded-full object-cover border border-gray-300"
//       />

//       {/* Chat Info */}
//       <div className="flex-1 min-w-0">
//         <p className="font-semibold text-gray-800 truncate">
//           {dataToBeDisplayed.firstName} {dataToBeDisplayed.lastName}
//           <span className="text-gray-400 ml-1 text-sm">
//             @{dataToBeDisplayed.username}
//           </span>
//         </p>

//         <p className="text-gray-600 text-sm truncate mt-0.5">
//           {data.lastMsg || "No messages yet"}
//         </p>
//       </div>
//     </div>
//   )
// }

// export default ConvCard










import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ConvCard = ({ data }) => {
    const myData = useSelector(store => store.user)
    const [dataToBeDisplayed] = useState(
        myData._id === data.sender._id ? data.receiver : data.sender
    )
    const nav = useNavigate()

    return (
        <div
            onClick={() => nav("/chat/" + dataToBeDisplayed._id)}
            className="flex items-center gap-4 px-4 py-3 hover:bg-pink-50 transition cursor-pointer border-b border-gray-100 last:border-none"
        >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
                <img
                    src={dataToBeDisplayed.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                    alt={dataToBeDisplayed.firstName}
                    className="w-14 h-14 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full ring-2 ring-white"></span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800 truncate">
                        {dataToBeDisplayed.firstName} {dataToBeDisplayed.lastName}
                    </p>
                </div>
                <p className="text-gray-500 text-sm truncate mt-0.5">
                    {data.lastMsg || "No messages yet"}
                </p>
            </div>
        </div>
    )
}

export default ConvCard