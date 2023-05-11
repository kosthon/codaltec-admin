import { Helmet } from 'react-helmet-async';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

// @mui
import {
  Card,
  Table,
  Stack,
  Button,
  TableBody,
  Container,
  Typography,
  TableContainer,
  Box,
  Modal,
  Input,
  FormControl,
  InputLabel,
  FormHelperText,
  TextField,
} from '@mui/material';
import { UserListHead } from '../sections/@dashboard/user';
// components
import Scrollbar from '../components/scrollbar';
import Iconify from '../components/iconify';
import TableCellPortfolio from '../components/tableCellPortfolio/TableCellPortfolio';

// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'titulo', label: 'Título', alignRight: false },
  { id: 'descripcion', label: 'Descripción', alignRight: false },
  { id: 'products', label: 'Productos', alignRight: false },
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
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: 4,
  flexDirection: 'column',
};
const boxForm = {
  display: 'flex',
  flexDirection: 'column',
};
const formControl = {
  margin: 1,
};

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const url = 'https://codaltec-api.website:3000/api/v1/business/';
  const [portfolio, setPortfolio] = useState([]);
  const [requestData, setRequestData] = useState(new Date());

  const [updateTable, setUpdateTable] = useState(new Date());

  const handleCreatProductSuccess = () => {
    setUpdateTable(new Date());
  };

  useEffect(() => {
    axios.get(url).then((response) => {
      setPortfolio(response.data);
    });
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpenMenu = (event) => {
    setOpen(!false);
  };
  const handleCloseMenu = () => {
    setOpen(false);
  };

  const [titleEsp, setTitleEsp] = useState('');
  const [titleEng, setTitleEng] = useState('');
  const [despEsp, setDespEsp] = useState('');
  const [despEng, setDespEng] = useState('');
  const [youtubeValue, setYoutubeValue] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    await axios
      .post('https://codaltec-api.website:3000/api/v1/business/', {
        youtube: youtubeValue,
        icon: 'https://codaltec.com/assets/Logos/Codaltec_Icono.svg',
        esName: titleEsp,
        enName: titleEng,
        esDescription: despEsp,
        enDescription: despEng
      })
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Elemento creado',
          showConfirmButton: false,
          timer: 2000,
        });
        console.log(response);
        handleCreatProductSuccess();
        setOpen(false);
        resetInputs();
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'warning',
          title: 'Por favor digite datos validos',
          showConfirmButton: true,
        });
      });
  };

  const resetInputs = () => {
    setTitleEsp('');
    setTitleEng('');
    setDespEsp('');
    setDespEng('');
  };


  return (
    <>
      <Helmet>
        <title> Portafolio | CODALTEC </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Portafolio
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenMenu}>
            Crear Linea de negocio
          </Button>

          <Modal open={open !== null && open} onClose={() => setOpen(false)}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h4" component="h1">
                Ingrese los campos para crear una línea de
              </Typography>
              <form method="POST">
                <Box sx={boxForm}>
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

                  <FormControl sx={formControl}>
                    <InputLabel htmlFor="my-input">Link de youtube</InputLabel>
                    <Input type="text" name="youtubeValue" onChange={(e) => setYoutubeValue(e.target.value)} />
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

        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} rowCount={portfolio.length} />
                <TableBody>
                  {portfolio.map((element, index) => (
                    <TableCellPortfolio key={`${element.id}-${index}`} id={element.id} object={element} setRequestData={setRequestData} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
