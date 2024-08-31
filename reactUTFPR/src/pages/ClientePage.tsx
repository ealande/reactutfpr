import React, { useState, useEffect } from "react";
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import ClienteApi from "../api/ClienteApi";
import { useParams, Params } from "react-router-dom";
import { ClienteModel } from "../model/ClienteModel";

const ClientePage: React.FC<{}> = ({ }) => {

  const [id, setId] = useState<number | null>(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');


  const { idCliente } = useParams<Params>();

  useEffect(() => {
    console.log(idCliente);
    if (idCliente !== undefined) {
      ClienteApi.buscarPorId(idCliente).then(cliente => {
        setId(cliente.id);
        setNome(cliente.nome);
        setEmail(cliente.email);
        setHobbies(cliente.hobbies);
      });
    }
  }, [idCliente]);


  const salvarCliente = () => {
    console.log('Clicou na funcaocliente');


    const clienteModel = {
      id: null,
      nome: nome,
      email: email,
      hobbies: hobbies
    };

    setIsloading(true);

    ClienteApi.salvar(clienteModel).then(retorno => {
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
      <h1>Cadastro de Clientes</h1>
      {showMessage ? (<Alert key={variant} variant={variant}>{message}</Alert>) : (null)}
      <Form>
        <Form.Group className="mb-3" controlId="clientePage.nome">
          <Form.Label>Nome:</Form.Label>
          <Form.Control value={nome} onChange={(e) => {
            setNome(e.target.value);
          }} type="text" placeholder="Digite seu nome" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="clientePage.email">
          <Form.Label>Email</Form.Label>
          <Form.Control value={email} onChange={(e) => {
            setEmail(e.target.value);
          }} type="email" placeholder="Digite seu e-mail" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.hobbies">
          <Form.Label>Digite seus hobbies</Form.Label>
          <Form.Control value={hobbies} onChange={(e) => {
            setHobbies(e.target.value);
          }} as="textarea" rows={3} />
        </Form.Group>
        <Button variant="primary" disabled={isLoading} onClick={salvarCliente}>Salvar</Button>
        {isLoading ? (<Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>) : (null)}

      </Form >
    </>
  );

}

export default ClientePage;
