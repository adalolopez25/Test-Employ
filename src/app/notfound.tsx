import Link from "next/link";
import React from "react";

const notfound = () => {
  return (
    <div>
      <h1>Pagina no encontrada</h1>
      <Link href={"/"}>
        <button>Back to Home</button>
      </Link>
    </div>
  );
};

export default notfound;
