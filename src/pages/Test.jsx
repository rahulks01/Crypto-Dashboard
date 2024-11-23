import React from "react";

const Loader = () => {
  return (
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div
        class="loader border-r-4 rounded-full border-yellow-500 bg-yellow-300 animate-bounce
    aspect-square w-16 flex justify-center items-center text-yellow-700 text-2xl"
      >
        $
      </div>
    </div>
  );
};

export default Loader;
