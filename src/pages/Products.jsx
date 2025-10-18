import ProductCard from '../components/ProductCard.jsx';
import products from '../utils/products.js';

export default function Products() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Featured Shoes</h2>
        <p className="text-neutral-400 text-sm">Interact with 3D previews and add your favorites to the cart.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
