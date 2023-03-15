import { useState } from "react";
import { BsTrash, BsPencil } from "react-icons/bs";
import { Button, Form, ListGroup, Container, Card } from "react-bootstrap";

function Tarefas() {
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [data, setData] = useState("")
  const [descricao, setDescricao] = useState("")
  const [listaTarefas, setListTarefas] = useState([]);
  const [validado, setValidado] = useState(false)
  
  const [message, setMessage] = useState({
    titulo: "",
    data: "",
    categoria: "",
    descricao: ""
                                         })
  
  async function valideFields() {
    
    setMessage({
      titulo: "",
      data: "",
      categoria: "",
      descricao: ""
               })
    
    if (titulo === "") {
      setMessage((prevState) => {
        return {
          ...prevState,
          titulo: "Preencher o campo titulo!",
          valido: false
        };
      });
    } else if (
        titulo.length < 3
    ) {
      setMessage((prevState) => {
        return {
          ...prevState,
          titulo: "Titulo precisa ter mais de 3 caracteres!",
        };
      });
    }
  
    if (categoria === "") {
      setMessage((prevState) => {
        return {
          ...prevState,
          titulo: "Selecione uma categoria!",
          valido: false
        };
      });
    }
  
    if (descricao === "") {
      setMessage((prevState) => {
        return {
          ...prevState,
          descricao: "Preencher o campo descricao!",
          valido: false
        };
      });
    } else if (
        descricao.length < 3
    ) {
      setMessage((prevState) => {
        return {
          ...prevState,
          descricao: "Descricao precisa ter mais de 3 caracteres!",
          valido: false
        };
      });
    }

// Expressão regular para validar o formato da data
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;

// Verifica se a data está no formato correto
    if (regexData.test(data)) {
      // Separa o dia, mês e ano da data
      const partesData = data.split("/");
      const dia = partesData[0];
      const mes = partesData[1] - 1; // lembre-se que o mês começa em zero no objeto Date()
      const ano = partesData[2];
    
      // Cria um objeto Date com a data informada
      const dataInformada = new Date(ano, mes, dia);
    
      // Verifica se a data informada é anterior à data de hoje
      if (dataInformada < new Date()) {
        setMessage(prevState => {
          return {
            ...prevState,
            data: "A data nao pode ser anterior a data atual"
          }
        })
      }
    } else {
      setMessage(prevState => {
        return {
          ...prevState,
          data: "Insira uma data no formato correto dd/mm/yyyy!"
        }
      })
    }
  
    await validateMessage()
    console.log(validado)
    
    return validado
  }
  
  function validateMessage() {
    console.log(message)
    if (Object.values(message).some((value) => value !== "")) {
      setValidado(false)
    } else {
      setValidado(true)
    }
  
  }
  
  async function addItem(event) {
    event.preventDefault();
  
    const isValid = await valideFields()
  
  
    if (isValid === true) {
      setListTarefas([
                       ...listaTarefas,
                       {
                         id: Date.now(),
                         titulo: titulo,
                         categoria: categoria,
                         data: data,
                         descricao: descricao
                       },
                     ]);
  
      setTitulo("");
      setCategoria("");
      setData("");
      setId("")
      setDescricao("")
    } else {
      setListTarefas(prevState => {
        return {prevState}
      })
    }
  }
  
  async function editItem(event) {
    event.preventDefault();
  
    const isValid = await valideFields()
    
    console.log(isValid)
    
    console.log(listaTarefas)
    const copyListaTarefas = [...listaTarefas]
    
    const index = copyListaTarefas.findIndex(
        (tarefa) => tarefa.id === id
    );
  
    if (isValid === true) {
      copyListaTarefas[index].titulo = titulo;
      copyListaTarefas[index].categoria = categoria;
      copyListaTarefas[index].data = data;
      copyListaTarefas[index].descricao = descricao;
  
      setListTarefas(copyListaTarefas);
    } else {
      setListTarefas(prevState => {return {prevState}})
    }
    console.log(listaTarefas)
  }
  
  function apagarItem(id) {
    if (confirm("Deseja realmente apagar o item?")) {
      const result = listaTarefas.filter((item) => item.id !== id);
      setListTarefas(result);
    }
  }
  
  function preencheEstados(item) {
    setTitulo(item.titulo);
    setCategoria(item.categoria);
    setId(item.id);
    setData(item.data)
    setDescricao(item.descricao)
  }
  
  return (
      <Container>
        <div className="App">
          <h1>Cadastrar Tarefas</h1>
    
          <Form onSubmit={id ? editItem : addItem}>
            <Form.Group>
              <Form.Control
                  
                  value={titulo}
                  onChange={(event) => setTitulo(event.target.value)}
                  placeholder="Titulo"
                  className={message.titulo ? "is-invalid" : ""}
              />
              {message.titulo && <div className="invalid-feedback">{message.titulo}</div>}
            </Form.Group>
            <br/>
            <Form.Group>
              <Form.Select
                  required
                  value={categoria}
                  onChange={(event) => setCategoria(event.target.value)}
                  placeholder={"Categoria"}
                  className={message.categoria ? "is-invalid" : ""}
              >
                <option value="">Selecione uma Categoria</option>
                <option value="Urgente">Urgente</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baixa">Baixa</option>
              </Form.Select>
              {message.categoria && <div className="invalid-feedback">{message.categoria}</div>}
            </Form.Group>
            <br/>
            <Form.Group>
              <Form.Control
                  value={data}
                  onChange={(event) => setData(event.target.value)}
                  placeholder="Data"
                  className={message.data ? "is-invalid" : ""}
              />
              {message.data && <div className="invalid-feedback">{message.data}</div>}
            </Form.Group>
            <br/>
            <Form.Group>
              <Form.Control
                  value={descricao}
                  onChange={(event) => setDescricao(event.target.value)}
                  placeholder="Descricao"
                  className={message.descricao ? "is-invalid" : ""}
              />
              {message.descricao && <div className="invalid-feedback">{message.descricao}</div>}
            </Form.Group>
            <br/>
            <Button variant="primary" type="submit">
              {id ? "Salvar" : "Cadastrar"}
            </Button>
          </Form>
          <br/>
          {listaTarefas.length > 0 ? (
              <>
                <h2>Minhas tarefas</h2>
                {listaTarefas.map((item) => (
                    <>
                      <br/>
                      <Card key={item.id}>
                        <Card.Header as="h5">{item.titulo}</Card.Header>
                        <Card.Body>
                          <Card.Subtitle>{item.categoria}</Card.Subtitle>
                          <Card.Text>
                            {item.descricao}
                          </Card.Text>
                          <Button
                              variant="danger"
                              onClick={() => apagarItem(item.id)}
                              className="me-2"
                          >
                            <BsTrash />
                          </Button>
  
                          <Button
                              variant="warning"
                              onClick={() => preencheEstados(item)}
                          >
                            <BsPencil />
                          </Button>
                        </Card.Body>
                      </Card>
                      <br/>
                    </>
                ))}
              </>
          ) : (
               <p>Nenhum item cadastrado</p>
           )}
        </div>
      </Container>
      
  );
}

export default Tarefas;
