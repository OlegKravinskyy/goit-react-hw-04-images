import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
// import { ImageItem } from 'components/ImageGalleryItem/ImageGalleryItem.styled';
export const ImageGallery = ({ images, modalImage, toggleModal }) => {
  return (
    <ImageGalleryList class="gallery">
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          imageData={image}
          modalImage={() =>
            modalImage(image.id, image.largeImageURL, image.tags)
          }
          toggleModal={() => toggleModal()}
        ></ImageGalleryItem>
      ))}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  modalImage: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
