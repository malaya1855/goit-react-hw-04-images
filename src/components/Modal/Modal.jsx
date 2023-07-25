import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalImage } from 'components';

export const Modal = ({ onClose, imageSrc, imageAlt }) => {
  useEffect(() => {
    const keyDown = ev => {
      if (ev.code === 'Escape') {
        onClose();
      }
    };
    return () => {
      window.addEventListener('keydown', keyDown);
    };
  });

  const onHandleClick = ev => {
    if (ev.target === ev.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={onHandleClick}>
      <ModalImage>
        <img src={imageSrc} alt={imageAlt} style={{ pointerEvents: 'auto' }} />
      </ModalImage>
    </Overlay>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
};
