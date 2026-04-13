import { useState } from "react";
import "./SimpleForm.css";

export const SimpleForm = () => {

  const [formState, setFormState] = useState({
    matricula: "",
    nombre: "",
    apellidos: "",
    edad: "",
    universidad: "",
    carrera: "",
  });

  const [enviado, setEnviado] = useState(false);

  const {
    matricula,
    nombre,
    apellidos,
    edad,
    universidad,
    carrera
  } = formState;

  // cuando escribe el usuario
  const onInputChange = ({ target }) => {

    const { name, value } = target;

    setFormState({
      ...formState,
      [name]: value,
    });

    // borra la impresión automáticamente
    setEnviado(false);
  };

  // cuando presiona enviar
  const onSubmit = (e) => {

    e.preventDefault();
    setEnviado(true);
  };

  return (

    <div className="container-main">

      <div className="card-form">

        <h2 className="title">
          Formulario de Estudiante
        </h2>

        <form onSubmit={onSubmit}>

          <input
            type="text"
            name="matricula"
            placeholder="Matrícula"
            value={matricula}
            onChange={onInputChange}
          />

          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={nombre}
            onChange={onInputChange}
          />

          <input
            type="text"
            name="apellidos"
            placeholder="Apellidos"
            value={apellidos}
            onChange={onInputChange}
          />

          <input
            type="text"
            name="edad"
            placeholder="Edad"
            value={edad}
            onChange={onInputChange}
          />

          <input
            type="text"
            name="universidad"
            placeholder="Universidad"
            value={universidad}
            onChange={onInputChange}
          />

          <input
            type="text"
            name="carrera"
            placeholder="Carrera"
            value={carrera}
            onChange={onInputChange}
          />

          <button type="submit">
            Enviar
          </button>

        </form>

      </div>

      {enviado && (

        <div className="card-result">

          <h3>Datos ingresados</h3>

          <p><b>Matrícula:</b> {matricula}</p>
          <p><b>Nombre:</b> {nombre}</p>
          <p><b>Apellidos:</b> {apellidos}</p>
          <p><b>Edad:</b> {edad}</p>
          <p><b>Universidad:</b> {universidad}</p>
          <p><b>Carrera:</b> {carrera}</p>

        </div>

      )}

    </div>

  );
};