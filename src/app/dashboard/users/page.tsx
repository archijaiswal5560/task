'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  CircularProgress,
  TextField,
  Button,
  Typography,
} from '@mui/material';

export default function UsersPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const {
    users,
    loading,
    fetchUsers,
    searchUsers,
    skip,
    limit,
    total,
  } = useUserStore();

  // Initial load
  useEffect(() => {
    fetchUsers(limit, skip);
  }, [fetchUsers, limit, skip]);

  // Search handler
  const handleSearch = (value: string) => {
    setSearch(value);

    if (value.trim() === '') {
      fetchUsers(limit, 0); // reset list
    } else {
      searchUsers(value);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      {/* 🔍 Search */}
      <TextField
        fullWidth
        label="Search users"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      {/* Users Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Phone</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((u) => (
            <TableRow
              key={u.id}
              hover
              sx={{ cursor: 'pointer' }}
              onClick={() =>
                router.push(`/dashboard/users/${u.id}`)
              }
            >
              <TableCell>
                {u.firstName} {u.lastName}
              </TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.gender}</TableCell>
              <TableCell>{u.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination (disabled during search) */}
      {search.trim() === '' && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Button
            variant="outlined"
            disabled={skip === 0}
            onClick={() => fetchUsers(limit, skip - limit)}
          >
            Previous
          </Button>

          <Typography>
            Page {skip / limit + 1} of {Math.ceil(total / limit)}
          </Typography>

          <Button
            variant="outlined"
            disabled={skip + limit >= total}
            onClick={() => fetchUsers(limit, skip + limit)}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
}
