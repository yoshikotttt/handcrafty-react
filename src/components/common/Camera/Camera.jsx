import { useRef, useState } from "react";
import Webcam from "react-webcam";
import styles from "./Camera.module.scss";
import { IoIosRadioButtonOn } from "react-icons/io";
import { FaCamera } from "react-icons/fa";

// Webカメラを使って画像をキャプチャ、キャプチャした画像はBase64形式からBlobオブジェクトに変換
// 変換後、Fileオブジェクトとして親コンポーネントに渡す
// キャプチャと再キャプチャを切り替える機能もあり

// Base64 エンコードされたデータを Blob オブジェクトに変換
const base64ToBlob = (base64data, contentType) => {
  // データURIからbase64データのみを取得する
  const base64Payload = base64data.split(",")[1];
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

// Cameraコンポーネントの定義
// eslint-disable-next-line react/prop-types
const Camera = ({ onCapture }) => {
  const webcamRef = useRef(null); // Webcamコンポーネントへの参照を保持
  const [isCapturing, setIsCapturing] = useState(true); // 現在キャプチャモードかどうかのステート
  const [capturedImage, setCapturedImage] = useState(null); // キャプチャ画像を保存するステート

  // 画像をキャプチャする関数
  const capture = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCapturing) {
      setIsCapturing(false);
      const imageSrc = webcamRef.current.getScreenshot(); // Webcamからスクリーンショットを取得

      setCapturedImage(imageSrc);
      const contentType = "image/jpeg";
      const blobImage = base64ToBlob(imageSrc, contentType);

      const fileImage = new File([blobImage], "image.jpeg", {
        type: contentType,
      });

      // 生成したFileオブジェクトを外部に伝える
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
    width: "20rem", // 幅を変更する値に設定
    height: "auto", // 高さを自動調整する場合
    marginBottom: "1rem",
  };

  return (
    <div className={styles["camera-container"]}>
      {/* キャプチャモード時の表示 */}
      {isCapturing ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            // className={styles["camera-container__video"]} 今回はstyleで記述
            videoConstraints={videoConstraints}
            style={videoStyle}
          />
          <IoIosRadioButtonOn
            onClick={capture}
            size={50}
            color="#e8aaa3"
            // className={`${styles["camera-container__button"]} ${styles["camera-container__button--pink"]}`} 今回はstyleで記述
          />
        </>
      ) : (
        // 画像がキャプチャされた後の表示
        <>
          <img
            src={capturedImage}
            alt="キャプチャされた画像"
            className={styles["camera-container__image"]}
            style={{ ...videoStyle, objectFit: "cover" }}
          />
          <FaCamera
            onClick={capture}
            className={`${styles["camera-container__button"]} ${styles["camera-container__button--pink"]}`}
          />
        </>
      )}
    </div>
  );
};

export default Camera;
