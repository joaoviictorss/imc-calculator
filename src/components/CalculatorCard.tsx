import { useState } from "react";
import "../styles/CalculatorCard.css";
import Button from "./Button";

export default function CalculatorCard() {
  const [Altura, setAltura] = useState<any>("");
  const [Peso, setPeso] = useState<any>("");

  const [imc, setImc] = useState<any>(0);
  const [situação, setSituação] = useState<any>("");
  const [visible, setVisible] = useState<"calculator" | "table">("calculator");

  function calcularIMC(Peso: any, Altura: any) {
    if (!Peso || !Altura) return;

    const PesoFloat = +Peso.replace(",", ".");
    const AlturaFloat = +Altura.replace(",", ".");

    const total = PesoFloat / (AlturaFloat * AlturaFloat);
    setImc(total.toFixed(1));
    setVisible("table");

    total < 18.5
      ? setSituação("Magreza")
      : total > 18.5 && total <= 24.9
      ? setSituação("Normal")
      : total > 25.0 && total <= 29.9
      ? setSituação("Sobrepeso")
      : total > 30.0 && total <= 39.9
      ? setSituação("Obesidade")
      : setSituação("Obesidade Grave");
  }

  function limparDados() {
    setAltura("");
    setPeso("");
  }

  return (
    <div className="card">
      {visible === "calculator" ? (
        <>
          <div className="container-infos">
            <h1>Calculadora de IMC</h1>
            <label>Altura:</label>
            <input
              type="number"
              placeholder="Exemplo: 1,75"
              onChange={(e) => setAltura(e.target.value)}
              value={Altura}
            />
            <label>Peso:</label>
            <input
              type="number"
              placeholder="Exemplo: 70,5"
              onChange={(e) => setPeso(e.target.value)}
              value={Peso}
            />
          </div>
          <div className="button-container">
            <Button color="red" onClick={() => calcularIMC(Peso, Altura)}>
              CALCULAR
            </Button>
            <Button color="gray" onClick={limparDados}>
              LIMPAR
            </Button>
          </div>
        </>
      ) : (
        <>
          <h1>Seu IMC: {<span className={`${situação}`}>{imc}</span>}</h1>
          <h2>
            Situação atual: {<span className={`${situação}`}>{situação}</span>}
          </h2>
          <p>confira as classificações:</p>

          <div className="table-head">
            <p>IMC</p>
            <p>Classificação</p>
            <p>Obesidade</p>
          </div>
          <div className="table-data">
            <p>Menor que 18,5</p>
            <p>Magreza</p>
            <p>0</p>
          </div>
          <div className="table-data">
            <p>Entre 18,5 e 24,9</p>
            <p>Normal</p>
            <p>0</p>
          </div>
          <div className="table-data">
            <p>Entre 25,0 e 29,9</p>
            <p>Sobrepeso</p>
            <p>I</p>
          </div>
          <div className="table-data">
            <p>Entre 30,0 e 39,9</p>
            <p>Obesidade</p>
            <p>II</p>
          </div>
          <div className="table-data">
            <p>Maior que 40,0</p>
            <p>Obesidade Grave</p>
            <p>III</p>
          </div>

          <Button color="red" onClick={() => setVisible("calculator")}>
            VOLTAR
          </Button>
        </>
      )}
    </div>
  );
}
