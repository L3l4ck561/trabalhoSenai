import React, { useState, useRef, useEffect } from 'react';

import './HardwareAPIs.css';

function HardwareAPIs() {
  const [localizacao, setLocalizacao] = useState(null);
  const [erroLocalizacao, setErroLocalizacao] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [erroCamera, setErroCamera] = useState(null);
  const [cameraLigada, setCameraLigada] = useState(false);


  const handleObterLocalizacao = () => {
    if (!navigator.geolocation) {
      setErroLocalizacao('Geolocalização não é suportada pelo seu navegador.');
      return;
    }
    setErroLocalizacao(null);
    setLocalizacao(null);

    navigator.geolocation.getCurrentPosition(
      (posicao) => {
        setLocalizacao({
          latitude: posicao.coords.latitude,
          longitude: posicao.coords.longitude,
        });
      },
      (erro) => {
        setErroLocalizacao(`Erro ao obter localização: ${erro.message}`);
      }
    );
  };

  const handleLigarCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setErroCamera('API de câmera não suportada pelo seu navegador.');
      return;
    }
    setErroCamera(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraLigada(true);
    } catch (erro) {
      console.error('Erro ao acessar a câmera:', erro);
      setErroCamera('Permissão da câmera negada ou dispositivo não encontrado.');
      setCameraLigada(false);
    }
  };

  const handleDesligarCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraLigada(false);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>APIs de Hardware do Navegador</h1>
        <div className="section">
          <h2>Geolocalização (GPS)</h2>
          <button
            className="button"
            onClick={handleObterLocalizacao}
          >
            Obter Minha Localização
          </button>

          {erroLocalizacao && <p className="error">{erroLocalizacao}</p>}
          {localizacao && (
            <div className="results">
              <p><strong>Latitude:</strong> {localizacao.latitude}</p>
              <p><strong>Longitude:</strong> {localizacao.longitude}</p>
            </div>
          )}
        </div>

        <div className="section">
          <h2>Câmera</h2>

          {!cameraLigada ? (
            <button
              className="button"
              onClick={handleLigarCamera}
            >
              Ligar Câmera
            </button>
          ) : (
            <button
              className="button danger"
              onClick={handleDesligarCamera}
            >
              Desligar Câmera
            </button>
          )}

          {erroCamera && <p className="error">{erroCamera}</p>}

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ 
              width: '100%', 
              height: 'auto', 
              marginTop: '15px', 
              borderRadius: '4px',
              display: cameraLigada ? 'block' : 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default HardwareAPIs;
