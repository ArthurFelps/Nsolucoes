import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./styles.css";
import axios from "axios";



function Login(){
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    const navigate = useNavigate();

    function onSubmit(e) {
        e.preventDefault();

        axios.post("http://localhost:3000/login", {email, senha})
            .then(res => {
                if (res.data.message === "User Not Found") return alert(res.data.message);
                if (res.data.message === "Login Success") return navigate("/dashboard");
            })
            .catch(err => console.log(err));
    }

    return(
        <div className="wrapper fadeInDown">
  
            <div className="content-login">

                <h2 className="active"> Login </h2>

                <form className="box-login" method="post" onSubmit={(e) => onSubmit(e)}>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="campo" name="email" placeholder="E-mail"/>
                    <input onChange={(e) => setSenha(e.target.value)} type="text" id="senha" className="campo" name="senha" placeholder="Senha"/>
                    <input type="submit" className="botao" value="Entrar"/>
                </form>


                <div className="box-lembrar-senha">  
                    <a className="link" href="#">Cadastrar</a>
                </div>

            </div>

        </div>
    )
}
export default Login;