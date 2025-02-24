import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import './CarouselComponent.css'

export const CarouselComponent = ({ meals }) => {
  return (
    <div className="carousel">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={16}
          slidesPerView={1}
          effect="fade"
          speed={800} 
        >
          {meals.map((meal) => (
            <SwiperSlide key={meal.idMeal}>
              <div className="recipe">
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <p>{meal.strMeal}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
  )
}
