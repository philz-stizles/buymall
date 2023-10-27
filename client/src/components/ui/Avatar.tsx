import placeholderImage from '../../assets/images/placeholder.jpg'

type AvatarProps = {
  imageSrc?: string
}

const Avatar = ({ imageSrc }: AvatarProps) => {
  return <img src={imageSrc || placeholderImage} alt="Avatar" className="w-7 h-7 rounded-full">
  </img>;
};

export default Avatar;
