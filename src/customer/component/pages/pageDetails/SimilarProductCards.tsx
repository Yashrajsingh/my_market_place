import React from 'react'

const SimilarProductCards = () => {
  return (
    <div className="group px-2 relative">
      <div
        className="card">
        {/* Images */}
        {
          <img
            className="card-media"
            src="https://res.cloudinary.com/ldvj1h2z/image/upload/v1782125906/cld-sample-5.jpg"
            alt="product"
          />
        }
      </div>

      {/* Details */}
      <div className="details group-hover-effect">
        <h1 className="title">Niky</h1>
        <p className="subtitle">Blue Shirt</p>

        <div className="price-row">
          <span className="price">$4</span>
          <span className="old-price">$9.99</span>
          <span className="discount">60% OFF</span>
        </div>
      </div>
    </div>
  )
}

export default SimilarProductCards
