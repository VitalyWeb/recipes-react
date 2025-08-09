import React, { useState } from 'react';
import noLoad from "../img/noLoad.png";

export default function FallbackImg({ src, alt }) {
  const [imgSrc, setImgSrc] = useState(src || noLoad);
  const handleError = () => {
    setImgSrc(noLoad);
  };
  return <img src={imgSrc} alt={alt} onError={handleError} />;
}