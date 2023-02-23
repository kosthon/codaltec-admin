import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjgsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3NzAyNDczMn0.wqYwSIs-_jf4laiJHrW79YxDQxyCIP2XwK3r6pizIs0';

  const [showPassword, setShowPassword] = useState(false);

  const [userLogin, setUserLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  const data = {
    email: userLogin,
    password: passwordLogin,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios
      .post('http://localhost:3000/api/v1/auth/login/', data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          navigate('/dashboard');
        } else if (response.status === 400 || (data.email === '' && data.password === '')) {
          console.log(response);
          Swal.fire({
            title: 'Digite por favor valores validos',
            icon: 'warning',
          });
        } else {
          console.log(response);
          Swal.fire({
            title: 'Usuario o contraseña inconrrecta!',
            icon: 'warning',
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: 'Usuario o contraseña inconrrecta!',
          icon: 'warning',
        });
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField name="userLogin" label="Email" onChange={(e) => setUserLogin(e.target.value)} />

          <TextField
            name="passwordLogin"
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPasswordLogin(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 2 }}>
          <Link variant="subtitle2" underline="hover">
            Olvido su contraseña?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Iniciar Sesión
        </LoadingButton>
      </form>
    </>
  );
}
