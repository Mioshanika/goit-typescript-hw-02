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

export default function App() {
  // API states
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState('badger');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  // Modal states
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viewedImg, setViewedImg] = useState(() => {
    if (hits.length) return hits[0];
    return {
      alt_description: 'Image not found',
      description: '',
      likes: 0,
      urls: { regular: '/react.svg' },
      user: { username: 'notFound', name: 'Unknown' },
      links: { download: '/react.svg' },
    };
  });
  // Functions
  const handleQueryChange = newQuery => {
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
  const handleEnlarge = image => {
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
        const apiData = await requestData(query, page, cancelQuery.signal);
        setHits(prev => [...prev, ...apiData.results]);
        setTotalPages(apiData.total_pages);
      } catch (err) {
        if (err.code !== 'ERR_CANCELED') {
          setErrMsg(err.message);
          toast.error('Query error occured');
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
