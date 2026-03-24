import type { Image } from "../../../types/Image";
import Button from "../global/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SingleImage from "./SingleImage";

type ImageGridProps = {
  images: Image[];
  isTempFiles: boolean;
  removable?: boolean;
  clickable?: boolean;
  onImageRemove?: (newImages: string) => void;
};

const ImageGrid = ({
  images,
  isTempFiles = false,
  removable = false,
  onImageRemove,
  clickable = false,
}: ImageGridProps) => {
  const handleRemoveImage = (image: string | undefined) => {
    if (onImageRemove && image) {
      onImageRemove(image);
    }
  };

  return (
    <div className="image-grid">
      {images.map((image) => {
        return (
          <div key={image.alt} className="single-image mt-1 overflow-x-auto">
            <SingleImage
              image={{ src: image.src, alt: image.alt }}
              isTempFile={isTempFiles}
            />
            {removable && (
              <Button
                btnClass="secondary"
                handleClickFunction={() => handleRemoveImage(image.src)}
              >
                <FontAwesomeIcon icon={"close"} />
              </Button>
            )}
            {clickable && <div>Click</div>}
          </div>
        );
      })}
    </div>
  );
};

export default ImageGrid;
