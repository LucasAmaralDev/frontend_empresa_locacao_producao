import styles from './styles.module.css'
export function Header() {

    return(
        <header className={styles.header}>
            <h1>Luisa Locações</h1>

            <nav className={styles.animar}>
                <p onClick={() => { window.location.href = "#inicio" }}>Inicio</p>
                <p onClick={() => { window.location.href = "#agendamento" }}>Agendamento</p>
                <p onClick={() => { window.location.href = "https://api.whatsapp.com/send?phone=+5565984382796&text=Ol%C3%A1,%20gostaria%20de%20agendar%20um%20brinquedo" } }>Contato</p>
            </nav>

        </header>
    )
}