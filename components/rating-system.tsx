"use client"

import { useState, useEffect } from "react"
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function RatingSystem({ softwareId }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [userName, setUserName] = useState("")
  const [hasRated, setHasRated] = useState(false)
  const [averageRating, setAverageRating] = useState(0)
  const [totalRatings, setTotalRatings] = useState(0)

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const q = query(collection(db, "ratings"), where("softwareId", "==", softwareId))
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
          let total = 0
          querySnapshot.forEach((doc) => {
            total += doc.data().value
          })
          setAverageRating(total / querySnapshot.size)
          setTotalRatings(querySnapshot.size)
        }
      } catch (error) {
        console.error("Error fetching ratings:", error)
      }
    }

    fetchRatings()
  }, [softwareId, hasRated])

  const handleRatingSubmit = async (e) => {
    e.preventDefault()

    if (rating === 0 || !userName.trim()) {
      return
    }

    try {
      await addDoc(collection(db, "ratings"), {
        softwareId,
        value: rating,
        userName,
        createdAt: serverTimestamp(),
      })

      setHasRated(true)
      setRating(0)
      setUserName("")
    } catch (error) {
      console.error("Error adding rating:", error)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Calificaciones</h3>
        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "w-5 h-5",
                  star <= averageRating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                )}
              />
            ))}
          </div>
          <span className="font-medium">{averageRating.toFixed(1)}</span>
          <span className="text-muted-foreground">({totalRatings} calificaciones)</span>
        </div>
      </div>

      {!hasRated ? (
        <form onSubmit={handleRatingSubmit} className="space-y-4 border rounded-lg p-4">
          <div>
            <Label htmlFor="user-name">Tu nombre</Label>
            <Input
              id="user-name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Ingresa tu nombre"
              required
            />
          </div>
          <div>
            <Label>Tu calificación</Label>
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "w-6 h-6 cursor-pointer transition-colors",
                    star <= (hover || rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                  )}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                />
              ))}
            </div>
          </div>
          <Button type="submit" disabled={rating === 0 || !userName.trim()}>
            Enviar calificación
          </Button>
        </form>
      ) : (
        <div className="text-green-600 p-4 bg-green-50 dark:bg-green-950 dark:text-green-400 rounded-lg">
          ¡Gracias por tu calificación!
        </div>
      )}
    </div>
  )
}
