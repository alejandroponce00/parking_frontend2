'use client';
import { useEffect, useState } from "react";
import { Car, BadgeCheck, MapPin, Calendar } from "lucide-react";

export default function Estacionamientos() {
  const [estacionamientos, setEstacionamientos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEstacionamientos = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        setEstacionamientos(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchEstacionamientos();
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-300">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Estacionamientos Registrados</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <ul className="space-y-4">
        {estacionamientos.map((item) => (
          <li key={item.id} className="p-4 border rounded-lg shadow-md bg-gray-100">
            <p className="text-lg font-semibold"><Car className="inline-block w-5 h-5 text-blue-500 mr-2" />Vehículo: {item.vehiculo}</p>
            <p className="text-md"><BadgeCheck className="inline-block w-5 h-5 text-green-500 mr-2" />Patente: {item.patente}</p>
            <p className="text-md"><MapPin className="inline-block w-5 h-5 text-red-500 mr-2" />Ubicación: {item.ubicacion}</p>
            <p className="text-md"><Calendar className="inline-block w-5 h-5 text-yellow-500 mr-2" />Fecha: {new Date(item.fecha).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
