import s from './imagecard.module.css';
import { IImageHit } from '../app/app';

interface IImageCardProps { 
  image: IImageHit;
  onEnlarge: (image: IImageHit) => void;
}

export default function ImageCard({ image, onEnlarge }:IImageCardProps) {
  return (
    <div className={s.image_card}>
      <img src={image.urls.small} alt={image.alt_description} onClick={() => onEnlarge(image)} />
    </div>
  );
}
