
import style from './style.module.css';
import { useEffect, useState } from 'react';
import { WhatsappButton } from '../../Components/WhatsappButton/WhatsappButton';


export function Agendamento() {
    const URL_BACKEND = 'https://aws-empresa.onrender.com'
    const WHATSAPPNUMBER = "+5565984382796"
    const WHATSAPPMESSAGE = "Olá, gostaria de agendar um brinquedo"

    const [data, setData] = useState(() => { return new Date().toISOString().split('T')[0]; })
    const [textData, setTextData] = useState('')




    //Sempre que for setada uma nova data verifica se ela é menor que a data atual
    useEffect(() => {
        const dataAtual = new Date().toISOString().split('T')[0];
        if (data < dataAtual) {
            alert('Data invalida')
            setData(dataAtual)
        }
    }, [data])




    // Sempre que a data for alterada, converte ela para texto para ser exibida ao usuario
    useEffect(() => {
        // convertendo para string e separando em um array
        const [ano, mes, dia] = String(data).split("-");

        // convertendo para numero e subtraindo 1 do mes
        const datan = new Date(ano, mes - 1, dia);

        // convertendo para texto
        const options = { day: 'numeric', month: 'long' };
        const dataFormatada = datan.toLocaleDateString('pt-BR', options);

        setTextData(dataFormatada);



        // const options = { day: 'numeric', month: 'long'};
        // const dataFormatada = dataBug.toLocaleDateString('pt-BR', options);

        // setTextData(dataFormatada);
    }, [data])






    const [agendamentos, setAgendamentos] = useState([])
    const [produtos, setProdutos] = useState([])
    
    



    // recebe agendamentos e armazena no estado agendamentos
    async function receberAgendamentos() {
        const result = await fetch(`${URL_BACKEND}/agendamento`)
        const data = await result.json()
        console.log(data)
        if (result.status === 200) {
            setAgendamentos(data)
        }
    }

    // recebe agendamentos e armazena no estado produtos
    async function receberProdutos() {
        const result = await fetch(`${URL_BACKEND}/produto`)
        const data = await result.json()
        console.log(data)
        if (result.status === 200) {
            setProdutos(data)
        }
    }

    useEffect(() => {
        receberAgendamentos()
        receberProdutos()
    }, [])











    return (
        <div className={`${style.base}`} id="agendamento">
            <h1>Agende Sua data</h1>
            <input type="date" name="" id="" value={data} className={style.dataInput} onChange={(e) => setData(e.target.value)} />
            <span className={style.instrucao}>*Insira a data desejada e veja quais produtos estão disponiveis</span>
            <>{textData && <h2>{textData}</h2>}</>
            <div className={style.container}>
                
                {produtos.length > 0

                    ?

                    produtos.map((produto) => {


                        // ver se na data marcada o pula pula esta disponivel

                        const locado = agendamentos.map((agendamento) => {
                            if (agendamento.data == data) {
                                if (agendamento.produto_id === produto.id) {
                                    return true
                                }
                            }
                        })

                        let imagem

                        switch (produto.id) {
                            case 1:
                                imagem = 'https://8866.cdn.simplo7.net/static/8866/sku/piscina-de-bolinhas-piscina-de-bolinhas-casinha-piscina-de-bolinhas-2-00m-completa--p-1621358408404.jpg'
                                break;
                            
                            case 2:
                                imagem = 'https://down-br.img.susercontent.com/file/sg-11134201-7qvds-liazbuyiinsw5c_tn'
                        
                            case 3:
                                imagem = 'https://imgs.casasbahia.com.br/1513363533/1xg.jpg'
                        }


                        return (
                            <div className={style.card}>
                                <img src={imagem} alt="" />
                                <h1>{produto.descricao}</h1>
                                <p>Status<br/>{locado.includes(true) ? <span className={style.vermelho}>Locado</span> : <span className={style.verde}>Disponivel</span>}</p>
                            </div>
                        )





                    })

                    : <p>Carregando...</p>
                }
            <WhatsappButton number={WHATSAPPNUMBER} message={WHATSAPPMESSAGE} />
            </div>

                {/* Link para enviar a pessoa para o whatsapp ja com mensagem */}
        </div>
    )
}