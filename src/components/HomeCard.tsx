import { Link } from "react-router-dom";

const HomeCard = ({
  title,
  to,
  icon,
}: {
  title: string;
  to: string;
  icon: React.ReactNode;
}) => {
  return (
    <Link
      to={to}
      className="bg-white border border-gray-300 rounded-xl shadow hover:shadow-lg hover:bg-blue-50 transition duration-200 p-6 text-center flex flex-col items-center"
    >
      {icon}
      <h2 className="text-xl font-semibold text-blue-700 mt-3">{title}</h2>
      <p className="text-gray-500 mt-1">Ir a {title.toLowerCase()}</p>
    </Link>
  );
};

export default HomeCard;
