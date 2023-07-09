import { Header } from "./Components/Header/Header";
import './global.css'
import { Agendamento } from "./Pages/Agendamento";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="baseRotas">

        <section id="inicio">
          <h1>Seja bem vindo a Luisa Locações!</h1>
          <div className="apresentacao">
            <div>
              <p>Somos uma empresa especializada em entretenimento infantil</p>
              <img src="https://down-br.img.susercontent.com/file/sg-11134201-7qvds-liazbuyiinsw5c_tn" />
            </div>
            <div>
              <p>Locação de Pula Pula e Piscina de bolinhas para festas infantis e eventos em geral.</p>
              <img src="https://8866.cdn.simplo7.net/static/8866/sku/piscina-de-bolinhas-piscina-de-bolinhas-casinha-piscina-de-bolinhas-2-00m-completa--p-1621358408404.jpg" />
            </div>
          </div>

        </section>

        <Agendamento/>
      </div>
    </div>
  );
}

export default App;
