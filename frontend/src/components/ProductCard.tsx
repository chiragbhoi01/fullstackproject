interface ProductProps {
  name: string;
  category: string;
  price: number;
  imageUrl?: string;
  color?: string;
  size?: string;
}

export default function ProductCard({ name, category, price, imageUrl, color, size }: ProductProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all">
      <img
        src={imageUrl || "/placeholder.jpg"}
        alt={name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-rose-700">{name}</h3>
        <p className="text-sm text-gray-500 capitalize">{category}</p>
        <p className="text-gray-600 mt-1">Color: {color}</p>
        <p className="text-gray-600">Size: {size}</p>
        <p className="text-lg font-bold text-gray-900 mt-2">₹{price}</p>
        <button className="mt-3 w-full bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-md font-medium">
          Rent Now
        </button>
      </div>
    </div>
  );
}
