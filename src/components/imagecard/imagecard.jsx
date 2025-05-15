import s from './imagecard.module.css';

export default function ImageCard({ image, onEnlarge }) {
  return (
    <div className={s.image_card}>
      <img src={image.urls.small} alt={image.alt_description} onClick={() => onEnlarge(image)} />
    </div>
  );
}
