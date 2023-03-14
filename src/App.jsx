import { useState } from "react";
import { BsTrash, BsPencil } from "react-icons/bs";
import { Button, Form, ListGroup, Container, Card } from "react-bootstrap";

function App() {
  const [id, setId] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [duracao, setDuracao] = useState("");
  const [listaDisciplinas, setListaDisciplinas] = useState([]);
  
  function addItem(event) {
    event.preventDefault();
    
    if (disciplina === "" || duracao === "") {
      alert("Preencha todas as informações");
      return;
    }
    
    setListaDisciplinas([
                          ...listaDisciplinas,
                          {
                            id: Date.now(),
                            disciplina: disciplina,
                            duracao: duracao,
                          },
                        ]);
    
    setDisciplina("");
    setDuracao("");
    setId("");
  }
  
  function editItem(event) {
    event.preventDefault();
    
    const copyListaDisciplinas = [...listaDisciplinas];
    
    const index = copyListaDisciplinas.findIndex(
        (disciplina) => disciplina.id === id
    );
    
    copyListaDisciplinas[index].disciplina = disciplina;
    copyListaDisciplinas[index].duracao = duracao;
    
    setListaDisciplinas(copyListaDisciplinas);
  }
  
  function apagarItem(id) {
    if (confirm("Deseja realmente apagar o item?")) {
      const result = listaDisciplinas.filter((item) => item.id !== id);
      setListaDisciplinas(result);
    }
  }
  
  function preencheEstados(item) {
    setDisciplina(item.disciplina);
    setDuracao(item.duracao);
    setId(item.id);
  }
  
  return (
      <Container>
        <div className="App">
          <h1>Cadastro de Tarefas</h1>
    
          <Form onSubmit={id ? editItem : addItem}>
            <Form.Group>
              <Form.Control
                  required
                  value={disciplina}
                  onChange={(event) => setDisciplina(event.target.value)}
                  placeholder="Nome da disciplina"
              />
            </Form.Group>
            <br/>
            <Form.Group>
              <Form.Select
                  value={duracao}
                  onChange={(event) => setDuracao(event.target.value)}
              >
                <option value="">Selecione uma opção</option>
                <option value="40">40 horas</option>
                <option value="60">60 horas</option>
                <option value="80">80 horas</option>
              </Form.Select>
            </Form.Group>
            <br/>
            <Button variant="primary" type="submit">
              {id ? "Salvar" : "Cadastrar"}
            </Button>
          </Form>
          <br/>
          {listaDisciplinas.length > 0 ? (
              <ListGroup>
                <h2>Minhas tarefas</h2>
                {listaDisciplinas.map((item) => (
                    <ListGroup.Item key={item.id}>
                      <Card>
                        <Card.Header as="h5">{item.disciplina}</Card.Header>
                        <Card.Body>
                          <Card.Title>{item.id}</Card.Title>
                          <Card.Text>
                            {item.duracao}
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
                    </ListGroup.Item>
                ))}
              </ListGroup>
          ) : (
               <p>Nenhum item cadastrado</p>
           )}
        </div>
      </Container>
      
  );
}

export default App;
