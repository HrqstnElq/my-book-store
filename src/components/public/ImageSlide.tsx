import Slider from "react-slick";

export default function ImageSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    slidesPerRow: 1,
    variableWidth: true,
    swipeToSlide: true,
  };
  return (
    <Slider {...settings} slide="li">
      <div className="bg-pink-700 rounded-2xl focus:outline-none focus:shadow-lg transform focus:scale-110">
        <img
          className="m-5"
          src="http://res.cloudinary.com/tuanvu/image/upload/v1607998386/Image%20Uploader/hvzayglrpkyticou6bir.png"
          alt=""
        />
      </div>
      <div className="bg-pink-700 rounded-2xl focus:outline-none focus:shadow-lg transform focus:scale-110">
        <img
          className="m-5"
          src="http://res.cloudinary.com/tuanvu/image/upload/v1607998386/Image%20Uploader/hvzayglrpkyticou6bir.png"
          alt=""
        />
      </div>
      <div className="bg-pink-700 rounded-2xl focus:outline-none focus:shadow-lg transform focus:scale-110">
        <img
          className="m-5"
          src="http://res.cloudinary.com/tuanvu/image/upload/v1607998386/Image%20Uploader/hvzayglrpkyticou6bir.png"
          alt=""
        />
      </div>
      <div className="bg-pink-700 rounded-2xl focus:outline-none focus:shadow-lg transform focus:scale-110">
        <img
          className="m-5"
          src="http://res.cloudinary.com/tuanvu/image/upload/v1607998386/Image%20Uploader/hvzayglrpkyticou6bir.png"
          alt=""
        />
      </div>
      <div className="bg-pink-700 rounded-2xl focus:outline-none focus:shadow-lg transform focus:scale-110">
        <img
          className="m-5"
          src="http://res.cloudinary.com/tuanvu/image/upload/v1607998386/Image%20Uploader/hvzayglrpkyticou6bir.png"
          alt=""
        />
      </div>
      <div className="bg-pink-700 rounded-2xl focus:outline-none focus:shadow-lg transform focus:scale-110">
        <img
          className="m-5"
          src="http://res.cloudinary.com/tuanvu/image/upload/v1607998386/Image%20Uploader/hvzayglrpkyticou6bir.png"
          alt=""
        />
      </div>
    </Slider>
  );
}
