import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Popover, TableRow, MenuItem, TableCell, IconButton } from '@mui/material';
import Swal from 'sweetalert2';
import Iconify from '../iconify/Iconify';


function TableCellFinancial(props) {
  const { object } = props;
  const [data, setData] = useState([])
  const [deleteCount, setDeleteCount] = useState(false);

  useEffect(() => {
    setData(object);
  }, [deleteCount, object]);

  const handleCreateElementSuccess = () => {
    setDeleteCount(prevState => !prevState);
    setData(object); // Actualizar los datos en el estado local
  };

  const deleteHandler = async (id) => {
    await axios
      .delete(`https://codaltec-api.website:3000/api/v1/financial/${id}`)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Elemento Eliminado',
          showConfirmButton: false,
          timer: 2000,
        });
        handleCreateElementSuccess()
      })
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
    <TableRow hover key={data.id} tabIndex={-1} role="checkbox">
      <TableCell component="th" scope="row">
        {data.id}
      </TableCell>

      <TableCell align="left">{data.name}</TableCell>

      <TableCell align="left">
        <a
          target="_blank"
          download
          href={`https://codaltec-api.website:3000/public/documents/${data.file}`}
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
        {/* <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem> */}

        <MenuItem sx={{ color: 'error.main' }} onClick={() => deleteHandler(data.id)}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </TableRow>
  );
}

export default TableCellFinancial;
