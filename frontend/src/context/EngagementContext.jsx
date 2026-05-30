import React, { createContext, useContext, useState, useEffect } from 'react'

const EngagementContext = createContext()

export function useEngagement() {
  return useContext(EngagementContext)
}

export function EngagementProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('novo_favorites')
    return saved ? JSON.parse(saved) : []
  })

  const [followedCollections, setFollowedCollections] = useState(() => {
    const saved = localStorage.getItem('novo_followed_collections')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('novo_favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('novo_followed_collections', JSON.stringify(followedCollections))
  }, [followedCollections])

  const toggleFavorite = (posterId) => {
    setFavorites(prev => 
      prev.includes(posterId) ? prev.filter(id => id !== posterId) : [...prev, posterId]
    )
  }

  const toggleFollowCollection = (collectionId) => {
    setFollowedCollections(prev => 
      prev.includes(collectionId) ? prev.filter(id => id !== collectionId) : [...prev, collectionId]
    )
  }

  const isFavorite = (posterId) => favorites.includes(posterId)
  const isFollowed = (collectionId) => followedCollections.includes(collectionId)

  return (
    <EngagementContext.Provider value={{ favorites, toggleFavorite, isFavorite, followedCollections, toggleFollowCollection, isFollowed }}>
      {children}
    </EngagementContext.Provider>
  )
}
