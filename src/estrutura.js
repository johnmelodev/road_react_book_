// ✅ Quando precisa guardar um valor entre renders, mas sem re-renderizar.
// useRef nao renderiza na interface UI

import { useRef } from "react";

function ExemploUseRef() {
  const inputRef = useRef(null);

  const focarInput = () => {
    inputRef.current.focus(); // Foca no input
    inputRef.current.value = "Texto alterado!"; // Modifica o valor sem re-renderizar
  };

  return (
    <div>
      <input ref={inputRef} placeholder="Digite algo..." />
      <button onClick={focarInput}>Focar no Input</button>
    </div>
  );
}
