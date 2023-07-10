
import style from './style.module.css';
import { useEffect, useState } from 'react';
import { WhatsappButton } from '../../Components/WhatsappButton/WhatsappButton';


export function Agendamento() {
    const URL_BACKEND = 'https://aws-empresa.onrender.com'
    const WHATSAPPNUMBER = "+5565984382796"

    const [data, setData] = useState(() => { return new Date().toISOString().split('T')[0]; })
    const [textData, setTextData] = useState('')

    const pacotes = [
        {
            name: "COMBO - Pula Pula Médio + Piscina de bolinhas",
            price: "R$130,00",
            produtos: [1, 2],
            img: 'https://a-static.mlcdn.com.br/800x560/cama-elastica-pula-pula-trampolim-230m-piscina-de-bolinhas-100m-nacional-premium-playground-rotoplay-brinquedos/grupocardoso/cama230piscina100/df9e9075282f09c5de587643493c131e.jpeg'
        },
        {
            name: "COMBO - Pula Pula Grande + Piscina de bolinhas",
            price: "R$150,00",
            produtos: [1, 3],
            img: 'https://a-static.mlcdn.com.br/800x560/pula-pula-trampolim-305m-grande-piscina-de-bolinhas-quadrada-100m-premium-rotoplay-brinquedos/mvbbrinquedos/c230p200escm2/1c30a124f608bb3033710709cca081e1.jpeg'
        },
        {
            name: "Pula Pula Médio",
            price: "R$90,00",
            produtos: [1],
            img: 'https://http2.mlstatic.com/D_NQ_NP_710023-MLB53583350999_022023-O.webp'
        },
        {
            name: "Pula Pula Grande",
            price: "R$110,00",
            produtos: [3],
            img: 'https://http2.mlstatic.com/D_NQ_NP_760275-MLB54196710876_032023-O.webp'
        },
        {
            name: "Piscina de bolinhas",
            price: "R$60,00",
            produtos: [2],
            img: 'https://http2.mlstatic.com/D_NQ_NP_830023-MLB31193525976_062019-O.webp'
        }
    ]




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




    function agendar(pacote){
        const item = pacote.name
        const link = `https://wa.me/${WHATSAPPNUMBER}?text=Olá Gostaria de agendar o item ${item}, na data ${textData}`
        window.open(link, '_blank')
    }







    return (
        <div className={`${style.base}`} id="agendamento">
            <h1>Agende Sua data</h1>
            <input type="date" name="" id="" value={data} className={style.dataInput} onChange={(e) => setData(e.target.value)} />
            <span className={style.instrucao}>*Insira a data desejada e veja quais produtos estão disponiveis</span>
            <>{textData && <h2>{textData}</h2>}</>
            <div className={style.container}>

                { agendamentos.length> 0
                    // verifica se a data é igual a data do agendamento e se o produto esta incluso no agendamento
                    ?pacotes && pacotes.map((pacote, index) => {

                        let indisponivel = false
                        indisponivel = agendamentos.map((agendamento, index) => {
                            if (data === agendamento.data && pacote.produtos.includes(agendamento.produto_id)) {
                                return true
                            }
                        })

                        const estaLocado = indisponivel.includes(true)


                        return (
                            <div className={style.card}>
                                <img src={pacote.img} alt="" />
                                <p className={style.namecombo}> {pacote.name}</p>
                                <p className={style.preco}> {pacote.price}</p>
                                {
                                    agendamentos.length > 0 && estaLocado

                                        ?
                                        <button
                                            disabled
                                            className={style.vermelho}>
                                            Indisponivel
                                        </button>

                                        :
                                        <button
                                            className={style.verde}
                                            onClick={() => agendar(pacote)}>
                                            
                                            Agendar
                                        </button>
                                }
                            </div>
                        )
                    })
                    : <h1>Carregando...</h1>

                }

                {/* <WhatsappButton number={WHATSAPPNUMBER} message={WHATSAPPMESSAGE} /> */}
            </div>

            {/* Link para enviar a pessoa para o whatsapp ja com mensagem */}
        </div>
    )
}