import { useEffect, useState } from "react";
import type { Image } from "../../../types/Image";
import SingleImage from "./SingleImage";

type SelectableImageGridProps = {
  images: Image[];
};

const SelectableImageGrid = ({ images }: SelectableImageGridProps) => {
  const [activeImage, setActiveImage] = useState<Image | null>(images[0]);

  useEffect(() => {
    const setActiveImageAsync = async () => {
      if (images.length > 0) {
        setActiveImage(images[0]);
      } else {
        setActiveImage(null);
      }
    };
    setActiveImageAsync();
  }, [images]);

  if (images.length === 0)
    return <div className="text-white">No images available</div>;

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      <div className="relative w-full h-[400px] overflow-hidden rounded-lg image-container">
        <SingleImage
          image={{
            src: activeImage?.src,
            alt: activeImage?.alt,
          }}
          imageClass="w-full h-full object-cover transition-all duration-500"
        />
      </div>

      {images && images.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, ind) => (
            <div
              key={ind}
              className={`relative min-w-[100px] h-[80px] cursor-pointer rounded-md overflow-hidden border-2 transition-all 
              ${activeImage?.src === image.src ? "border-[#45b797] scale-105" : "border-transparent opacity-60 hover:opacity-100"}`}
              onClick={() => setActiveImage(image)}
            >
              <SingleImage
                image={{
                  src: image.src,
                  alt: image.alt,
                }}
                imageClass="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SelectableImageGrid;
