import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productService from './productService';
import { useNavigate } from 'react-router-dom';

function ProductEditForm() {
    const {id} = useParams()
    const [product, setProduct] = useState({})
    const navigate = useNavigate();

    useEffect(()=>{
        console.log('call api')
        productService.getProductsId(id).then(res=>setProduct(res))
    }, [])

  const handleNameChange = (value) => {
    setProduct({...product, name: value})
  };

  const handlePriceChange = (value) => {
    setProduct({...product, price: value})
  };
  
  const handleCategoryIdChange = (value) => {
    setProduct({...product, categoryId: value})
  };

  const handleStatusChange = (value) => {
    setProduct({...product, status: value})
  };

  const handleImageChange = (value) => {
    setProduct({...product, image: value})
  };
  
  const handleTotalSoldChange = (value) => {
    setProduct({...product, totalSold: value})
  };

  const handleDescriptionChange = (value) => {
    setProduct({...product, description: value})
  };

  const handleQuantityChange = (value) => {
    setProduct({...product, quantity: value})
  };

  const handleSave = async ()=>{
    await productService.updateProduct(id, product);
    navigate('/admin/new-page-product');
  }

  return (
    <form >
      <label>
        Name:
        <input type="text" value={product.name} onChange={e => handleNameChange(e.target.value)} />
      </label>
      <label>
        Price:
        <input type="number" value={product.price} onChange={e => handlePriceChange(e.target.value)} />
      </label>
      <label>
        Category ID:
        <input type="text" value={product.categoryId} onChange={e => handleCategoryIdChange(e.target.value)} />
      </label>
      <label>
        Status:
        <input type="text" value={product.status} onChange={e => handleStatusChange(e.target.value)} />
      </label>
      <label>
        Image:
        <input type="text" value={product.image} onChange={e => handleImageChange(e.target.value)} />
      </label>
      <label>
        Total Sold:
        <input type="number" value={product.totalSold} onChange={e => handleTotalSoldChange(e.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={product.description} onChange={e => handleDescriptionChange(e.target.value)} />
      </label>
      <label>
        Quantity:
        <input type="number" value={product.quantity} onChange={e => handleQuantityChange(e.target.value)} />
      </label>
      <button type="button" onClick={handleSave}>Save</button>
    </form>
  );
}

export default ProductEditForm;