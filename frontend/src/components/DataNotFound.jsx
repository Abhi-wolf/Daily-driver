/* eslint-disable react/prop-types */
function DataNotFound({ size, message }) {
  return (
    <div className={`w-full text-center text-${size} text-orange-400 `}>
      {message ? message : "Data Not found"} 😔
    </div>
  );
}

export default DataNotFound;
