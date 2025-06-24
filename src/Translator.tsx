import React from "react"
import AudioRecorder from "./AudioRecorder"
import { QRCodeCanvas } from "qrcode.react"


const SERVER_IP = "http://192.168.247.196:8000"

interface TranslatorProps {
  targetLang: string,
  setTargetLang: (lang: string) => void,
  inputText: string,
  setInputText: (text: string) => void,
  outputText: string,
  setOutputText: (text: string) => void,
}

function TranslationBlock({
  targetLang,
  setTargetLang,
  inputText,
  setInputText,
  outputText,
  setOutputText
}: TranslatorProps) {

  const handleTranslate = async () => {
    try {
      const response = await window.api.axios.post(`${SERVER_IP}/translate/text`, {
        text: inputText,
        target: targetLang,
      });
      console.log(response)
      setOutputText(response.data["translated"]);
    } catch (error) {
      console.error("Error translating:", error);
      setOutputText("Error al traducir.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 w-full max-w-4xl mx-auto">
      {/* Fila 1 */}
      <div className="flex justify-between items-center gap-4">
        <label className="text-lg font-semibold whitespace-nowrap">Detección automática</label>
        <input
          type="text"
          className="flex-1 w-fit px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          placeholder="Idioma destino (ej. en, es, fr)"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        />
      </div>

      {/* Fila 2 */}
      <div className="flex gap-4">
        <textarea
          className="w-1/2 h-48 p-3 border rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-400"
          placeholder="Texto de entrada"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <textarea
          className="w-1/2 h-48 p-3 border rounded-md bg-gray-100 resize-none"
          placeholder="Texto traducido"
          value={outputText}
          readOnly
        />
      </div>

      {/* translate buttons */}
      <div className="flex gap-4">
        <button
          className="self-start px-4 py-2 mt-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          onClick={handleTranslate}
        >
          Traducir
        </button>
        <AudioRecorder setOutputText={setOutputText}></AudioRecorder>
      </div>
      <div>
        <QRCodeCanvas value={outputText} />
      </div>

    </div>
  );
};

export default TranslationBlock;
