import { useLoading } from "../../../app/stores/loaderStore";

const Loader = () => {
  const { isLoading } = useLoading();

  if (!isLoading) {
    return null;
  }

  return (
    <div className="spinner-div fixed top-0 left-0 w-full h-full bg-opacity-50 flex items-center justify-center z-50">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
