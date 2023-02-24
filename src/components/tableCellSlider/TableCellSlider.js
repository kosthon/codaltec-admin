import React, { useState } from 'react';
import axios from 'axios';
import { Popover, TableRow, MenuItem, TableCell, IconButton } from '@mui/material';
import Iconify from '../iconify/Iconify';

function TableCellSlider(props) {
  const deleteHandler = async (id) => {
    await axios
      .delete(`https://codaltec-api.website:3000/api/v1/sliders/${id}`)
      .then(props.setRequestData(new Date()))
      .catch((err) => console.log(err));
  };

  const [open, setOpen] = useState(null);
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  return (
    <TableRow hover key={props.object.id} tabIndex={-1} role="checkbox">
      <TableCell component="th" scope="row">
        {props.object.id}
      </TableCell>

      <TableCell align="left">{props.object.esTitle}</TableCell>

      <TableCell align="left">{props.object.esDescription}</TableCell>

      <TableCell align="left">
        <img
          alt={props.object.esTitle}
          src={`https://codaltec-api.website:3000/public/images/${props.object.image}`}
          width="100"
        />
      </TableCell>

      <TableCell align="right">
        <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
          <Iconify icon={'eva:more-vertical-fill'} />
        </IconButton>
      </TableCell>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        {/* <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem> */}

        <MenuItem sx={{ color: 'error.main' }} onClick={() => deleteHandler(props.object.id)}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </TableRow>
  );
}

export default TableCellSlider;
