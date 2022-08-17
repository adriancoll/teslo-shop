import { FC } from "react";
import { Slide } from "react-slideshow-image";

import styles from "./ProductSlideShow.module.css";

interface Props {
  images: string[];
}

export const SlideShow: FC<Props> = ({ images }) => {
  return (
    <Slide easing="cubic-in" duration={7000} indicators>
      {images.map((image, index) => {
        const url = `/products/${image}`;
        return (
          <div className={styles["each-slide"]} key={index}>
            <div
              style={{
                backgroundImage: `url(${url})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
        );
      })}
    </Slide>
  );
};
