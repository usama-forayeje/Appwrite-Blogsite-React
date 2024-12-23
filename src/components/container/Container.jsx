import PropTypes from 'prop-types';

function Container({ children }) {
  return <div className="w-full px-4 mx-auto max-w-7xl">{children}</div>;
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
