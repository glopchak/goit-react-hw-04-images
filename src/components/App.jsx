import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { SearchBar } from './Searchbar/Searchbar';
import { fetchImages } from 'services/API';

export class App extends Component {
  state = {
    images: [],
    isLoding: false,
    query: '',
    page: 1,
    isModalOpen: false,
    modalImage: '',
  };
  totalPages = 0;
  
  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoding: true });
      fetchImages(query, page)
        .then(images => {
          this.setState(prev => ({
            images: page === 1 ? images.hits : [...prev.images, ...images.hits],
          }));
          this.totalPages = images.totalHits;
        })
        .catch(error => console.log(error))
        .finally(() => this.setState({ isLoding: false }));
    }
  }

  onSubmit = e => {
    e.preventDefault();
    this.setState({ query: e.target.elements.query.value, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  toggleModal = image => {
    if (image) {
      this.setState({ isModalOpen: true, modalImage: image });
      return;
    }
    this.setState({ isModalOpen: false, modalImage: '' });
  };

  render() {
    return (
      <div className="App">
        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery
          images={this.state.images}
          toggleModal={this.toggleModal}
        />
        {this.state.isLoding && <Loader />}
        {this.state.images.length > 0 &&
          this.totalPages > 1 &&
          !this.state.isLoding && (
            <Button handleLoadMore={this.handleLoadMore} />
          )}
        {this.state.isModalOpen && (
          <Modal
            modalImage={this.state.modalImage}
            toggleModal={this.toggleModal}
          />
        )}
      </div>
    );
  }
}