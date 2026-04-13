import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const initialData = [
  { id: 1, nombre: "ir al super", descripcion: "heb, tomates, cebolla", fecha: "12-03-2023", prioridad: "Alta"},
];

class App extends React.Component {
  state = {
    data: initialData,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      nombre: "",
      empresa: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: { ...dato }, // no editar por referencia
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
      form: { id: "", nombre: "", descripción: "" }, //  limpia form al abrir
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  editar = () => {
    const { form, data } = this.state;

    const nuevaData = data.map((registro) =>
      registro.id === form.id
        ? { ...registro, nombre: form.nombre, empresa: form.empresa }
        : registro
    );

    this.setState({ data: nuevaData, modalActualizar: false });
  };

  eliminar = (dato) => {
    const opcion = window.confirm(
      "¿Estás seguro que deseas eliminar el elemento " + dato.id + "?"
    );
    if (!opcion) return;

    const nuevaData = this.state.data.filter((registro) => registro.id !== dato.id);

    this.setState({ data: nuevaData, modalActualizar: false });
  };

  insertar = () => {
    const { form, data } = this.state;

    const nuevoId = data.length ? Math.max(...data.map((x) => x.id)) + 1 : 1;

    const valorNuevo = {
      id: nuevoId,
      nombre: form.nombre,
      empresa: form.empresa,
    };

    this.setState({
      data: [...data, valorNuevo],
      modalInsertar: false,
      form: { id: "", nombre: "", empresa: "" },
    });
  };

  render() {
    return (
      <>
        <Container>
          <br />
          <Button color="success" onClick={this.mostrarModalInsertar}>
            New Task
          </Button>
          <br />
          <br />

          <Table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                </th>
                <th>ID</th>
                <th>Nombre</th>
                <th>Empresa</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.empresa}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={() => this.eliminar(dato)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        {/* MODAL ACTUALIZAR */}
        <Modal isOpen={this.state.modalActualizar} toggle={this.cerrarModalActualizar}>
          <ModalHeader toggle={this.cerrarModalActualizar}>
            <div>
              <h3>Editar Registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>

            <FormGroup>
              <label>Empresa:</label>
              <input
                className="form-control"
                name="empresa"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.empresa}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.editar}>
              Editar
            </Button>
            <Button color="danger" onClick={this.cerrarModalActualizar}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        {/* MODAL INSERTAR */}
        <Modal isOpen={this.state.modalInsertar} toggle={this.cerrarModalInsertar}>
          <ModalHeader toggle={this.cerrarModalInsertar}>
            <div>
              <h3>Insertar</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={
                  this.state.data.length
                    ? Math.max(...this.state.data.map((x) => x.id)) + 1
                    : 1
                }
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>

            <FormGroup>
              <label>Empresa:</label>
              <input
                className="form-control"
                name="empresa"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.empresa}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.insertar}>
              Insertar
            </Button>
            <Button className="btn btn-danger" onClick={this.cerrarModalInsertar}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;