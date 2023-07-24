import { useState } from 'react';
import PropTypes from 'prop-types';

import { ImgListItem, Image, Modal } from 'components';

export const ImageGalleryItem = ({ item }) => {
  const [openModal, setOpenModal] = useState(false);

  const onModal = () => {
    setOpenModal(!openModal);
  };

  const { id, webformatURL, tags, largeImageURL } = item;
  return (
    <div>
      <ImgListItem key={id} onClick={onModal}>
        <Image src={webformatURL} alt={tags} />
      </ImgListItem>
      {openModal && (
        <Modal imageSrc={largeImageURL} imageAlt={tags} onClose={onModal} />
      )}
    </div>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
};
