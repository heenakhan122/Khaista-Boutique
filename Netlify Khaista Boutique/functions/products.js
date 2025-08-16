// Inline MemStorage for Netlify Functions
class MemStorage {
  constructor() {
    this.products = [
      {
        id: "1",
        name: "Afghan Choker Necklace",
        description: "Traditional handcrafted choker necklace with intricate Afghan design",
        price: 89.99,
        category: "jewelry",
        imageUrl: "/assets/Khaista Afghan Choker Necklace_1754949895057.jpg",
        featured: true
      },
      {
        id: "2", 
        name: "Afghan Coin Necklace",
        description: "Authentic Afghan coin necklace with traditional metalwork",
        price: 129.99,
        category: "jewelry", 
        imageUrl: "/assets/Khaista Afghan Coin Necklace_1754949895058.webp",
        featured: true
      },
      {
        id: "3",
        name: "Afghan Crescent Necklace", 
        description: "Beautiful crescent moon design necklace with traditional craftsmanship",
        price: 99.99,
        category: "jewelry",
        imageUrl: "/assets/Khaista Afghan Crescent Necklace_1754949895062.webp",
        featured: false
      },
      {
        id: "4",
        name: "Green and Red Kochi Dress",
        description: "Traditional Kochi dress with vibrant green and red embroidery",
        price: 299.99,
        category: "clothing",
        imageUrl: "/assets/Khaista Green and Red Kochi Dress_1754949895065.jpg",
        featured: true
      },
      {
        id: "5",
        name: "Blue and Silver Kochi Dress",
        description: "Elegant blue and silver traditional dress with intricate details",
        price: 349.99,
        category: "clothing",
        imageUrl: "/assets/Khaista blue and silver kochi dress_1754949895064.jpg",
        featured: false
      },
      {
        id: "6",
        name: "Afghan Vintage Pashtun Bag",
        description: "Authentic vintage Pashtun bag with traditional patterns",
        price: 179.99,
        category: "bags",
        imageUrl: "/assets/Khaista Afghan vintage pashtun bag_1754949895064.webp",
        featured: true
      }
    ];
  }

  async getProducts() {
    return this.products;
  }

  async getProductsByCategory(category) {
    return this.products.filter(product => product.category === category);
  }

  async getFeaturedProducts() {
    return this.products.filter(product => product.featured);
  }
}

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod === 'GET') {
    try {
      const storage = new MemStorage();
      const { category } = event.queryStringParameters || {};
      
      let products;
      if (category) {
        products = await storage.getProductsByCategory(category);
      } else {
        products = await storage.getProducts();
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(products),
      };
    } catch (error) {
      console.error('Products API error:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Internal server error' }),
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
};