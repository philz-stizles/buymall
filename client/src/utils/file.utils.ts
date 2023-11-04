import Resizer from 'react-image-file-resizer';

export const resizeFile = (file: Blob) =>
  new Promise<any>((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      720,
      720,
      'JPEG',
      100,
      0,
      (uri: any) => {
        resolve(uri);
      },
      'base64'
    );
  });
