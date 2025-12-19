'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProductStore } from '@/store/productStore';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

export default function ProductsPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const {
    products,
    loading,
    fetchProducts,
    searchProducts,
    filterByCategory,
    fetchCategories,
    categories,
    selectedCategory,
    skip,
    limit,
    total,
  } = useProductStore();

  /* ---------------- Initial Load ---------------- */
  useEffect(() => {
    fetchProducts(limit, 0);
    fetchCategories();
  }, []);

  /* ---------------- Search ---------------- */
  const handleSearch = (value: string) => {
    setSearch(value);

    if (value.trim() === '') {
      fetchProducts(limit, 0);
    } else {
      searchProducts(value);
    }
  };

  /* ---------------- Category ---------------- */
  const handleCategoryChange = (category: string) => {
    setSearch(''); // reset search when category changes
    filterByCategory(category);
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
      {/* 🔍 Search + Category */}
      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <TextField
          fullWidth
          label="Search products"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) =>
              handleCategoryChange(e.target.value)
            }
          >
            <MenuItem value="all">All</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.slug} value={cat.slug}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* 🧱 Products Grid */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{ cursor: 'pointer', height: '100%' }}
              onClick={() =>
                router.push(`/dashboard/products/${product.id}`)
              }
            >
              <CardMedia
                component="img"
                height="160"
                image={product.thumbnail}
                alt={product.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.title}
                </Typography>
                <Typography>₹ {product.price}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {product.category}
                </Typography>
                <Typography variant="body2">
                  Rating: {product.rating}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 📄 Pagination (only when not searching & not filtering) */}
      {search.trim() === '' && selectedCategory === 'all' && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={4}
        >
          <Button
            variant="outlined"
            disabled={skip === 0}
            onClick={() => fetchProducts(limit, skip - limit)}
          >
            Previous
          </Button>

          <Typography>
            Page {skip / limit + 1} of {Math.ceil(total / limit)}
          </Typography>

          <Button
            variant="outlined"
            disabled={skip + limit >= total}
            onClick={() => fetchProducts(limit, skip + limit)}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
}
