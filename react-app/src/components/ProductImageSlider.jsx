import { useEffect, useState } from "react";

export default function ProductImageSlider({
  data,
  chosenImage,
  setChosenImage,
}) {
  const [current, setCurrent] = useState(chosenImage ? chosenImage : 0);
  const nextSlide = () => {
    setCurrent(current === data.length - 1 ? 0 : current + 1);
    setChosenImage(current === data.length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? data.length - 1 : current - 1);
    setChosenImage(current === 0 ? data.length - 1 : current - 1);
  };

  useEffect(() => {
    setCurrent(chosenImage ? chosenImage : chosenImage === 0 ? 0 : current);
  }, [chosenImage, current]);

  if (!data || !data.length) return null;
  return (
    <div className="relative w-[50vmin] h-[40vmin] mb-[5vmin]">
      <div className=" text-[4vmin] text-white opacity-80 absolute top-[20vmin] z-[1] rounded-full transition ease-in-out duration-300 left-[1vmin] " onClick={prevSlide}>
        <i className="fa-solid fa-circle-left " />
      </div>
      <div className=" text-[4vmin] text-white opacity-80 absolute top-[20vmin] z-[1] rounded-full transition ease-in-out duration-300 right-[1vmin]" onClick={nextSlide}>
        <i className="fa-solid fa-circle-right" />
      </div>
      {data.map((img, i) => (
        <div className={`transition ease-in-out duration-400 ${i === current ? "opacity-100 scale-100" : "opacity-0 scale-90"}`} key={i}>
          {i === current && (
            <img src={img.url} className="w-[50vmin] h-[40vmin] rounded-xl object-cover" alt="" key={i} />
          )}
        </div>
      ))}
    </div>
  );
}
