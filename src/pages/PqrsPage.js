import { Helmet } from 'react-helmet-async';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// @mui
import { Card, Table, Stack, TableBody, Container, Typography, TableContainer } from '@mui/material';
import { UserListHead } from '../sections/@dashboard/user';
// components
import Scrollbar from '../components/scrollbar';
import TableCellPqrs from 'src/components/tableCellPqrs/TableCellPqrs';

// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'persona', label: 'Persona', alignRight: false },
  { id: 'subject', label: 'Tipo de solicitud', alignRight: false, maxWidth: 120 },
  { id: 'solicitud', label: 'Solicitud', alignRight: false },
  { id: 'file', label: 'Archivo', alignRight: false, maxWidth: 100 },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function PqrsPage() {
  const url = 'http://localhost:3000/api/v1/pqrs/';
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
            PQRSD
          </Typography>
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
                        <TableCellPqrs
                          key={element.id}
                          object={element}
                          setRequestData={setRequestData}
                        ></TableCellPqrs>
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
