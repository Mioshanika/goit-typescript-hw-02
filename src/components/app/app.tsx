import { useState, useEffect } from 'react';
import s from './app.module.css';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../searchbar/searchbar';
import ErrorMessage from '../errormessage/errormessage';
import ImageGallery from '../imagegallery/imagegallery';
import Loader from '../loader/loader';
import LoadMoreBtn from '../loadmorebtn/loadmorebtn';
import ImageModal from '../imagemodal/imagemodal';
import { requestData } from '../../services/api';

export interface IImageHit {
  id: string;
  alt_description: string | undefined;
  description: string | undefined;
  likes: number;
  urls: {
    small: string;
    regular: string;
  };
  user: {
    username: string;
    name: string;
  };
  links: { download: string; };
}
export interface IApiResponse {
  total: number;
  total_pages: number;
  results: IImageHit[];
}

export default function App() {
  // API states
  const [hits, setHits] = useState<IImageHit[]>([]);
  const [query, setQuery] = useState<string>('badger');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>('');
  // Modal states
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [viewedImg, setViewedImg] = useState<IImageHit>(() => {
    if (hits.length) return hits[0];
    return {
      id: 'notFound',
      alt_description: 'Image not found',
      description: '',
      likes: 0,
      urls: { small: '/react.svg', regular: '/react.svg' },
      user: { username: 'notFound', name: 'Unknown' },
      links: { download: '/react.svg' },
    };
  });
  // Functions
  const handleQueryChange = (newQuery: string) => {
    if (!newQuery.trim()) return toast.error('Nothing to query');
    setQuery(newQuery);
    setHits([]);
    setPage(1);
  };
  const nextPage = () => {
    setPage(page + 1);
  };
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleEnlarge = (image: IImageHit) => {
    setViewedImg(image);
    openModal();
  };
  // Begin
  useEffect(() => {
    const cancelQuery = new AbortController();
    const handleSearch = async () => {
      try {
        setIsLoading(true);
        setErrMsg('');
        const apiData = await requestData<IApiResponse>(query, page, cancelQuery.signal);
        setHits(prev => [...prev, ...apiData.results]);
        setTotalPages(apiData.total_pages);
      } catch (err) {
        if (err && typeof err === 'object' && 'code' in err) { 
          if (err.code !== 'ERR_CANCELED') {
            setErrMsg((err as any).message || 'Unknown error');
            toast.error('Query error occurred');
          }
        } else if (err instanceof Error) {
          setErrMsg(err.message);
          toast.error('Query error occurred');
        } else {
          setErrMsg('Unknown error');
          toast.error('Unknown error');
        }
      } finally {
        setIsLoading(false);
      }
    };
    handleSearch();
    return () => {
      cancelQuery.abort();
    };
  }, [query, page]);
  return (
    <>
      <Toaster
        toastOptions={{
          position: 'top-right',
          className: '',
          style: {
            border: '1px solid var(--bg-color)',
            padding: '0 0 0 8px',
            color: 'var(--bg-color)',
            backgroundColor: 'var(--txt-color)',
          },
        }}
      />
      <SearchBar onSubmit={handleQueryChange} />
      <div className={s.container}>
        <ImageGallery images={hits} onEnlarge={handleEnlarge} />
        {errMsg && <ErrorMessage message={errMsg} />}
        {isLoading && <Loader />}
        {page < totalPages && !isLoading && !errMsg && <LoadMoreBtn onClick={nextPage} />}
        <ImageModal image={viewedImg} isOpen={modalIsOpen} onClose={closeModal} />
      </div>
    </>
  );
}
