import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
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
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import TableCellSlider from '../components/tableCellSlider/TableCellSlider';
// sections
import { UserListHead } from '../sections/@dashboard/user';
// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'titulo', label: 'Título', alignRight: false },
  { id: 'descripcion', label: 'Descripción', alignRight: false },
  { id: 'imagen', label: 'Imagen', alignRight: false },
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

export default function SliderPage() {
  const url = 'https://codaltec-api.website:3000/api/v1/sliders/';
  const [sliders, setSliders] = useState([]);
  const [requestData, setRequestData] = useState(new Date());

  const [updateTable, setUpdateTable] = useState(new Date());

  const handleCreateSliderSuccess = () => {
    setUpdateTable(new Date());
  };

  useEffect(() => {
    axios.get(url).then((response) => {
      setSliders(response.data);
    });
  }, [requestData, updateTable]);

  const [open, setOpen] = useState(false);
  const handleOpenMenu = (event) => {
    setOpen(!false);
  };
  const handleCloseMenu = () => {
    setOpen(false);
  };

  const [file, setFile] = useState('');
  const [titleEsp, setTitleEsp] = useState('');
  const [titleEng, setTitleEng] = useState('');
  const [despEsp, setDespEsp] = useState('');
  const [despEng, setDespEng] = useState('');

  const onInputFileChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const dataFile = new FormData();

    dataFile.append('image', file);
    dataFile.append('esTitle', titleEsp);
    dataFile.append('enTitle', titleEng);
    dataFile.append('esDescription', despEsp);
    dataFile.append('enDescription', despEng);

    await axios
      .post('https://codaltec-api.website:3000/api/v1/sliders', dataFile, config)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Elemento creado',
          showConfirmButton: false,
          timer: 2000,
        });
        console.log(response);
        handleCreateSliderSuccess();
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
    setTitleEsp('');
    setTitleEng('');
    setDespEsp('');
    setDespEng('');
  };

  return (
    <>
      <Helmet>
        <title> Sliders</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Sliders Home
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenMenu}>
            Crear Slider
          </Button>

          <Modal open={open !== null && open} onClose={() => setOpen(false)}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h4" component="h1">
                Ingrese los campos para crear un Slider
              </Typography>
              <form method="POST">
                <Box sx={boxForm}>
                  <FormControl sx={formControl}>
                    <FormHelperText id="my-helper-text">Adjunte una imagen por favor.</FormHelperText>
                    <Input type="file" name="file" onChange={onInputFileChange} />
                  </FormControl>

                  <FormControl sx={formControl}>
                    <InputLabel htmlFor="my-input">Título en Español</InputLabel>
                    <Input type="text" name="titleEsp" onChange={(e) => setTitleEsp(e.target.value)} />
                  </FormControl>

                  <FormControl sx={formControl}>
                    <InputLabel htmlFor="my-input">Título en Ingles</InputLabel>
                    <Input type="text" name="titleEng" onChange={(e) => setTitleEng(e.target.value)} />
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
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} rowCount={sliders.length} />
                <TableBody>
                  {sliders.map((element) => (
                    <TableCellSlider key={element.id} object={element} setRequestData={setRequestData} />
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
