import axios from 'axios';

export const getImages = async (newQuery, newPage) => {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '31455811-9a6df857d875f97a3c4a0d670',
      q: newQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page: newPage,
    },
  });
  return response.data.hits;
};
