import { FaHeart } from "react-icons/fa";

type Props = {
  liked: boolean;
  count: number;
  onClick: () => void;
};

export const LikeCounter = ({ liked, count, onClick }: Props) => {
  return (
    <div className="flex items-center mt-1">
      <FaHeart
        onClick={onClick}
        className={`cursor-pointer transition-colors duration-300 ${
          liked ? "text-red-500" : "text-gray-400"
        }`}
        size={20}
        aria-label="Curtir artigo"
      />
      <p className="pl-2">{count}</p>
    </div>
  );
};
