

export function WhatsappButton(props) {

    return (
        <div className="WhatsappButton">
            {/* link para o whatsapp recebendo os dados de numero e mensagem nas props */}
            <a href={`https://api.whatsapp.com/send?phone=${props.number}&text=${props.message}`} target="_blank">
                <img src="https://www.freepnglogos.com/uploads/whatsapp-logo-light-green-png-0.png" alt="Whatsapp" />
            </a>
        </div>
    )
}