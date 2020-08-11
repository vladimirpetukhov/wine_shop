import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Icon } from '@material-ui/core';
const NavLink = ({ to, icon, title, handler, children }) => {
  return children ? (
    <Link to={to}>{children}</Link>
  ) : (
    <Button onClick={handler ? handler : undefined}>
      <Link to={to}>
        <Icon>{icon}</Icon> {title}
      </Link>
    </Button>
  );
};

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.string,
  title: PropTypes.string,
  handler: PropTypes.func,
  children: PropTypes.node
}

export default NavLink;
