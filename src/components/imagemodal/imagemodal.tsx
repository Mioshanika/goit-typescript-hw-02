import s from './imagemodal.module.css';
import ReactModal from 'react-modal';
import { MdClose } from 'react-icons/md';
import { BiLike } from 'react-icons/bi';
import { FaDownload } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { IImageHit } from '../app/app';

interface IImageModalProps { 
  image: IImageHit;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageModal({ image, isOpen, onClose }:IImageModalProps) {
  ReactModal.setAppElement('#root');
  const authorLink = `https://unsplash.com/@${image.user.username}?utm_source=js_react_gallery&utm_medium=referral`;
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={s.bigger_picture}
      overlayClassName={s.bp_overlay}
      contentLabel="Bigger picture">
      <button onClick={onClose}>
        <MdClose />
      </button>
      <p>
        Photo by {image.user.name}&nbsp;
        <a href={authorLink} target="_blank">
          <ImProfile />
        </a>
      </p>
      {image.description ? <p>"{image.description}"</p> : null}
      <img src={image.urls.regular} alt={image.alt_description} />
      <div className={s.likes_download}>
        <span>
          <BiLike />
          {image.likes}
        </span>
        <a href={image.links.download} target="_blank">
          <FaDownload />
        </a>
      </div>
    </ReactModal>
  );
}
