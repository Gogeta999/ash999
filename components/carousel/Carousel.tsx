import React, { useRef } from "react";
import { CarouselData } from "./CarouselData";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import style from "./Carousel.module.css";
import cs from "classnames";
const Carousel = ({ slides }: any) => {
  const [currentImage, setCurrentImage] = React.useState(0);
  const length = slides.length;
  const preImage = currentImage == 0 ? null : currentImage - 1;
  const nextImage = currentImage == slides.length - 1 ? null : currentImage + 1;

  function preSlide() {
    setCurrentImage(currentImage === 0 ? length - 1 : currentImage - 1);
  }
  function nextSlide() {
    setCurrentImage(currentImage === length - 1 ? 0 : currentImage + 1);
  }

  if (!Array.isArray(slides) || slides.length <= 0) {
    null;
  }
  return (
    <div className="flex flex-col">
      <div className={style.carousel}>
        {CarouselData.map((carousel, index) => {
          return (
            <div className="" key={index}>
              {index === preImage && (
                <img
                  src={carousel.image}
                  className={cs(
                    style.preImage,
                    "transition delay-150 duration-300 ease-out"
                  )}
                  alt="Alt Img"
                  onClick={preSlide}
                />
              )}
              {index === currentImage && (
                <img
                  src={carousel.image}
                  className={cs(
                    style.image,
                    "transition delay-150 duration-300 ease-out"
                  )}
                  alt="Alt Img"
                />
              )}

              {index === nextImage && (
                <img
                  src={carousel.image}
                  className={cs(
                    style.nextImage,
                    "transition delay-150 duration-300 ease-out"
                  )}
                  alt="Alt Img"
                  onClick={nextSlide}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
function preSlide() {
  throw new Error("Function not implemented.");
}
