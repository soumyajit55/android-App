// App/Services/ProductService.js
// Using the built-in fetch API for React Native to avoid adapter/network issues
const FALLBACK_PRODUCTS = [
  {
    id: 1,
    title: 'Sample Sneakers',
    price: 49.99,
    description: 'Sample product shown when network fails.',
    category: 'fashion',
    image: 'https://via.placeholder.com/300',
    rating: { rate: 4.5, count: 120 },
  },
];

const ProductService = {
  getAllProducts: async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      if (!res.ok) {
        const errText = `HTTP ${res.status} ${res.statusText}`;
        console.error('Error fetching products:', errText);
        return FALLBACK_PRODUCTS;
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      // Return fallback products so the UI can still render
      return FALLBACK_PRODUCTS;
    }
  },
};

export default ProductService;