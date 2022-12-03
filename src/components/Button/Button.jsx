import PropTypes from 'prop-types';
import { LoadMoreButton } from './Button.styled';

export const Button = ({ loadMore }) => {
  return (
    <LoadMoreButton type="button" onClick={loadMore}>
      Load More
    </LoadMoreButton>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
