import Pice from "../models/Pice";
import dbConnect from "../lib/dbConnect";
import Header from "../components/header";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home({ pice }) {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <Header />
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
          <div>{session ? <button>Edit</button> : ""}</div>
          <div>{session ? <button>Delete</button> : ""}</div>
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
