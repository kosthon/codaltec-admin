import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import {
  Popover,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Table,
  Stack,
  Button,
  TableBody,
  Typography,
  Box,
  Modal,
  Input,
  FormControl,
  InputLabel,
  FormHelperText,
  TextField,
} from '@mui/material';
import Iconify from '../iconify/Iconify';
import { UserListHead } from '../../sections/@dashboard/user';

const TABLE_HEAD = [
  { id: 'descripcion', label: 'Descripción', alignRight: false },
  { id: 'imagen', label: 'Imagen', alignRight: false },
  { id: '' },
  { id: '' },
];

const style = {
  display: 'flex',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  minWidth: 300,
  maxWidth: 900,
  maxHeight: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: 4,
  flexDirection: 'column',
};
const table = {
  overflowY: 'scroll',
  marginTop: 2,
  marginBottom: 2,
};
const formControl = {
  margin: 1,
};
const boxForm = {
  display: 'flex',
  flexDirection: 'column',
};

function TableCellPortfolio(props) {
  const [propiedades, setPropiedades] = useState([])

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [openProducts, setOpenProducts] = useState(false);
  const [openModalProducts, setOpenModalProducts] = useState(false);

  const deleteHandler = async (id) => {
    await axios
      .delete(`https://codaltec-api.website:3000/api/v1/business/${id}`)
      .then(props.setRequestData(new Date()))
      .catch((err) => console.log(err));
  };

  const deleteHandlerProduct = async (id) => {
    await axios
      .delete(`https://codaltec-api.website:3000/api/v1/products/${id}`)
      .then(props.setRequestData(new Date()))
      .catch((err) => console.log(err));
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
 // -----------------------------------------------------------------
  const handleOpenModal = (event) => {
    setOpenModal(!false);
    
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setOpen(false);
  };
// -----------------------------------------------------------------
  const handleOpenModalProducts = (event) => {
    setOpenModalProducts(!false);
   
  };

  const handleCloseModalProducts = () => {
    setOpenModalProducts(false);
    setOpenProducts(false);
  };
// -----------------------------------------------------------------
  const onInputFileChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const [file, setFile] = useState('');
  const [titleEsp, setTitleEsp] = useState('');
  const [titleEng, setTitleEng] = useState('');
  const [despEsp, setDespEsp] = useState('');
  const [despEng, setDespEng] = useState('');

  const resetInputs = () => {
    setFile('');
    setTitleEsp('');
    setTitleEng('');
    setDespEsp('');
    setDespEng('');
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const dataFile = new FormData();

    dataFile.append('businessId', props.object.id);
    dataFile.append('image', file);
    dataFile.append('esName', titleEsp);
    dataFile.append('enName', titleEng);
    dataFile.append('esDescription', despEsp);
    dataFile.append('enDescription', despEng);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    await axios
      .post(`https://codaltec-api.website:3000/api/v1/products`, dataFile, config)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Elemento creado',
          showConfirmButton: false,
          timer: 2000,
        });
        console.log(response);
        setOpenModal(false);
        resetInputs();
      })
      .catch((error) => {
        Swal.fire({
          icon: 'warning',
          title: 'Por favor digite datos validos',
          showConfirmButton: true,
        });
      });
  };

  console.log(props); 

  useEffect(() => {
    setPropiedades(props.object.products)
  },[])
  return (
    <TableRow tabIndex={-1} id={props.id}  >
      <TableCell component="th" scope="row">
        {props.object.id}
      </TableCell>

      <TableCell align="left">{props.object.esName}</TableCell>

      <TableCell align="left">{props.object.esDescription}</TableCell>

      <TableCell align="left">
        {props.object.products.map((product) => (
          <p key={product.id}>{product.esName}</p>
        ))} 
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
        <MenuItem onClick={handleOpenModal}>
          <Iconify icon={'eva:plus'} sx={{ mr: 2 }} />
          Productos
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={() => deleteHandler(props.object.id)}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <Modal open={openModal !== null && openModal} onClose={() => setOpenModal(false)}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h3">
            Productos de: {props.object.esName}
          </Typography>
          <Box sx={table}>
            <Table>
              <UserListHead headLabel={TABLE_HEAD} />
              <TableBody>
                {propiedades.map((ele) => (
                  <TableRow key={ele.id} id={ele.id }>
                    <TableCell width={70}>{ele.esName}</TableCell>
                    <TableCell width={200}>{ele.esDescription.slice(0, 80)}...</TableCell>
                    <TableCell>
                      <img
                        alt={props.object.esTitle}
                        src={`https://codaltec-api.website:3000/public/images/${ele.image}`}
                        width="100"
                      />
                    </TableCell>
                    <TableCell>
                      <MenuItem sx={{ color: 'error.main' }} onClick={() => deleteHandler(ele.id)}>
                        <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                        Delete
                      </MenuItem>
                    </TableCell>
                  </TableRow>
                ))} 
              </TableBody>
            </Table> 
          </Box>

          <Stack spacing={2}>
            <Button variant='contained' startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenModalProducts}>
              Crear producto
            </Button>
            <Button variant="outline" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Modal  open={openModalProducts !== null && openModalProducts} onClose={() => setOpenModalProducts(false)}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h1">
            Ingrese los campos para crear una línea de
          </Typography>
          <form method="POST">
            <Box sx={boxForm}>
              <FormControl sx={formControl}>
                <FormHelperText id="my-helper-text">Adjunte una imagen por favor.</FormHelperText>
                <Input type="file" name="file" onChange={onInputFileChange} />
              </FormControl>

              <FormControl sx={formControl}>
                <InputLabel htmlFor="my-input">Título en Español</InputLabel>
                <Input type="text" name="esName" onChange={(e) => setTitleEsp(e.target.value)} />
              </FormControl>

              <FormControl sx={formControl}>
                <InputLabel htmlFor="my-input">Título en Ingles</InputLabel>
                <Input type="text" name="enName" onChange={(e) => setTitleEng(e.target.value)} />
              </FormControl>

              <FormControl sx={formControl}>
                <TextField
                  label="Descripción en Español"
                  multiline
                  rows={4}
                  name="despEsp"
                  onChange={(e) => setDespEsp(e.target.value)}
                />
              </FormControl>

              <FormControl sx={formControl}>
                <TextField
                  label="Descripción en Ingles"
                  multiline
                  rows={4}
                  name="despEng"
                  onChange={(e) => setDespEng(e.target.value)}
                />
              </FormControl>

              <Stack spacing={1}>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={onSubmitForm}>
                  Guardar
                </Button>
                <Button variant="outlined" onClick={handleCloseMenu}>
                  Cerrar
                </Button>
              </Stack>
            </Box>
          </form>
        </Box>
      </Modal> 

    </TableRow>
  );
}

export default TableCellPortfolio;
