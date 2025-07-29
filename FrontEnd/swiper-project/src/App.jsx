import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, EffectCards} from 'swiper/modules'
import './app.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import img1 from './assets/img1.png';
import img2 from './assets/img2.jfif';
import img3 from './assets/img3.jfif';
import img4 from './assets/img4.jfif';
import img5 from './assets/img5.jfif';



// no cmd: npm i swiper

function App() {
  const slides = [img1,img2,img3,img4,img5]
  return (
    <>
      <div className="container">
      <Swiper
      modules={[Navigation, Pagination, EffectCards]}
      navigation
      loop
      effect='cards'
      pagination={{ clickable: true }}
      >
        {
          slides.map(slide =>(
            <SwiperSlide>
              <img src={slide} alt={slide} />
            </SwiperSlide>
          ))
        }
      </Swiper>
      </div>
    </>
  )
}

export default App
