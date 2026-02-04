# Next.js Project

This is built using:

- **Next.js (App Router)**  
- **Material-UI (MUI)**  
- **Zustand** for state management  
- **Axios** for API calls  

It integrates with the [DummyJSON API](https://dummyjson.com/) to fetch **users** and **products** data, with authentication, search, pagination, and category filters.

---

## Features

- **Admin Login** using DummyJSON auth API
- **Protected Routes**: `/dashboard/*` is accessible only after login
- **Users List** and **Single User Details** pages
- **Products List** and **Single Product Details** pages
- **Pagination** and **Search** for users and products
- **Category Filter** for products
- **Client-side caching** using Zustand
- **Responsive UI** with MUI components

---
Usage:

1)Login:
    Go to /login
    Use the credentials

2)Dashboard Routes:
    /dashboard/users → Users List
    /dashboard/products → Products List
    /dashboard/products/[id] → Single Product Details
    /dashboard/users/[id] → Single User Details
