import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const CarouselComponent = ({carouselElements}) => {

    console.log(carouselElements);
  return (
    <Carousel>
        {
            carouselElements.map((message, index) => {
                return (
                <div key={index}>
                    <p>{message.imageResponseCard.subtitle}</p>
                    <p>{message.imageResponseCard.title}</p>
                </div>)
            })
        }
        
    </Carousel>
  )
}

export default CarouselComponent