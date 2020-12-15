import { useEffect, useState } from "react";

export default function BannerSlide() {
  const images = [
    "https://thegioidohoacom.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2018/12/11091117/thi%E1%BA%BFt-k%E1%BA%BF-banner-h%E1%BB%99i-ch%E1%BB%A31.png",
    "https://tadc.vn/tadc/uploads/2019/01/Thi%E1%BA%BFt-k%E1%BA%BF-Banner-Website-ch%E1%BA%A1y-qu%E1%BA%A3ng-c%C3%A1o-chu%E1%BA%A9n-size-nh%E1%BA%A5t-2019-1.jpg",
    "https://ps.w.org/simple-banner/assets/banner-1544x500.png?rev=1198696",
    "https://png.pngtree.com/thumb_back/fw800/back_our/20190623/ourmid/pngtree-simple-fashion-geometric-poster-banner-image_242130.jpg",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrent((current + 1) % images.length);
    }, 3000);
    return () => window.clearInterval(interval);
  }, [current, images.length]);

  return (
    <div className="image-slide overflow-hidden my-4 rounded-lg h-48">
      <img className="w-full max-h-48  object-cover bg-white" src={images[current]} alt="" />
    </div>
  );
}
