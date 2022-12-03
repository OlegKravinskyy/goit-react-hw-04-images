// import axios from 'axios';
import React, { Component } from 'react';
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

class App extends Component {
  state = {
    images: [],
    searchName: '',
    page: 1,
    status: 'idle',
    showModal: false,
    loadMore: true,
    modalImage: null,
  };

  async componentDidUpdate(_, prevState) {
    const prevQuery = prevState.searchName;
    const newOuery = this.state.searchName;
    const prevPage = prevState.page;
    const newPage = this.state.page;

    if (prevQuery !== newOuery || prevPage !== newPage) {
      this.setState({ status: 'pending', loadMore: true });

      try {
        const result = await getImages(newOuery, newPage);

        if (!result.length) {
          throw new Error();
        }

        if (result.length < 12) {
          this.setState({ loadMore: false });
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...result],
          status: 'resolved',
        }));
      } catch (err) {
        this.setState({ status: 'rejected' });
        NotificationError();
      }
    }
  }

  reset = () => {
    this.setState({ searchName: '' });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  findModalImage = (id, img, tags) => {
    this.setState({ modalImage: { id: id, img: img, tags: tags } });
    console.log(this.modalImage);
  };

  onSubmitBar = name => {
    this.setState({ page: 1, images: [], searchName: name });
  };

  render() {
    const { images, status, showModal, loadMore, modalImage } = this.state;

    if (status === 'idle') {
      return (
        <Wrapper>
          <Searchbar onSubmit={this.onSubmitBar} />
        </Wrapper>
      );
    }

    if (status === 'pending') {
      return (
        <Wrapper>
          <Searchbar onSubmit={this.onSubmitBar} />
          <ImageGallery
            images={images}
            modalImage={this.findModalImage}
            toggleModal={this.toggleModal}
          />
          <Loader />
        </Wrapper>
      );
    }

    if (status === 'resolved') {
      return (
        <Wrapper>
          <Searchbar onSubmit={this.onSubmitBar} />
          <ImageGallery
            images={images}
            modalImage={this.findModalImage}
            toggleModal={this.toggleModal}
          />

          {showModal && (
            <Modal onClose={this.toggleModal} modalImage={modalImage} />
          )}

          {loadMore && <Button loadMore={this.loadMore} />}
          <Toast result={this.result} />
        </Wrapper>
      );
    }

    if (status === 'rejected') {
      return (
        <Wrapper>
          <Searchbar onSubmit={this.onSubmitBar} />
          <Toast />
        </Wrapper>
      );
    }
  }
}

export default App;

//31455811-9a6df857d875f97a3c4a0d670

//https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
