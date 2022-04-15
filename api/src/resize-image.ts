function getImageParam<T extends keyof RequestInitCfPropertiesImage>(
  url: URL,
  property: T
): RequestInitCfPropertiesImage[T] {
  if (!url.searchParams.has(property)) {
    return undefined;
  }

  const value = url.searchParams.get(property);
  if (value === null) {
    return undefined;
  }

  return value as RequestInitCfPropertiesImage[typeof property];
}

export const resizeImage = async ({
  url: urlstring,
  headers,
}: Request): Promise<Response> => {
  const url = new URL(urlstring);
  const imageURL = url.searchParams.get("image");
  if (imageURL === null) {
    throw new Error(`Did not receive image URL in ${url}`);
  }

  return fetch(
    new Request(imageURL, {
      headers,
    }),
    {
      cf: {
        image: {
          fit: getImageParam(url, "fit"),
          width: getImageParam(url, "width"),
          height: getImageParam(url, "height"),
          quality: getImageParam(url, "quality"),
        },
      },
    }
  );
};
