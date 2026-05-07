import { useEffect, useMemo, useRef, useState } from 'react';

import ImageError from '../Component/ImageError/ImageError';
import ImagePlaceholder from '../Component/ImagePlaceholder/ImagePlaceholder';

import styles from './Image.module.css';

type Props = {
  data: string | File | Blob,
  alt: string,
  aspectRatioClassName: string,
  placeholder: string,
  className: string,
};

function Image({ data, alt, aspectRatioClassName, placeholder, className, ...rest }: Props) {
  const [currentState, setCurrentState] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);

  const imgSrc = useMemo(() => {
    if (typeof data === 'string') {
      return { src: data, needRevoke: false };
    }
    if (data instanceof File || data instanceof Blob) {
      return { src: URL.createObjectURL(data), needRevoke: true };
    }
    return { src: '', needRevoke: false };
  }, [data]);


  useEffect(() => {
    const img = imgRef.current;
    if (img) {
      if (img.complete) {
        setCurrentState(1);
      } else {
        img.onload = () => {
          setCurrentState(1);
        };
      }
      img.onerror = () => {
        setCurrentState(-1);
      };

      const { src, needRevoke } = imgSrc;
      return () => {
        if (needRevoke) {
          URL.revokeObjectURL(src);
        }
      };
    }
  }, [imgSrc]);

  return (
    <div
      className={
        aspectRatioClassName
          ? `${styles.imageContainer} ${aspectRatioClassName}`
          : styles.imageContainerNoAspectRatio
      }
    >
      <ImagePlaceholder currentState={currentState} placeholder={placeholder} />
      {currentState >= 0 ? (
        <img
          {...rest}
          ref={imgRef}
          src={imgSrc.src}
          alt={alt}
          className={`${className ? `${className} ` : ''}${aspectRatioClassName ? styles.imageWithAspectRatio : styles.imageNoAspectRatio}${currentState === 0 ? ` ${styles.loading}` : ''} ${styles.image}`}
        />
      ) : (
        <ImageError alt={alt} />
      )}
    </div>
  );
}
export default Image;
