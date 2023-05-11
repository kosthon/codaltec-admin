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
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { UserListHead } from '../sections/@dashboard/user';
// components
import Scrollbar from '../components/scrollbar';
import Iconify from '../components/iconify';
import TableCellInternalControl from '../components/tableCellInternalControl/TableCellInternalControl';

// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Nombre', alignRight: false },
  { id: 'date', label: 'Fecha', alignRight: false },
  { id: 'file', label: 'Archivos', alignRight: false },
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

export default function ControlInternoPage() {
  const url = 'https://codaltec-api.website:3000/api/v1/internal-control/';
  const [portfolio, setPortfolio] = useState([]);
  const [requestData, setRequestData] = useState(new Date());

  const [updateTable, setUpdateTable] = useState(new Date());

  const handleCreateElementSuccess = () => {
    setUpdateTable(new Date());
  };

  useEffect(() => {
    axios.get(url).then((response) => {
      setPortfolio(response.data);
    });
  }, [requestData, updateTable]);

  const [open, setOpen] = useState(false);
  const handleOpenMenu = (event) => {
    setOpen(!false);
  };
  const handleCloseMenu = () => {
    setOpen(false);
  };

  const onInputFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const [file, setFile] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const dataFile = new FormData();

    dataFile.append('file', file);
    dataFile.append('name', name);
    dataFile.append('date', date);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    await axios
      .post('https://codaltec-api.website:3000/api/v1/internal-control', dataFile, config)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Elemento creado',
          showConfirmButton: false,
          timer: 2000,
        });
        console.log(response);
        handleCreateElementSuccess();
        setOpen(false);
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

  const resetInputs = () => {
    setFile('');
    setName('');
    setDate('');
  };

  return (
    <>
      <Helmet>
        <title> Control interno | CODALTEC </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Control interno
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenMenu}>
            Crear control interno
          </Button>

          <Modal open={open !== null && open} onClose={() => setOpen(false)}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h4" component="h1">
                Ingrese los campos para crear un nuevo contrato.
              </Typography>
              <form method="POST">
                <Box sx={boxForm}>
                  <FormControl sx={formControl}>
                    <FormHelperText id="my-helper-text">Adjunte un Soporte por favor.</FormHelperText>
                    <Input type="file" name="file" onChange={onInputFileChange} />
                  </FormControl>

                  <FormControl sx={formControl}>
                    <InputLabel htmlFor="my-input">Título</InputLabel>
                    <Input type="text" name="name" onChange={(e) => setName(e.target.value)} />
                  </FormControl>

                  <FormControl sx={formControl}>
                    <InputLabel htmlFor="my-input">Fecha</InputLabel>
                    <Input type="text" name="date" onChange={(e) => setDate(e.target.value)} />
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
                  {portfolio
                    .map((element) => (
                      <TableCellInternalControl key={element.id} object={element} setRequestData={setRequestData} />
                    ))
                    .reverse()}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
