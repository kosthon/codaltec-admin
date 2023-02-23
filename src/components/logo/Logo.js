import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link } from '@mui/material';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  // OR using local (public folder)
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 40,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto',
        borderRadius: '50%',
        padding: '5px',
        ...sx,
      }}
      {...other}
    >
      <img alt="Codaltec LOGO" src="/assets/Codaltec_Icono.svg" />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <Box>{logo}</Box>;
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
