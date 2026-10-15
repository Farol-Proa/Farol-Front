function Header({onEntrar}) {
    return (
        <>
            <header className="cabecalho">
                <a className="logo" href="#">
                    <span className="logo-icone">✦</span>
                    <span>Farol</span>
                </a>

                <nav className="navegacao bg-black">
                    <a href="#farol">O Farol</a>
                    <a href="#recursos">Recursos</a>
                    <a href="#como-funciona">Como funciona</a>
                </nav>

                <div className="acoes-cabecalho">
                    <button className="botao-entrar" onClick={onEntrar}>Entrar</button>
                    <a className="botao botao-principal" href="#jornada">
                        Começar agora <span>→</span>
                    </a>
                </div>
            </header>
        </>

    )

}
export default Header;