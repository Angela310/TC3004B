import { bancos } from "./bancos.js";

const Bancos = () => {
  return (
    <div>
      <h1>Lista de Bancos</h1>
      <ul>
        {bancos.map((b) => (
          <li key={b.id}>
            {b.id} - {b.name} ({b.country})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bancos;
