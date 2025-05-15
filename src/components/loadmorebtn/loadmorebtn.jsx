import s from './loadmorebtn.module.css';

export default function LoadMoreBtn({ onClick }) {
  return (
    <button onClick={onClick} className={s.load_more}>
      Load more photos
    </button>
  );
}
