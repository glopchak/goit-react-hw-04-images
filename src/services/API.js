import axios from 'axios';

const API_KEY = '27854076-b3a96c006ceb1c322db1c0d19';
export const fetchImages = async (guery, page) => {
  const images = await axios.get(
    `https://pixabay.com/api/?q=${guery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return images.data;
};