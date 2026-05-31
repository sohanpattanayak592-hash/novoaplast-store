import React from 'react'
import { Helmet } from 'react-helmet-async'

export default function SEOHead({ 
  title = "NOVOPLAST — Premium Non-Tearable Plastic Prints", 
  description = "Custom Posters, Spiritual Prints & Weatherproof Stickers. Built to last forever.", 
  image = "https://novoplast.com/social-banner.jpg", 
  url = "https://novoplast.com" 
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  )
}
