import React, { useState, useEffect } from "react"

interface Rating {
  rating_id: number
  rate?: number | null
  rating_comment?: string | null
  user_id: number
  nebu_id: number
  email: string
  profile_picture_url: string | null
}

const Ratings: React.FC<{ nebuId: string }> = ({ nebuId }) => {
  const [ratings, setRatings] = useState<Rating[]>([])

  useEffect(() => {
    fetch(`/api/nebu/rating/getRatingsOfNebu?nebuId=${nebuId}`)
      .then((response) => response.json())
      .then((data) => setRatings(data))
      .catch((error) => console.error("Error fetching ratings:", error))
  }, [nebuId])

  const getInitials = (email: string) => email.substring(0, 2).toUpperCase()

  const renderStars = (rating: number | undefined | null) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`inline-block w-4 h-4 ${
              index < (rating ?? 0) ? "text-yellow" : "text-slate-100"
            } `}
          >
            ★
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col my-8 ml-7 gap-y-8 transition-all delay-300 ease-in-out">
      {ratings.length > 0 ? (
        ratings.map((rating) => (
          <div
            key={rating.rating_id}
            className="px-0 flex items-center bg-white"
          >
            {rating.profile_picture_url ? (
              <img
                src={rating.profile_picture_url}
                className="h-12 w-12 rounded-full border-2 border-white"
                alt=""
              />
            ) : (
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-500 text-white text-sm">
                {getInitials(rating.email)}
              </div>
            )}
            <div className="ml-4 pr-7">
              <p className="text-sm font-medium text-black mb-1">
                {rating.email}
              </p>
              <div className="flex flex-col">
                <div className="rating rating-xs flex -mt-2">
                  {renderStars(rating.rate)}
                </div>
                <p className="text-sm mt-2 font-normal text-black">
                  {rating.rating_comment || "No comment"}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="ml-7">No ratings available</p>
      )}
    </div>
  )
}

export default Ratings
