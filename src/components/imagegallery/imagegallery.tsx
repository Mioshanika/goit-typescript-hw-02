import s from './imagegallery.module.css';
import ImageCard from '../imagecard/imagecard';
import { IImageHit } from '../app/app';

interface IImageGalleryProps { 
  images: IImageHit[];
  onEnlarge: (image: IImageHit) => void;
}
export default function ImageGallery({ images, onEnlarge }:IImageGalleryProps) {
  return (
    <ul className={s.image_gallery}>
      {images.map(image => (
        <li key={image.id}>
          <ImageCard image={image} onEnlarge={onEnlarge} />
        </li>
      ))}
    </ul>
  );
}
