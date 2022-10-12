import Link from "next/link";

export default function Artikl({ pice, session, deleteArticle }) {
  return pice.map((cuga) => (
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
            onClick={() => {
              deleteArticle(cuga._id);
            }}
          >
            Delete
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  ));
}

{
}
