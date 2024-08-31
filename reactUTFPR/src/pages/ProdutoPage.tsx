import React, { useState, useEffect } from "react";
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import ProdutoApi from "../api/ProdutoApi";
import { useParams, Params } from "react-router-dom";

const ProdutoPage: React.FC<{}> = ({ }) => {

  const [id, setId] = useState(String);
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState<number | null>(null);
  const [isLoading, setIsloading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');


  const { idProduto } = useParams();

  //  useEffect(() => {
  console.log(idProduto);
  if (idProduto !== undefined) {
    ProdutoApi.buscarPorId(idProduto).then(produto => {
      setId(id);
      setNome(produto.nome);
      setQuantidade(produto.quantidade);
    });
  }
  // }, [idProduto]);


  const salvarproduto = () => {
    console.log('Clicou na funcao produto');


    const produtoModel = {
      id: null,
      nome: nome,
      quantidade: quantidade
    };

    setIsloading(true);

    ProdutoApi.salvar(produtoModel).then(retorno => {
      console.log(retorno);
      setVariant('success');
      setShowMessage(true);
      setIsloading(false);
      setMessage("Cadastro Realizado");
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    },
      error => {
        console.log(error);
        setMessage("Não foi possível realizar o cadastro")
        setIsloading(false);
        setShowMessage(true);
        setVariant('danger');
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
      }
    )
  };



  return (
    <>
      <h1>Cadastro de produtos</h1>
      {showMessage ? (<Alert key={variant} variant={variant}>{message}</Alert>) : (null)}
      <Form>
        <Form.Group className="mb-3" controlId="produtoPage.nome">
          <Form.Label>Nome:</Form.Label>
          <Form.Control value={nome} onChange={(e) => {
            setNome(e.target.value);
          }} type="text" placeholder="Digite seu nome" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="produtoPage.email">
          <Form.Label>Quantidade</Form.Label>
          <Form.Control value={quantidade} onChange={(e) => {
            setQuantidade(e.target.value);
          }} type="number" placeholder="Digite a quantidade" />
        </Form.Group>
        <Button variant="primary" disabled={isLoading} onClick={salvarproduto}>Salvar</Button>
        {isLoading ? (<Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>) : (null)}

      </Form >
    </>
  );

}

export default ProdutoPage;
