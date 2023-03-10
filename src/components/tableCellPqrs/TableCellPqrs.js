import React, { useState } from 'react';
import axios from 'axios';
import { Popover, TableRow, MenuItem, TableCell, IconButton } from '@mui/material';
import Iconify from '../iconify/Iconify';

function TableCellPqrs(props) {
  const deleteHandler = async (id) => {
    await axios
      .delete(`https://codaltec-api.website:3000/api/v1/pqrs/${id}`)
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
        {props.object.state}
      </TableCell>

      <TableCell align="left" style={{ width: 200 }}>
        <p>Tipo de persona: {props.object.typePerson}</p>
        <p>
          Nombre: {props.object.name} {props.object.apellidos}
        </p>
        <p>
          Documento: {props.object.typeDocument} - {props.object.document}
        </p>
        <p>Mail: {props.object.email}</p>
      </TableCell>

      <TableCell style={{ width: 120 }} align="left">
        {props.object.subject}
      </TableCell>

      <TableCell align="left">{props.object.description}</TableCell>
      <TableCell align="left" style={{ width: 100 }}>
        <a
          target="_blank"
          download
          href={`https://codaltec-api.website:3000/public/documents/${props.object.file}`}
          rel="noopener noreferrer"
        >
          <img alt="" src="/assets/icons/carpeta.svg" style={{ width: 30, height: 30 }} />
        </a>
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
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={() => deleteHandler(props.object.id)}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </TableRow>
  );
}

export default TableCellPqrs;
