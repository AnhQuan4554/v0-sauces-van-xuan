'use client';

import { Product } from '@/app/types/products';
import { getProducts } from '@/services/client/product-supabase-client';
import React, { useEffect, useState } from 'react';

const PageDataFake = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  useEffect(() => {
    const handleFetch = async () => {
      const data = await getProducts();
      setProductList(data);
    };
    handleFetch();
  }, []);

  return (
    <div>
      <h1>PageDataFake</h1>
      <ul>
        {productList.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PageDataFake;
