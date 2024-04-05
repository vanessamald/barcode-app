//import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';

function Brands() {
    const [brandData, setBrandData ] = useState([]);

    // Fetch brand data when component mounts
    useEffect(()=> {
      fetchBrandData();
    }, []);

    const fetchBrandData = async () => {
    try {
      // Make a GET request to your backend API endpoint to fetch brand data
      const response = await fetch(`http://localhost:3001/api/brands`);
  
      if (response.ok) {
        const data = await response.json();
        console.log('Brand Data:', data);
        
        setBrandData(data);
      } else {
        throw new Error('Failed to fetch brand information');
      }
    } catch (error) {
      console.error('Error fetching brand information:', error.message);
    }
  };

  return (
    <div>
      <h1>Brands</h1>
      <ul>
        {brandData.map((brand, index) => (
          <li key={index}>{brand.corporate_name}</li>
        ))} 
      </ul>
    </div>
  )
}

export default Brands;