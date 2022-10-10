import Pice from "../models/Pice";
import dbConnect from "../lib/dbConnect";
import Header from "../components/header";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home({ pice }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function deleteArticle(props, _id, router) {
    const data = await fetch(`/api/pice/${_id}`, {
      method: "DELETE",
    });
    const res = await data.json();
    if (res.error) {
      setErrorMessage(res.error.message);
    } else {
      setSuccessMessage(`${res.name} uspješno izbrisan(a)`);
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
  }

  // console.log(session);
  return (
    <>
      <Header />
      <div className="fixed-top">{errorMessage && errorMessage}</div>
      <div className="fixed-top">{successMessage && successMessage}</div>
      <Link href="/new">
        <button>Nova Cuga</button>
      </Link>
      {pice.map((cuga) => (
        <div key={cuga._id} className="flex">
          <div>{cuga.name}</div>
          <div>{cuga.nameEng}</div>
          <div>{cuga.mjera}</div>
          <div>{cuga.tip}</div>
          <div>{`${cuga.cijenaKN.toFixed(2)}KN`}</div>
          <div>{`${cuga.cijenaEUR.toFixed(2)}€`}</div>
          <div>
            {session ? (
              <Link href={`/edit/${cuga._id}`}>
                <button>Edit</button>
              </Link>
            ) : (
              ""
            )}
          </div>
          <div>
            {session ? (
              <button
                onClick={(event) => {
                  deleteArticle(event, cuga._id, router);
                }}
              >
                Delete
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps() {
  await dbConnect();

  const result = await Pice.find({});
  const pice = result.map((doc) => {
    const cuga = doc.toObject();
    cuga._id = cuga._id.toString();
    return cuga;
  });

  return { props: { pice } };
}
