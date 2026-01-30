function Tutorial() {
    return <iframe style={{height: '100vh', width: '100%'}}
                   src={import.meta.env.VITE_DOCS_URL}/>
}

export default Tutorial;
