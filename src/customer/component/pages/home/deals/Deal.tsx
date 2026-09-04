import React from "react";
import DealCard from "./DealCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useAppSelector } from "../../../../../State/Store";

const fallbackDeals = [
  {
    title: "Gaming Laptop",
    image: "https://cdn-icons-png.flaticon.com/512/689/689396.png",
    discount: 25,
    categoryId: "laptop",
  },
  {
    title: "Smartphone",
    image: "https://cdn-icons-png.flaticon.com/512/545/545245.png",
    discount: 33,
    categoryId: "smartphone",
  },
  {
    title: "Smart Watch",
    image: "https://cdn-icons-png.flaticon.com/512/2920/2920329.png",
    discount: 45,
    categoryId: "smart-watch",
  },
  {
    title: "Headphones",
    image: "https://cdn-icons-png.flaticon.com/512/3659/3659899.png",
    discount: 50,
    categoryId: "headphones",
  },
];

const Deal = () => {
  const realDeals = useAppSelector((state: any) => state.home.home?.deals);

  const deals =
    realDeals && realDeals.length > 0
      ? realDeals.map((d: any) => ({
          title: d.category?.name,
          image: d.category?.image,
          discount: d.discount,
          categoryId: d.category?.categoryId,
        }))
      : fallbackDeals;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="px-6 py-12 bg-gray-50">
      <h1 className="text-3xl font-bold text-gradient-brand mb-8 text-center">
        Today's Deals 🔥
      </h1>

      <Slider {...settings}>
        {deals.map((item: any) => (
          <div key={item.categoryId} className="px-3">
            <DealCard
              title={item.title}
              image={item.image}
              discount={item.discount}
              categoryId={item.categoryId}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Deal;
