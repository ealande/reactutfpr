import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Table, Spinner, Alert, Button } from "react-bootstrap";
import ProdutoApi from "../api/ProdutoApi";
import { ProdutoModel } from "../model/ProdutoModel";

const ListaProdutoPage: React.FC<{}> = ({ }) => {
  const [isLoading, setIsloading] = useState(false);
  const [produtos, setProdutos] = useState<ProdutoModel[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');

  useEffect(() => {
    setIsloading(true);
    ProdutoApi.listar().then(result => {
      setIsloading(false);
      setProdutos(result);
    }, error => {
      console.log(error);
      setMessage("Não foi possível carregar a lista de produtos.")
      setIsloading(false);
      setShowMessage(true);
      setVariant('danger');
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    });
  }, []);

  const navigate = useNavigate();

  const carregarProduto = (id: string) => {
    navigate(`/produto/${id}`);
  };

  return (
    <>
      <h2>Lista de Produtos</h2>
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
          {produtos.map((produtos) => {
            return (
              <tr key={produtos.id}>
                <td>{produtos.id}</td>
                <td>{produtos.nome}</td>
                <td>{produtos.quantidade}</td>
                <td><Button variant="secondary" onClick={() => carregarProduto(produtos.id)}>Carregar</Button>
                </td>
              </tr>
            )
          })}

        </tbody>
      </Table>
    </>
  );
}

export default ListaProdutoPage;
