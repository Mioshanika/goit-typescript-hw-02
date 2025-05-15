import s from './imagegallery.module.css';
import ImageCard from '../imagecard/imagecard';

export default function ImageGallery({ images, onEnlarge }) {
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
