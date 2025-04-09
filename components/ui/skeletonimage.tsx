"use client";

import Image, { ImageProps } from "next/image";
import { Skeleton } from "./skeleton";
import React, { useCallback, useState } from "react";

type SkeletonImageProps =
  | ({ useHtmlImg: true } & React.ComponentProps<"img">)
  | ({ useHtmlImg: false | never } & ImageProps);

export default function SkeletonImage({
  useHtmlImg,
  onLoad,
  className,
  ...props
}: SkeletonImageProps) {
  const [loaded, setLoaded] = useState(false);

  const callback = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      setLoaded(true);
      if (onLoad) onLoad(event);
    },
    [],
  );

  const commonClass = loaded
    ? `${className} animate-fade-in`
    : "fixed top-0 right-0 opacity-0";

  return (
    <>
      {!loaded && <Skeleton className={className} />}
      {useHtmlImg ? (
        <img
          {...(props as React.ImgHTMLAttributes<HTMLImageElement>)}
          className={commonClass}
          loading="lazy"
          onLoad={callback}
        />
      ) : (
        <Image
          {...(props as ImageProps)}
          className={commonClass}
          loading="lazy"
          onLoad={callback}
        />
      )}
    </>
  );
}
