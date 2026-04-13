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
  { id: 1, nombre: "Jorge Carranza", empresa: "Tec", edad: "20", Pais: "Mexico", Contacto: "jorge.carranza@tec.mx" },
  { id: 2, nombre: "Ramon Velez", empresa: "Banorte", edad: "25", Pais: "Mexico", Contacto: "ramon.velez@banorte.com" },
  { id: 3, nombre: "Hugo Sanchez", empresa: "Real Madrid", edad: "30", Pais: "Mexico", Contacto: "hugo.sanchez@realmadrid.com" },
  { id: 4, nombre: "Rafael Marquez", empresa: "Barcelona", edad: "28", Pais: "Mexico", Contacto: "rafael.marquez@barcelona.com" },
  { id: 5, nombre: "Carlos Alcaraz", empresa: "Mallorca", edad: "22", Pais: "Mexico", Contacto: "carlos.alcaraz@mallorca.com" },
  { id: 6, nombre: "N. Djokovic", empresa: "Serbia", edad: "35", Pais: "Serbia", Contacto:"n.djokovic@serbia.com" },
  { id: 7, nombre: "Sergio Perez", empresa: "Cadillac", edad: "32", Pais: "Mexico", Contacto: "sergio.perez@cadillac.com" },
  { id: 8, nombre: "Max Verstappen", empresa: "Oracle Red Bull Racing", edad: "25", Pais: "Mexico", Contacto: "max.verstappen@oracle.com" },
  { id: 9, nombre: "Carlos Sainz", empresa: "Williams Racing", edad: "27", Pais: "Mexico", Contacto: "carlos.sainz@williams.com" },
];

class Manager extends React.Component {
  state = {
    data: initialData,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      nombre: "",
      empresa: "",
      edad: "",
      Pais: "",
      Contacto: ""
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
      form: { id: "", nombre: "", empresa: "" }, //  limpia form al abrir
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
            Crear
          </Button>
          <br />
          <br />

          <Table>
            <thead>
              <tr>
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