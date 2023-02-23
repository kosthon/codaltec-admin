import { Helmet } from 'react-helmet-async';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// @mui
import { Card, Table, Stack, Button, TableBody, Container, Typography, TableContainer } from '@mui/material';
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

// ----------------------------------------------------------------------

export default function ContractPage() {
  const url = 'http://localhost:3000/api/v1/contract/';
  const [portfolio, setPortfolio] = useState([]);
  const [requestData, setRequestData] = useState(new Date());

  useEffect(() => {
    axios.get(url).then((response) => {
      setPortfolio(response.data);
    });
  }, [requestData]);
  return (
    <>
      <Helmet>
        <title> Contratación | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Noticias
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Crear Noticia
          </Button>
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
