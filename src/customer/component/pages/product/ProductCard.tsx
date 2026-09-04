import React, { useEffect, useState } from "react";
import "./ProductCard.css";

import { Button } from "@mui/material";
import { AddShoppingCart, Favorite, FavoriteBorder } from "@mui/icons-material";
import { Product } from "../../../../types/ProductTypes";
import { useNavigate } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../State/Store";
import {
  selectIsInWishlist,
  toggleWishlistProduct,
} from "../../../../State/customer/WishlistSlice";
import { addItemToCart } from "../../../../State/customer/CartSlice";

const images: string[] = [
  "https://res.cloudinary.com/ldvj1h2z/image/upload/q_auto/f_auto/v1782126452/Spider_Man_lxf9be.webp",
  "https://res.cloudinary.com/ldvj1h2z/image/upload/q_auto/f_auto/v1782126451/images_s15os3.jpg",
  "https://res.cloudinary.com/ldvj1h2z/image/upload/q_auto/f_auto/v1782126452/5ayReKkz8RaBVuTvrxgA3rvh_wc0zfo.avif",
  "https://res.cloudinary.com/ldvj1h2z/image/upload/q_auto/f_auto/v1782132048/azbzvpeoigvgm3rt2be3.jpg",
  "https://res.cloudinary.com/ldvj1h2z/image/upload/q_auto/f_auto/v1782132034/gmlzzpybvnldwajjigmo.webp",
  "https://res.cloudinary.com/ldvj1h2z/image/upload/q_auto/f_auto/v1782132020/qzmdgimambeu2h3hzebr.avif",
];


const ProductCard = ({ item }: { item: Product}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const isWishlisted = useAppSelector(selectIsInWishlist(item.id));

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!localStorage.getItem("jwt")) {
      navigate("/login");
      return;
    }

    dispatch(toggleWishlistProduct(item.id));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      navigate("/login");
      return;
    }

    dispatch(
      addItemToCart({
        jwt,
        request: {
          productId: item.id,
          size: item.size,
          quantity: 1,
        },
      })
    );
  };

  useEffect(() => {
    if (!isHovered) return;

    const interval: NodeJS.Timeout = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % item.images.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div onClick={() => navigate(`/product-details/${item.category?.categoryId}/${item.title}/${item.id}`)} className="group px-2 relative">
      <div
        className="card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Images */}
        {item.images.map((image, index) => (
          <img
            key={index}
            className="card-media"
            src={image}
            alt="product"
            style={{
              transform: `translateX(${(index - currentImage) * 100}%)`,
            }}
          />
        ))}

        {/* Buttons */}
        <div className="indicator">
          <div className="flex gap-3">
            <Button className="icon-btn" onClick={handleToggleWishlist}>
              {isWishlisted ? (
                <Favorite sx={{ color: "#F43F5E" }} />
              ) : (
                <FavoriteBorder sx={{ color: "#F43F5E" }} />
              )}
            </Button>

            <Button className="icon-btn" onClick={handleAddToCart}>
              <AddShoppingCart sx={{ color: "#7C3AED" }} />
            </Button>
          </div>
        </div>

        {/* Dots */}
        <div className="dots">
          {item.images.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === currentImage ? "active" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="details group-hover-effect">
        <h1 className="title">{item.seller?.businessDetails.businessName}</h1>
        <p className="subtitle">{item.title}</p>

        <div className="price-row">
          <span className="price">₹{item.sellingPrice}</span>
          <span className="old-price">₹{item.mrpPrice}</span>
          <span className="discount">{item.discountPercent}% OFF</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;