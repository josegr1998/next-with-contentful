import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

//va automaticamente cuando no encuentra algo
const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='not-found'>
      <h1>404</h1>
      <h2>Oops! That page cannot be found</h2>
      <p>
        Redirecting to <Link href='/'>Homepage</Link> for more marmite
        godness...
      </p>
      <style jsx>{`
        .not-found {
          background: #fff;
          padding: 30px;
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
          transform: rotateZ(-1deg);
        }
        h1 {
          font-size: 3em;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
