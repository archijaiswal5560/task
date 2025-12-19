'use client';

import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        'https://dummyjson.com/auth/login',
        {
          username: username.trim(),
          password: password.trim(),
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      useAuthStore.getState().login(res.data.token);
      router.replace('/dashboard/users');
    } catch {
      alert('Invalid username or password');
    }
  };

  return (
    <Box display="flex" height="100vh" alignItems="center" justifyContent="center">
      <Box width={320}>
        <Typography variant="h5" mb={2}>
          Admin Login
        </Typography>

        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Box>
  );
}
