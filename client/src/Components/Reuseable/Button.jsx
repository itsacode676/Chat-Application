import React from "react";
const Button = ({ data  }) => {
return(
    <button
    type="submit"
    className="w-full text-white bg-black focus:ring-4 shadow-lg hover:shadow-none hover:scale-95 transition duration-200 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
  >
    {data}
  </button>
)
};

export default Button