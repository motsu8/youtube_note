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
      className="w-5/6 !h-1/2 sm:!h-3/4 md:!h-4/5 lg:!h-5/6"
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
              className="rounded-lg shadow-lg border-2 absolute object-contain !w-full !h-1/2 sm:!h-3/4 md:!h-4/5 lg:!h-5/6 !-translate-y-1/2 !top-1/2 "
              src={obj.src}
              fill
              alt="test_image"
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Slider;
