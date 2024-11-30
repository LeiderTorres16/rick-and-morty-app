export const EstadoConColor = ({ status }) => {
  let color = "bg-gray-500";
  let texto = "Desaparecido";

  if (status === "Alive") {
    color = "bg-green-500";
    texto = "Alive";
  } else if (status === "Dead") {
    color = "bg-red-500";
    texto = "Death";
  } else if (status === "unknown") {
    color = "bg-gray-500";
    texto = "Unknown";
  }

  return (
    <div className="flex items-center space-x-2">
      <span className={`w-4 h-4 rounded-full ${color}`}></span>
      <span className="text-lg text-gray-800">{texto}</span>
    </div>
  );
};
