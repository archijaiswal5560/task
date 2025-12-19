'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProductStore } from '@/store/productStore';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
} from '@mui/material';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { product, fetchProductById } = useProductStore();

  useEffect(() => {
    if (id) fetchProductById(id as string);
  }, [id]);

  if (!product) return <Typography p={3}>Loading...</Typography>;

  return (
    <Box p={3}>
      {/* Back Button */}
      <Button variant="outlined" onClick={() => router.push('/dashboard/products')}>
        ← Back to Products
      </Button>

      <Grid container spacing={4} mt={1}>
        {/* Image Section */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={product.thumbnail}
              alt={product.title}
            />
          </Card>

          {/* Image thumbnails */}
          <Box display="flex" gap={1} mt={2} flexWrap="wrap">
            {product.images?.map((img: string, i: number) => (
              <img
                key={i}
                src={img}
                width={70}
                height={70}
                style={{ objectFit: 'cover', borderRadius: 4 }}
              />
            ))}
          </Box>
        </Grid>

        {/* Details Section */}
        <Grid item xs={12} md={7}>
          <Typography variant="h4">{product.title}</Typography>
          <Typography mt={1} color="text.secondary">
            Category: {product.category}
          </Typography>

          <Typography mt={2}>{product.description}</Typography>

          <Typography mt={2} fontWeight="bold">
            Price: ${product.price}
          </Typography>

          <Typography mt={1}>
            Rating: ⭐ {product.rating}
          </Typography>

          <Typography mt={1}>
            Stock Available: {product.stock}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
