interface ProductProps {
  name: string;
  category: string;
  price: number;
  imageUrl?: string;
  color?: string;
  size?: string;
  isPopular?: boolean; // To show the "Popular" badge
  priceUnit?: string;  // For "/day" etc
}

export default function ProductCard({
  name,
  category,
  price,
  imageUrl,
  color,
  size,
  isPopular,
  priceUnit = '',
}: ProductProps) {
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
        {color && <p className="text-gray-600 mt-1">Color: {color}</p>}
        {size && <p className="text-gray-600">Size: {size}</p>}
        <p className="text-lg font-bold text-gray-900 mt-2">
          ₹{price}{priceUnit}
        </p>
        {isPopular && (
          <span className="inline-block px-3 py-1 mt-2 mr-2 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
            Popular
          </span>
        )}
        <button className="mt-3 w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md font-medium">
          View Details
        </button>
      </div>
    </div>
  );
}
