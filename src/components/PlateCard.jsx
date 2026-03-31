
export default function PlateCard({ name, price, is_available }) {
 return (
 <div className="border rounded p-4">
 <h2>{name}</h2>
 <p>{price} dh</p>
 {is_available && <span className="text-!green-600">disponibl</span>}
 </div>
);
}