'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Stack,
} from '@mui/material';

export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/users/${id}`);
        setUser(res.data);
      } catch (err) {
        setError('Failed to load user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={5}>
        {error}
      </Typography>
    );
  }

  return (
    <Box p={3}>
      <Button variant="outlined" onClick={() => router.push('/dashboard/users')}>
        ← Back to Users
      </Button>

      <Paper elevation={3} sx={{ mt: 3, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {user.firstName} {user.lastName}
        </Typography>

        <Stack spacing={1}>
          <Typography>Email: {user.email}</Typography>
          <Typography>Phone: {user.phone}</Typography>
          <Typography>Gender: {user.gender}</Typography>
          <Typography>Age: {user.age}</Typography>
          <Typography>
            Company: {user.company?.name}
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
