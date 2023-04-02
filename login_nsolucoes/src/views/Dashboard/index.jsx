import "./styles.css";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import axios from "axios";

Modal.setAppElement('#root')

function Dashboard() {
  const [updateWindow, setUpdateWindow] = useState(false);

  const [addUser, setAddUser] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [update, setUpdate] = useState(false);
  const [allUserInfo, setAllUserInfo] = useState([]);

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/getAllUsersInfo")
      .then(res => setAllUserInfo(res.data))
      .catch(err => console.log(err))
  }, [updateWindow])

  function handleOpenModal(setState, id){
    if (id) return setState(id);
    setState(true);
  }

  function handleCloseModal(setState){
    setState(false)
  }

  function  handleAddUser(e){
    e.preventDefault();

    axios.post("http://localhost:3000/addUser", {
      nome, 
      cpf,
      email,
      senha,
      telefone,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      dataNascimento
    })
      .then(res => {
        handleCloseModal(setAddUser);
        console.log("User Created")
        setUpdateWindow(!updateWindow)
      })
      .catch(err => console.log(err))
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    }

  }
   
  return (
    <div className='App'>

      <div className="title">
      <h1>Listagem De Usuarios</h1>
      </div>

      <div className="table">
        <div className="options">
          <button className="add" onClick={() => {
            handleOpenModal(setAddUser)

          }}> <img src="src\assets\imagens\mais.png"/></button>
            <Modal 
              isOpen={addUser}
              onRequestClose={() => handleCloseModal(setAddUser)} 
            >
              <h2 className="title">Cadastro de Usuários</h2>
              <div className="modal_div_form">
                <form action="" className="modal_Form" onSubmit={(e) => handleAddUser(e)}>
                  <label>Nome Completo:</label>
                  <input type="text" required onChange={(e) => setNome(e.target.value) } />
                  <label>Cpf:</label>
                  <input type="text" required onChange={(e) => setCpf(e.target.value) } />
                  <label>E-mail:</label>
                  <input type="text" required onChange={(e) => setEmail(e.target.value) } />
                  <label>Senha:</label>
                  <input type="text" required onChange={(e) => setSenha(e.target.value) } />
                  <label>Telefone</label>
                  <input type="text" required onChange={(e) => setTelefone(e.target.value) } />
                  <label>CEP:</label>
                  <input type="text" required onChange={(e) => setCep(e.target.value) } />
                  <label>Endereço:</label>
                  <input type="text" required onChange={(e) => setEndereco(e.target.value) } />
                  <label>Número</label>
                  <input type="text" required onChange={(e) => setNumero(e.target.value) } />
                  <label>Complemento</label>
                  <input type="text" required onChange={(e) => setComplemento(e.target.value) } />
                  <label>Bairro</label>
                  <input type="text" required onChange={(e) => setBairro(e.target.value) } />
                  <label>Cidade</label>
                  <input type="text" required onChange={(e) => setCidade(e.target.value) } />
                  <label>Estado</label>
                  <input type="text" required onChange={(e) => setEstado(e.target.value) } />
                  <label>Data de Nascimento</label>
                  <input type="text" required onChange={(e) => setDataNascimento(e.target.value) } />
                  <button onClick={handleCloseModal} className="modal_button">Enviar</button>
                </form>
              </div>
              </Modal>                 
              <div>
              </div>
          <input className="pesquisa" alt="pesquisa" placeholder="Pesquisa"/>
          <button className="btnpesquisa"> <img src="src\assets\imagens\procurar.png"/> </button>
        </div>

        <div className="list">
        <div className="header_list"> 
          <div className="header_info">Nome</div>
          <div className="header_info">Login</div>
          <div className="header_info">Email</div>
          <div className="header_info">Telefone</div>
          <div className="header_info">Status</div>
          <div className="header_info">Ações</div>
        </div>
        
          <div>
            {allUserInfo.map((user) => (
              <div className="body_list">
              <div className="body_info">{user.nome}</div>
              <div className="body_info">{user.email.slice(0, user.email.indexOf("@"))}</div>
              <div className="body_info">{user.email}</div>
              <div className="body_info">{user.telefone}</div>
              <div className="body_info">Ativo</div>
              <div className="btn_info">
                <button className="btn_info_btn" onClick={() => handleOpenModal(setShowInfo, user.id)}> {/*"https://www.flaticon.com/br/icones-gratis/olho"*/}<img src="src\assets\imagens\olho.png"/></button>
                  <Modal 
                    isOpen={showInfo === user.id}
                    onRequestClose={() => handleCloseModal(setShowInfo)} 
                  >
                    <div className="modal_div_form">
                      <form action="" className="modal_Form">
                        <label>Nome: {user.nome}</label>
                        <label>CPF: {user.cpf}</label>
                        <label>Telefone: {user.telefone}</label>
                        <label>Cep: {user.cep}</label>
                        <label>Endereço: {user.endereco}</label>
                        <label>Numero: {user.numero}</label>
                        <label>Complemento: {user.complemento}</label>
                        <label>Bairro: {user.bairro}</label>
                        <label>Cidade: {user.cidade}</label>
                        <label>Estado: {user.estado}</label>
                        <label>Data de Nascimento: {user.data_nascimento}</label>
                      </form>
                    </div>
                  </Modal>

                  <button className="btn_info_btn" onClick={() => handleOpenModal(setUpdate)}>{/*"https://www.flaticon.com/br/icones-gratis/lapis"*/} <img src="src\assets\imagens\lapis.png"/></button>
                  <Modal 
                    isOpen={update}
                    onRequestClose={() => handleCloseModal(setUpdate)} 
                  >
                    <label>Nome: arthur</label>
                    <label>CPF: 123</label>
                    <label>Telefone: 123</label>
                    <label>25465</label>
                    <label>Endereço: awrew</label>
                    <label>Numero: 12345</label>
                    <label>Complemento: dsfwr</label>
                    <label>Bairro: dsfwr</label>
                    <label>Cidade: mh</label>
                    <label>Estado: mg</label>
                    <label>Data de Nascimento: 1992-02-02</label>
                </Modal>

                  <button className="btn_info_btn" onClick={() => {
                    const id = user.id;
                    axios.delete("http://localhost:3000/deleteUser/"+ id)
                    setUpdateWindow(!updateWindow)
                    handleOpenModal}}><img src="src\assets\imagens\excluir.png"/></button>
                  {/*<Modal 
                    isOpen={modalIsOpen}
                    onRequestClose={handleCloseModal}
                    action="delete"
                  >
                    <label>Nome: arthur</label>
                    <label>CPF: 123</label>
                    <label>Telefone: 123</label>
                    <label>25465</label>
                    <label>Endereço: awrew</label>
                    <label>Numero: 12345</label>
                    <label>Complemento: dsfwr</label>
                    <label>Bairro: dsfwr</label>
                    <label>Cidade: mh</label>
                    <label>Estado: mg</label>
                    <label>Data de Nascimento: 1992-02-02</label>
                  </Modal>*/}
              </div>
            </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard;
