import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const API_BASE = "http://localhost:5001"

const Login = () => {

// HOOK -useState - manipula o estado da variavel
  const [email,setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  //HOOK - useNavigate - navega entre os componentes 
  const navigate = useNavigate();

 const handleLogin = async (e) => {
        e.preventDefault();
        setMensagem("");

        try {
            const response = await axios.post(`${API_BASE}/login`, { email, senha });
            
            const token = response.data.token;
            
            if (token) {
                localStorage.setItem('token', token);
                setMensagem('Login bem-sucedido!');
                setTimeout(() => navigate("/dashboard"), 1000); // Redirecionamento mais rápido
            } else {
                setMensagem("Erro: Token de autenticação não recebido.");
            }

        } catch (error) {
            // Captura a mensagem de erro do servidor (ex: "Usuário ou senha inválidos")
            const errorMessage = error.response?.data?.message || 'Erro de conexão ou servidor.';
            setMensagem(errorMessage);
        }
    };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Senha</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Entrar
          </button>
        </form>
        {mensagem && <p className="mt-4 text-center text-red-500">{mensagem}</p>}
        <p className="mt-4 text-center">
          Não tem uma conta? <a href="/register" className="text-blue-500 hover:underline">Cadastre-se</a>
        </p>
      </div>
    </div>
  )
}

export default Login