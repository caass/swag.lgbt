import type { FunctionComponent } from "react";
import type { ImageLoader, ImageProps } from "next/image";
import NextImage from "next/image";

const workersImageLoader: ImageLoader = ({ src, width, quality }) => {
  if (!quality) {
    quality = 75;
  }

  return `https:/api.swag.lgbt/resize-image?width=${width}&quality=${quality}&image=https://swag.lgbt${src}`;
};

export const Image: FunctionComponent<
  Omit<ImageProps, "loader" | "unoptimized">
> = (props) => {
  if (process.env.NODE_ENV === "development") {
    return <NextImage unoptimized {...props} />;
  }
  return <NextImage loader={workersImageLoader} {...props} />;
};
