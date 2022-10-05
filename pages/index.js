import Pice from "../models/Pice";
import dbConnect from "../lib/dbConnect";

export default function Home({ pice }) {
  return (
    <>
      {pice.map((cuga) => (
        <div key={cuga._id} className="flex">
          <div>{cuga.name}</div>
          <div>{cuga.mjera}</div>
          <div>{`${cuga.cijenaKN.toFixed(2)}KN`}</div>
          <div>{`${cuga.cijenaEUR.toFixed(2)}€`}</div>
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
