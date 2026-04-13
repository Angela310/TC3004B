import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

function App() {
  const [texto, setTexto] = useState("");
  const [llave, setLlave] = useState("");
  const [textoCifrado, setTextoCifrado] = useState("");

  useEffect(() => {
    if (texto && llave) {
      const cifrado = CryptoJS.AES.encrypt(texto, llave).toString();
      setTextoCifrado(cifrado);
    } else {
      setTextoCifrado("");
    }
  }, [texto, llave]);

  return (
    <div className="App" style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Hash-Cipher-Decipher</h1>

      <div style={{ marginBottom: "15px" }}>
        <label>Texto a cifrar:</label>
        <br />
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribe un texto"
          style={{ width: "300px", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Llave:</label>
        <br />
        <input
          type="text"
          value={llave}
          onChange={(e) => setLlave(e.target.value)}
          placeholder="Escribe la llave"
          style={{ width: "300px", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Texto cifrado:</label>
        <br />
        <input
          type="text"
          value={textoCifrado}
          readOnly
          placeholder="Aquí aparecerá el texto cifrado"
          style={{ width: "500px", padding: "8px", marginTop: "5px" }}
        />
      </div>
    </div>
  );
}

export default App;