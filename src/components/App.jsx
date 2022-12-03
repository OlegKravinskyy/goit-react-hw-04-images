import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Wrapper } from './App.styled';
import { getImages } from '../components/Api/api';
import { Modal } from '../components/Modal/Modal';
import { Button } from '../components/Button/Button';
import { Loader } from '../components/Loader/Loader';
import {
  NotificationError,
  Toast,
} from '../components/Notification/Notification';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [loadMore, setLoadMore] = useState(true);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (searchName === '') {
      return;
    }

    const getFetch = async () => {
      setStatus('pending');
      setLoadMore(true);

      try {
        const result = await getImages(searchName, page);

        if (!result.length) {
          throw new Error();
        }

        if (result.length < 12) {
          setLoadMore(false);
        }
        setImages(prevState => [...prevState, ...result]);
        setStatus('resolved');
      } catch (err) {
        setStatus('rejected');
        NotificationError();
      }
    };
    getFetch();
  }, [searchName, page]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const loadMoreImg = () => {
    setPage(loadMore => loadMore + 1);
  };

  const findModalImage = (id, img, tags) => {
    setModalImage({ id: id, img: img, tags: tags });
  };

  const onSubmitBar = name => {
    setPage(1);
    setImages([]);
    setSearchName(name);
  };

  if (status === 'idle') {
    return (
      <Wrapper>
        <Searchbar onSubmit={onSubmitBar} />
      </Wrapper>
    );
  }

  if (status === 'pending') {
    return (
      <Wrapper>
        <Searchbar onSubmit={onSubmitBar} />
        <ImageGallery
          images={images}
          modalImage={findModalImage}
          toggleModal={toggleModal}
        />
        <Loader />
      </Wrapper>
    );
  }

  if (status === 'resolved') {
    return (
      <Wrapper>
        <Searchbar onSubmit={onSubmitBar} />
        <ImageGallery
          images={images}
          modalImage={findModalImage}
          toggleModal={toggleModal}
        />

        {showModal && <Modal onClose={toggleModal} modalImage={modalImage} />}

        {loadMore && <Button loadMore={loadMoreImg} />}
        <Toast />
      </Wrapper>
    );
  }

  if (status === 'rejected') {
    return (
      <Wrapper>
        <Searchbar onSubmit={onSubmitBar} />
        <Toast />
      </Wrapper>
    );
  }
};

export default App;

//31455811-9a6df857d875f97a3c4a0d670

//https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
