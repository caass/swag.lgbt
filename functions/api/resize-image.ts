/**
 * Necessary for Next.js to deploy -- a small api endpoint that does image
 * resizing in workers
 */
export const onRequest: PagesFunction = async ({ request }) => {
  const { url: urlstring, headers } = request;

  const url = new URL(urlstring);
  const imageURL = url.searchParams.get("image");
  if (!imageURL) {
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

/**
 * Small helper function to retrieve an `cf.image` property from a URL
 */
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
