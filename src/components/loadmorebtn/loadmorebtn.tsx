import s from './loadmorebtn.module.css';

interface ILoadMoreBtnProps { 
  onClick: () => void;
}

export default function LoadMoreBtn({ onClick }: ILoadMoreBtnProps) {
  return (
    <button onClick={onClick} className={s.load_more}>
      Load more photos
    </button>
  );
}
