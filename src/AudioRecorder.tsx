import React, { useState, useRef } from "react"


const SERVER_IP = "http://192.168.247.196:8000"

interface AudioRecorderProps {
  setOutputText: (text: string) => void,
}

function AudioRecorder({ setOutputText }: AudioRecorderProps) {
  // initialize variables
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const startRecording = async () => {
    try {
      // initialize audio recorder
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm' // webm audio format, wav not supported
      })

      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      // if stops listening, send the audio to the backend
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        sendAudioToBackend(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      // failed microphone permissions
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const sendAudioToBackend = async (audioBlob: Blob) => {
    try {
      const formData = {
        "file": audioBlob,
      }
      const response = await window.api.axios.post(`${SERVER_IP}/translate/audio`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log('Translation response:', response)
      setOutputText(response.data["translated"])
    } catch (error) {
      console.error('Error sending audio:', error);
    }
  };

  return (
    <button
      className="self-start px-4 py-2 mt-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
      onClick={isRecording ? stopRecording : startRecording}
    >
      {isRecording ? 'Parar grabación' : 'Grabar voz'}
    </button>
  )
}

export default AudioRecorder
