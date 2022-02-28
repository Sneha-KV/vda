import React, { useState } from 'react';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import '../../../assets/sliderStyles.scss'

const CarouselComponent = ({carouselElements}) => {

    const [current, setCurrent] = useState(0);
    const length = carouselElements.length;
    
    // console.log(carouselElements); 
    const openSlide = (slideData) => {
        console.log(slideData);
    }


    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
      };
    
      const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
      };
    
      if (!Array.isArray(carouselElements) || carouselElements.length <= 0) {
        return null;
      }

    
  return (
    // carouselElements.map((message)=> <> <p className={'place-name'}> {message.imageResponseCard.title.split('Cusine:')[0]}</p></> )
    <section className='slider'>
        
        {
        carouselElements.map((slide, index) => {
        let elementData = slide.imageResponseCard.title.split(';');
        return (
                <div key={index} className={`container slider-container ${index === current ? 'slide active' : 'slide'}`}>
                    {
                        index === current && (
                            <div>
                                <img className= {'slide-image image'} alt={'location-image'} src={'https://cache.marriott.com/content/dam/marriott-renditions/NYCMQ/nycmq-broadway-lounge-6090-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=750px:*'} />
                                <div className='slide-info'>
                                    <span className='slide-title'>{elementData[0]}</span>
                                    <span className ='additional-info'>
                                        <span className="icon-arrow-right" onClick={() => openSlide(slide.imageResponseCard)}></span>
                                    </span>
                                </div>
                            </div>
                        )
                    }
                    
                </div>
            )
        })
    }
        {
            length > 1 &&
            <div className='navigate-slider'>
                <span className='left-arrow icon-forward-arrow slide-arrow' onClick={nextSlide}></span>
                <span className='right-arrow icon-forward-arrow slide-arrow' onClick={prevSlide}></span>
            </div>
        }
    
    </section>
  )
}

export default CarouselComponent

{/* <Carousel showArrows={true} infiniteLoop={true}>
            
{
    carouselElements.map((message, index) => {
        let title = message.imageResponseCard.title;
        let locationDetails = title.split(';');
        console.log(locationDetails);
        return (
            <div className={'carousel-element'} key={index}>
                <div className={'mb-3 carousel-card'} key={index}>
                    <img src={'https://cache.marriott.com/content/dam/marriott-renditions/NYCMQ/nycmq-broadway-lounge-6090-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=750px:*'} />
                    <p className={'card-title place-name'}>{locationDetails[0]}</p>
                    <p className={'cusine'}>{locationDetails[1]}</p>
                    
                    <p className={'card-description'}>{message.imageResponseCard.subtitle}</p>
                    <p className={'dress-code icon-hangers'}> Dress Code: {locationDetails}</p>
                </div>
            </div>)
        
    })
}


</Carousel> */}