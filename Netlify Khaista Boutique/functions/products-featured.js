exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod === 'GET') {
    const featuredProducts = [
      {
        id: "1",
        name: "Afghan Choker Necklace",
        description: "Traditional handcrafted choker necklace with intricate Afghan design",
        price: 89.99,
        category: "jewelry",
        imageUrl: "/assets/Khaista%20Afghan%20Choker%20Necklace_1754949895057.jpg",
        featured: true
      },
      {
        id: "2", 
        name: "Afghan Coin Necklace",
        description: "Authentic Afghan coin necklace with traditional metalwork",
        price: 129.99,
        category: "jewelry", 
        imageUrl: "/assets/Khaista%20Afghan%20Coin%20Necklace_1754949895058.webp",
        featured: true
      },
      {
        id: "4",
        name: "Green and Red Kochi Dress",
        description: "Traditional Kochi dress with vibrant green and red embroidery",
        price: 299.99,
        category: "clothing",
        imageUrl: "/assets/Khaista%20Green%20and%20Red%20Kochi%20Dress_1754949895065.jpg",
        featured: true
      },
      {
        id: "6",
        name: "Afghan Vintage Pashtun Bag",
        description: "Authentic vintage Pashtun bag with traditional patterns",
        price: 179.99,
        category: "bags",
        imageUrl: "/assets/Khaista%20Afghan%20vintage%20pashtun%20bag_1754949895064.webp",
        featured: true
      }
    ];
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(featuredProducts),
    };
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
};