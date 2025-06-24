import React from "react"
import Select from "react-select";
import AudioRecorder from "./AudioRecorder"
import { QRCodeCanvas } from "qrcode.react"


const SERVER_IP = "http://192.168.247.196:8000"

const languageOptions = [
  { value: "ar", label: "العربية" },
  { value: "bn", label: "বাংলা" },
  { value: "zh", label: "中文" },
  { value: "en", label: "English" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "hi", label: "हिन्दी" },
  { value: "id", label: "Bahasa Indonesia" },
  { value: "it", label: "Italiano" },
  { value: "ja", label: "日本語" },
  { value: "ko", label: "한국어" },
  { value: "pt", label: "Português" },
  { value: "ru", label: "Русский" },
  { value: "es", label: "Español" },
  { value: "sw", label: "Kiswahili" },
  { value: "th", label: "ไทย" },
  { value: "tr", label: "Türkçe" },
  { value: "uk", label: "Українська" },
  { value: "ur", label: "اردو" },
  { value: "vi", label: "Tiếng Việt" }
];

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
    <div className="flex flex-col justify-center items-center gap-4 p-4 w-full max-w-4xl mx-auto">
      {/* row 1 */}
      <div className="flex justify-between items-center gap-12">
        <label className="text-lg font-semibold whitespace-nowrap">Detección automática</label>
        <Select
          className="flex-1 w-fit px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          placeholder="Idioma de destino"
          value={{
            label: targetLang,
            value: targetLang
          }}
          options={languageOptions}
          onChange={(option) => setTargetLang(option?.value || 'en')
          }
        ></Select>
      </div>

      {/* row 2 */}
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
