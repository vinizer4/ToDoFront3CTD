import React, { useEffect, useState } from "react";
import {
	BsTrash,
	BsPencil
}                                     from "react-icons/bs";
import {
	Button,
	Form,
	ListGroup,
	Container,
	Card,
	Badge
}                                     from "react-bootstrap";

function Tarefas() {
	const [ id, setId ] = useState("");
	const [ titulo, setTitulo ] = useState("");
	const [ categoria, setCategoria ] = useState("");
	const [ data, setData ] = useState("");
	const [ descricao, setDescricao ] = useState("");
	const [ listaTarefas, setListTarefas ] = useState([]);
	const [ descricaoMessage, setDescricaoMessage ] = useState("")
	const [ categoriaMessage, setCategoriaMessage ] = useState("")
	const [ dataMessage, setDataMessage ] = useState("")
	const [ tituloMessage, setTituloMessage ] = useState("")
	
	async function validateTitulo() {
		if ( titulo === "" ) {
			setTituloMessage("Preencher o campo titulo!");
		}
		else if ( titulo.length < 3 ) {
			setTituloMessage(
				"Titulo precisa ter mais de 3 caracteres!");
		}
		else {
			setTituloMessage("");
		}
	}
	
	async function validateDescricao() {
		if ( descricao === "" ) {
			setDescricaoMessage("Preencher o campo descricao!");
		}
		else if ( descricao.length < 3 ) {
			setDescricaoMessage(
				"Descricao precisa ter mais de 3 caracteres!");
		}
		else {
			setDescricaoMessage("");
		}
	}
	
	async function validData() {
		const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
		
		setDataMessage("");
		
		if ( regexData.test(data) ) {
			const partesData = data.split("/");
			const dia = partesData[ 0 ];
			const mes = partesData[ 1 ] - 1;
			const ano = partesData[ 2 ];
			
			const dataInformada = new Date(ano, mes, dia);
			
			if ( dataInformada < new Date() ) {
				setDataMessage("A data nao pode ser anterior a data"
				               + " atual")
			}
		}
		else {
			setDataMessage("Insira uma data no formato "
			               + " dd/mm/yyyy!")
		}
	}
	
	function validateFields() {
		validateDescricao()
		validateTitulo()
		validData()
	}
	
	async function addItem(event) {
		event.preventDefault();
		await validateFields()
		if (
			descricaoMessage === "" &&
			tituloMessage === "" &&
			categoriaMessage === "" &&
			dataMessage === ""
		) {
			const randomNumber = Math.floor(Math.random() * 1000000);
			const copyArray = [ ...listaTarefas ]
			setListTarefas([
				               ...copyArray,
				               {
					               id: randomNumber,
					               titulo,
					               categoria,
					               data,
					               descricao,
				               },
			               ]);
			setTitulo("");
			setCategoria("");
			setData("");
			setId("");
			setDescricao("");
		}
	}
	
	function handleSubmit(event) {
		event.preventDefault();
		addItem(event);
	}
	
	useEffect(() => {
	}, [ listaTarefas ])
	
	
	async function editItem(event) {
		event.preventDefault();
		await validateFields();
		if (
			descricaoMessage === "" &&
			tituloMessage === "" &&
			categoriaMessage === "" &&
			dataMessage === ""
		) {
			const copyListaTarefas = [ ...listaTarefas ];
			
			const index = listaTarefas.findIndex((tarefa) => tarefa.id
			                                                 === Number(
					id));
			
			copyListaTarefas[ index ].descricao = descricao
			copyListaTarefas[ index ].titulo = titulo
			copyListaTarefas[ index ].categoria = categoria
			copyListaTarefas[ index ].data = data
			
			setListTarefas(copyListaTarefas);
			
			setTitulo("");
			setCategoria("");
			setData("");
			setId("");
			setDescricao("");
		}
	}
	
	function apagarItem(id) {
		if ( confirm("Deseja realmente apagar o item?") ) {
			const result = listaTarefas.filter((item) => item.id
			                                             !== id);
			setListTarefas(result);
		}
	}
	
	function preencheEstados(item) {
		setTitulo(item.titulo);
		setCategoria(item.categoria);
		setId(item.id);
		setData(item.data);
		setDescricao(item.descricao);
	}
	
	return (
		<Container>
			<div className="App">
				<h1>Cadastrar Tarefas</h1>
				
				<Form onSubmit={ id ? editItem : handleSubmit }>
					<Form.Group>
						<Form.Control
							onClick={ validateTitulo }
							value={ titulo }
							onChange={ (event) => {
								setTitulo(event.target.value)
								validateTitulo()
							} }
							placeholder="Titulo"
							className={ tituloMessage
							            ? "is-invalid"
							            : "" }
						/>
						{ tituloMessage && <div
							className="invalid-feedback">{ tituloMessage }</div> }
					</Form.Group>
					<br/>
					<Form.Group>
						<Form.Select
							required
							value={ categoria }
							onChange={ (event) => setCategoria(event.target.value) }
							placeholder={ "Categoria" }
							className={ categoriaMessage
							            ? "is-invalid"
							            : "" }
						>
							<option value="">Selecione uma Categoria
							</option>
							<option value="Urgente">Urgente</option>
							<option value="Alta">Alta</option>
							<option value="Media">Media</option>
							<option value="Baixa">Baixa</option>
						</Form.Select>
						{ categoriaMessage && <div
							className="invalid-feedback">{ categoriaMessage }</div> }
					</Form.Group>
					<br/>
					<Form.Group>
						<Form.Control
							value={ data }
							onClick={ validData }
							onChange={ (event) => {
								setData(event.target.value)
								validData()
							} }
							placeholder="Data"
							className={ dataMessage
							            ? "is-invalid"
							            : "" }
						/>
						{ dataMessage && <div
							className="invalid-feedback">{ dataMessage }</div> }
					</Form.Group>
					<br/>
					<Form.Group>
						<Form.Control
							onClick={ validateDescricao }
							value={ descricao }
							onChange={ (event) => {
								setDescricao(event.target.value)
								validateDescricao()
							} }
							placeholder="Descricao"
							className={ descricaoMessage
							            ? "is-invalid"
							            : "" }
						/>
						{ descricaoMessage && <div
							className="invalid-feedback">{ descricaoMessage }</div> }
					</Form.Group>
					<br/>
					<Button variant="primary" type="submit">
						{ id ? "Salvar" : "Cadastrar" }
					</Button>
				</Form>
				<br/>
				{ listaTarefas.length > 0 ? (
					<>
						<h2>Minhas tarefas</h2>
						{ listaTarefas.map((item) => (
							<React.Fragment key={ item.id }>
								<ListGroup>
									{ listaTarefas.map((item) => (
										<ListGroup.Item
											key={ item.id }>
											<div
												className="d-flex justify-content-between">
												<div>
													<h5>{ item.titulo }</h5>
													<Badge
														bg="primary">{ item.categoria }</Badge>{ " " }
													<Badge
														bg="secondary">{ item.data }</Badge>
												</div>
												<div>
													<Button
														variant="warning"
														onClick={ () => preencheEstados(
															item) }
													>
														<BsPencil/>
													</Button>{ " " }
													<Button
														variant="danger"
														onClick={ () => apagarItem(
															item.id) }
													>
														<BsTrash/>
													</Button>
												</div>
											</div>
											<p>{ item.descricao }</p>
										</ListGroup.Item>
									)) }
								</ListGroup>
								<br/>
							</React.Fragment>
						)) }
					</>
				) : (
					  <p>Nenhum item cadastrado</p>
				  ) }
			</div>
		</Container>
	
	);
}

export default Tarefas;
