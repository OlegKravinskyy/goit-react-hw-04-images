import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow, Image } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handelKeyDown);
  }

  componentWillUnmount() {
    window.addEventListener('keydown', this.handelKeyDown);
  }

  handelKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { modalImage } = this.props;
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalWindow>
          <Image
            key={modalImage.id}
            src={modalImage.img}
            alt={modalImage.tags}
            loading="lazy"
          />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  modalImage: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
