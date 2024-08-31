import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Table, Spinner, Alert, Button } from "react-bootstrap";
import ClienteApi from "../api/ClienteApi";
import { ClienteModel } from "../model/ClienteModel";

const ListaClientePage: React.FC<{}> = ({ }) => {
  const [isLoading, setIsloading] = useState(false);
  const [clientes, setClientes] = useState<ClienteModel[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');

  useEffect(() => {
    setIsloading(true);
    ClienteApi.listar().then(result => {
      setIsloading(false);
      setClientes(result);
    }, error => {
      console.log(error);
      setMessage("Não foi possível carregar a lista de clientes.")
      setIsloading(false);
      setShowMessage(true);
      setVariant('danger');
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    });
  }, []);

  const navigate = useNavigate();

  const carregarCliente = (id: number | null) => {
    navigate(`/cliente/${id}`);
  };

  return (
    <>
      <h2>Lista de Clientes</h2>
      {isLoading ? (<Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>) : (null)}

      {showMessage ? (<Alert key={variant} variant={variant}>{message}</Alert>) : (null)}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Hobbies</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => {
            return (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.hobbies}</td>
                <td><Button variant="secondary" onClick={() => carregarCliente(cliente.id)}>Carregar</Button>
                </td>
              </tr>
            )
          })}

        </tbody>
      </Table>
    </>
  );
}

export default ListaClientePage;
