import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import dbConnect from "../lib/dbConnect";
import Pice from "../models/Pice";
import Header from "../components/header";
import Link from "next/link";
import Artikl from "../components/Artikl";

export default function Home({ pice }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function deleteArticle(_id) {
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
      {/* {artikl} */}
      <Artikl pice={pice} session={session} deleteArticle={deleteArticle} router={router} />
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
