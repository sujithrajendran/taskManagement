import { useLoading } from "./LoadingContext";
import "../css/GlobalLoader.css";

const GlobalLoader = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="global-loader-overlay">
      <div className="spinner" />
    </div>
  );
};

export default GlobalLoader;
