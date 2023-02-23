import { Helmet } from 'react-helmet-async';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// @mui
import { Card, Table, Stack, Button, TableBody, Container, Typography, TableContainer } from '@mui/material';
import { UserListHead } from '../sections/@dashboard/user';
// components
import Scrollbar from '../components/scrollbar';
import Iconify from '../components/iconify';
import TableCellBlogs from 'src/components/tableCellBlogs/TableCellBlogs';

// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'titulo', label: 'Título', alignRight: false },
  { id: 'descripcion', label: 'Descripción', alignRight: false },
  { id: 'products', label: 'Productos', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function BlogPage() {
  const url = 'http://localhost:3000/api/v1/news/';
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
        <title> Portafolio | Minimal UI </title>
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
                    .map((element) => {
                      return (
                        <TableCellBlogs
                          key={element.id}
                          object={element}
                          setRequestData={setRequestData}
                        ></TableCellBlogs>
                      );
                    })
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
