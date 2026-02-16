const Mood = () => {
  const hoy = "Cansada :)";
  const activo = false;

  return (
    <div>
      <h3>MOOD</h3>
      <p>Estado del día: {hoy}</p>
      <p>Estado: {activo ? "Activo" : "Inactivo"}</p>
    </div>
  );
};

export default Mood;
