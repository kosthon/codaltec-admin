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
import TableCellContract from '../components/tableCellContract/TableCellContract';

// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'process', label: 'Proceso', alignRight: false },
  { id: 'purpose', label: 'Objeto', alignRight: false },
  { id: 'amount', label: 'Cuantia', alignRight: false },
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

export default function ContractPage() {
  const url = 'http://localhost:3000/api/v1/contract/';
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
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const [file, setFile] = useState('');
  const [processNumber, setProcessNumber] = useState('');
  const [processType, setProcessType] = useState('');
  const [state, setState] = useState('');
  const [purpose, setPurpose] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const dataFile = new FormData();

    dataFile.append('file', file);
    dataFile.append('processNumber', processNumber);
    dataFile.append('processType', processType);
    dataFile.append('state', state);
    dataFile.append('purpose', purpose);
    dataFile.append('amount', amount);
    dataFile.append('date', date);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    await axios
      .post('http://localhost:3000/api/v1/contract', dataFile, config)
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
    setProcessNumber('');
    setProcessType('');
    setState('');
    setPurpose('');
    setAmount('');
    setDate('');
  };
  return (
    <>
      <Helmet>
        <title> Contratación | CODALTEC </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Contratación
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenMenu}>
            Crear contrato
          </Button>

          <Modal open={open !== null && open} onClose={() => setOpen(false)}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h4" component="h1">
                Ingrese los campos para crear un nuevo contrato.
              </Typography>
              <form method="POST">
                <Box sx={boxForm}>
                  <FormControl sx={formControl}>
                    <FormHelperText id="my-helper-text">Adjunte una imagen por favor.</FormHelperText>
                    <Input type="file" name="file" onChange={onInputFileChange} />
                  </FormControl>

                  <FormControl sx={formControl}>
                    <InputLabel htmlFor="my-input">Número de proceso</InputLabel>
                    <Input type="text" name="processNumber" onChange={(e) => setProcessNumber(e.target.value)} />
                  </FormControl>

                  <FormControl sx={formControl}>
                    <InputLabel htmlFor="my-input">Tipo de proceso</InputLabel>
                    <Input type="text" name="processType" onChange={(e) => setProcessType(e.target.value)} />
                  </FormControl>

                  <FormControl sx={formControl}>
                    <InputLabel>Estado del contrato</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={state}
                      onChange={handleChange}
                      label={'Estado del contrato'}
                    >
                      <MenuItem value={'En proceso'}>En proceso</MenuItem>
                      <MenuItem value={'Culminado'}>Culminado</MenuItem>
                      <MenuItem value={'Otro'}>Otro</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl sx={formControl}>
                    <InputLabel htmlFor="my-input">Proposito u objeto</InputLabel>
                    <Input type="text" name="purpose" onChange={(e) => setPurpose(e.target.value)} />
                  </FormControl>

                  <FormControl sx={formControl}>
                    <InputLabel htmlFor="my-input">Cuantia</InputLabel>
                    <Input type="text" name="amount" onChange={(e) => setAmount(e.target.value)} />
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
                      <TableCellContract key={element.id} object={element} setRequestData={setRequestData} />
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
