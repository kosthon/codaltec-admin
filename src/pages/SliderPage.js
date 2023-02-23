import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
// @mui
import { Card, Table, Stack, Button, TableBody, Container, Typography, TableContainer } from '@mui/material';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import TableCellSlider from 'src/components/tableCellSlider/TableCellSlider';
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

// ----------------------------------------------------------------------

export default function SliderPage() {
  const url = 'http://localhost:3000/api/v1/sliders/';
  const [sliders, setSliders] = useState([]);
  const [requestData, setRequestData] = useState(new Date());

  useEffect(() => {
    axios.get(url).then((response) => {
      setSliders(response.data);
    });
  }, [requestData]);

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
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Crear Slider
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} rowCount={sliders.length} />
                <TableBody>
                  {sliders.map((element) => {
                    return (
                      <TableCellSlider
                        key={element.id}
                        object={element}
                        setRequestData={setRequestData}
                      ></TableCellSlider>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
