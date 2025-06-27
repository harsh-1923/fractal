import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href="/craft/hold-to-delete">Hold to delete</Link>
        </li>
      </ul>
    </div>
  );
};

export default page;
