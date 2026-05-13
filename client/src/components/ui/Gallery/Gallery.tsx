import classNames from 'classnames';
import { IFileUpload } from '../../../types';
import { useEffect, useState } from 'react';

type Props = {
  images: IFileUpload[];
};

const Gallery = ({ images }: Props) => {
  const [selected, setSelected] = useState<IFileUpload | null>(null);

  useEffect(() => {
    setSelected(images[0]);
  }, [images]);

  return (
    <div className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <div className="grid grid-cols-4 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white"
            >
              <div>
                <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md">
                  <img
                    src={image.url}
                    alt=""
                    className="object-cover object-center h-full w-full"
                  />
                </span>
                <span
                  className={classNames(
                    'absolute inset-0 rounded-md ring-2 ring-offset-2',
                    image.public_id === selected?.public_id
                      ? 'ring-black'
                      : 'ring-transparent'
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="aspect-square w-full">
        {images.map((image) => (
          <div
            key={image.id}
            className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden"
          >
            <img
              src={image.url}
              alt="preview"
              className="h-full w-full object-cover object-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
