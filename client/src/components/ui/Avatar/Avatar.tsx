import placeholderImage from '../../../assets/images/placeholder.jpg'

type AvatarProps = {
  src?: string
}

const Avatar = ({ src }: AvatarProps) => {
  return <img src={src || placeholderImage} alt="Avatar" className="w-7 h-7 rounded-full">
  </img>;
};

export default Avatar;
