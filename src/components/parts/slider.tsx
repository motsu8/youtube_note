import Image from 'next/image';
import React from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const images = [
  {
    src: '/service.png',
    id: 0,
  },
  {
    src: '/note.png',
    id: 1,
  },
  {
    src: '/play.png',
    id: 2,
  },
];

function Slider() {
  return (
    <Swiper
      className="w-3/5 h-3/4"
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      loop
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {images.map((obj: { src: string; id: number }) => {
        return (
          <SwiperSlide key={`${obj.id}`}>
            <Image
              className="rounded-lg shadow-lg border-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              src={obj.src}
              layout="responsive"
              width={640}
              height={400}
              alt="test_image"
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Slider;
