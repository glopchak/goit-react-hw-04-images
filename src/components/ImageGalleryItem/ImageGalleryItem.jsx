export const ImageGalleryItem = ({
    largeImageURL,
    webformatURL,
    toggleModal,
  }) => {
    return (
      <li className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={webformatURL}
          alt=""
          onClick={() => toggleModal(largeImageURL)}
        />
      </li>
    );
  };