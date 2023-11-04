import { removeImage } from '../../../actions/product';
import { resizeFile } from '../../../utils/file.utils';
import Badge from '../Badge/Badge';
import Avatar from '../Avatar/Avatar';
import { useLocalMutation } from '../../../hooks';
import { ChangeEvent } from 'react';
import { IoFileTray } from 'react-icons/io5';

type UploadedImage = { public_id: string; url: string };

type Props = {
  files: UploadedImage[];
  setFiles: (values: any) => void;
  setIsLoading?: (isLoading: boolean) => void;
};

const FileUpload = ({ files, setFiles, setIsLoading }: Props) => {
  const { mutate: uploadFile } = useLocalMutation('/products/upload-file', {
    onSuccess: (data: any) => {
      setIsLoading && setIsLoading(false);
      console.log('IMAGE UPLOAD RES DATA', data);
      setFiles([...files, data]);
    },
    onError: (error: any) => {
      setIsLoading && setIsLoading(false);
    },
  });
  const { mutate: removeFile } = useLocalMutation('/products/remove-file', {
    onError: (error: any) => {
      setIsLoading && setIsLoading(false);
    },
  });
  const handleFileResizeAndUpload = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    // resize
    let files = e.target.files; // 3

    if (files) {
      setIsLoading && setIsLoading(true);
      for (let i = 0; i < files.length; i++) {
        // Reduce file size.
        const uri = await resizeFile(files[i]);
        console.log(uri);
        // upload to cloudinary via server.
        await uploadFile({ image: uri });
      }
    }
  };

  const handleImageRemove = async (publicId: string) => {
    setIsLoading && setIsLoading(true);
    await removeFile({ publicId });
    setIsLoading && setIsLoading(false);
    console.log('IMAGE UPLOAD RES DATA', publicId);
    let filteredImages = files.filter((item) => {
      return item.public_id !== publicId;
    });
    setFiles(filteredImages);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {files.map((image) => (
          <Badge
            value="X"
            key={image.public_id}
            onClick={handleImageRemove.bind(null, image.public_id)}
          >
            <Avatar
              src={image.url}
              // size={100}
              // shape="square"
              // className="ml-3"
            />
          </Badge>
        ))}
      </div>

      <label className="border inline-flex justify-center items-center self-start gap-1.5 border-slate-200 text-slate-600 shadow-sm rounded-lg p-2 text-sm font-medium cursor-pointer">
        Choose File <IoFileTray size={18} />
        <input
          type="file"
          multiple
          hidden
          accept="image/*"
          onChange={handleFileResizeAndUpload}
        />
      </label>
    </>
  );
};

export default FileUpload;
