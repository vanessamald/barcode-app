import { useState, useEffect } from 'react';

function ProductPage() {
  const [productData, setProductData] = useState(null);
  const [barcode, setBarcode] = useState('');
  const [isMegaCorp, setIsMegaCorp] = useState(null);

  const fetchBrandData = async (searchedBrand) => {
    try {
      // Make a GET request to your backend API endpoint to fetch brand data
      const response = await fetch(`http://localhost:3001/api/brands`);
  
      if (response.ok) {
        const brandData = await response.json();
        //console.log('Brand Data:', brandData);

        // check if searched brand exists in the mega corp list
        const isMegaCorp = brandData.some(brand => brand.brands.includes(searchedBrand));
        //console.log('Is Mega Corp:', isMegaCorp);
        setIsMegaCorp(isMegaCorp);
      } else {
        throw new Error('Failed to fetch brand information');
      }
    } catch (error) {
      console.error('Error fetching brand information:', error.message);
    }
  };

  const fetchProductData = async () => {
    try {
      if (!barcode) {
        // If barcode is empty, clear the product data
        setProductData(null);
        return;
      }

      // Make a GET request to the API route with the barcode as a query parameter
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);

      if (response.ok) {
        // Parse the JSON response
        const data = await response.json();
        
        if (!data) {
          // If product data is missing or incomplete, handle it
          throw new Error('Product information not found');
        }

        // Update the productData state with the fetched data
        setProductData(data);
        // Extract the brands from the product data
        const searchedBrand = data.product.brands;
        console.log('Searched Brand:', searchedBrand);

        // Fetch brand data
        await fetchBrandData(searchedBrand);

        console.log('Product Data:', data);
      } else {
        // Handle error responses from the API
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to fetch product information');
      }
    } catch (error) {
      // Handle errors gracefully
      console.error('Error fetching product information:', error.message);
      setProductData(null);
    }
  };

  useEffect(() => {
    // Fetch product data when the component mounts or when the barcode state changes
    fetchProductData();
    // Execute the effect whenever the barcode state changes
  }, [barcode]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Fetch product data when the form is submitted
    await fetchProductData();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="Enter barcode"
        />
        <button type="submit">Submit</button>
      </form>
      {productData ? (
        <div>
          {/* Render product information */}
          <h2>{productData.product.abbreviated_product_name}</h2>
          <p>Brand: {productData.product.brands || 'Unknown'}</p>
          <p>Origins: {productData.product.origins || 'Unknown'}</p>
          {/* <p>Labels/Certifications/Awards: {productData.product.labels || 'Unknown'}</p> */}
            {/* <ul>
              {productData.product.labels.split(' ').map((labels, index) => (
              <li key={index}>{labels}</li>
              ))}
            </ul> */}
          <p>Contains: {productData.product.contains || 'Unknown'}</p>
          <p>Does Not Contain: {productData.product.does_not_contain || 'Unknown'}</p>
          <p>Ingredients Analysis:</p>
            <ul>
              {productData.product.ingredients_analysis_tags.map((tag, index) => (
              <li key={index}>{tag.substring(3)}</li>
              ))}
            </ul>
          <p>Ingredients from Palm Oil: {productData.product.ingredients_from_palm_oil || 'Unknown'}</p>
          <p>Additives:</p>
            <ul>
              {productData.product.additives_tags.map((tag, index) => (
              <li key={index}>{tag.substring(3)}</li>
              ))}
            </ul>
          {/* <p>Nutrient Levels: {productData.product.nutrient_levels || 'Unknown'}</p> */}
          {/* 
            <ul>
              {Object.keys(productData.product.nutrient_levels).map((nutrient) => (
              <li key={nutrient}>
              {nutrient}: {productData.product.nutrient_levels[nutrient]}
              </li>
              ))}
            </ul> 
          */}

          <p>Nutrition Grade: {productData.product.nutrition_grades || 'Unknown'}</p>
          <p>Eco-Score: {productData.product.ecoscore_grade || 'Unknown'}</p>
          <p>Nova-Score: {productData.product.nova_group || 'Unknown'}</p>
          <p>Carbon Footprint: {productData.carbon_footprint_percent_of_known_ingredients || 'Unknown'}</p>
            {/* Display mega corporation status */}
            {isMegaCorp !== null && (
            <p>{isMegaCorp ? 'This brand is a mega corporation.' : 'This brand is not a mega corporation.'}</p>
          )}
        </div>
      ) : (
        <p>No product data available</p>
      )}
    </div>
  );
}

export default ProductPage;