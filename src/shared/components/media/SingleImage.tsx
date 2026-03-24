import { PATHS } from "../../../constants/paths";
import { useState } from "react";
import type { Image } from "../../../types/Image";

type ImageProp = {
  image: Image;
  isTempFile?: boolean;
  imageClass?: string;
  width?: string;
  height?: string;
};

const SingleImage = ({
  image,
  isTempFile = false,
  imageClass,
  width,
  height,
}: ImageProp) => {
  const basePath = isTempFile ? PATHS.GET_TEMP_FILE : PATHS.GET_FILE;

  const [isDefaultImage, setIsDefaultImage] = useState<boolean>(false);

  const handleImageError = () => {
    console.log("error");

    setIsDefaultImage(true);
  };

  return (
    <>
      {image?.src && (
        <img
          style={{
            width,
            height,
            objectFit: "cover",
            objectPosition: "center",
          }}
          className={"image-element " + (imageClass ? imageClass : "")}
          src={basePath(image.src)}
          alt={image.alt}
          onError={handleImageError}
        />
      )}

      {(!image?.src || isDefaultImage) && (
        <img
          style={{ width, height, objectFit: "cover" }}
          className={"image-element " + (imageClass ? imageClass : "")}
          src={basePath("default.jpg")}
          alt={image.alt}
        />
      )}
    </>
  );
};

export default SingleImage;
