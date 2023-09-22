import { useRef, useState } from "react";
import Webcam from "react-webcam";
import "./Camera.module.scss";

// Base64 エンコードされたデータを Blob オブジェクトに変換
const base64ToBlob = (base64data, contentType) => {
  //   // データURIからbase64データのみを取得する
  const base64Payload = base64data.split(',')[1];
  const byteCharacters = atob(base64Payload);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};



// eslint-disable-next-line react/prop-types
const Camera = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(true);
  const [capturedImage, setCapturedImage] = useState(null); // キャプチャ画像を保存するステート

  const capture = (e) => {
      e.preventDefault();
      e.stopPropagation();
    if (isCapturing) {
      setIsCapturing(false);
      const imageSrc = webcamRef.current.getScreenshot();
    //   console.log("Captured Image:", imageSrc); // キャプチャされた画像をコンソールに表示

      setCapturedImage(imageSrc);
      const contentType = "image/jpeg";
      const blobImage = base64ToBlob(imageSrc, contentType);

      const fileImage = new File([blobImage], "image.jpeg", {
        type: contentType,
      });

    //   console.log(blobImage); // Blobオブジェクトが正しく生成されていることを確認
    //   console.log(fileImage); // Fileオブジェクトが正しく生成されていることを確認

      onCapture(fileImage);
    } else {
      setIsCapturing(true);
      setCapturedImage(null);
    }
  };

  const videoConstraints = {
    facingMode: "environment", // "user" はフロントカメラ, "environment" は後ろのカメラ
  };
  //  videoConstraints={(isMobile) ? {facingMode:{exact:"environment"}} : {facingMode:"user"}}

  const videoStyle = {
    width: "250px", // 幅を変更する値に設定
    height: "250px", // 高さを自動調整する場合
  };
  return (
    <div className="camera-container">
      {isCapturing ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={videoStyle}
            videoConstraints={videoConstraints}
          />
          <button onClick={capture} className="pink-button">
            停止
          </button>
        </>
      ) : (
        <>
          <img
            src={capturedImage}
            alt="キャプチャされた画像"
            style={{ width: "250px", height: "250px" }}
          />
          <button type="button" onClick={capture} className="pink-button">
            再撮影
          </button>
        </>
      )}
    </div>
  );
};

export default Camera;























