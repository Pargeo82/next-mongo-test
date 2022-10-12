import { useRouter } from "next/router";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Header from "../components/header";
import Form from "../components/Form";

Number.prototype.round = function (places) {
  return +(Math.round(this + "e+" + places) + "e-" + places);
};

const getValues = ({ name, value, valueAsNumber }) => {
  switch (name) {
    case "cijenaKN":
      return {
        cijenaKN: valueAsNumber,
        cijenaEUR: (valueAsNumber / 7.53545).round(2),
      };
    case "cijenaEUR":
      return {
        cijenaKN: (valueAsNumber * 7.53545).round(2),
        cijenaEUR: valueAsNumber,
      };
    default:
      return { [name]: value };
  }
};

export default function New() {
  const { data: session } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    nameEng: "",
    mjera: "",
    tip: "",
    cijenaKN: 0,
    cijenaEUR: 0,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const addData = (param) => {
    setForm(param);
  };

  const handleChange = (event) => {
    if (event.target.name === "name") {
      setForm((values) => ({
        ...values,
        nameEng: event.target.value,
        ...getValues(event.target),
      }));
    } else {
      setForm((values) => ({
        ...values,
        ...getValues(event.target),
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await fetch("/api/pice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const res = await data.json();
    if (res.error) {
      setErrorMessage(res.error.message);
    } else {
      setSuccessMessage("Uspješno dodan artikl");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
  };

  return (
    <>
      <Header />
      {session ? (
        <Form
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          form={form}
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      ) : (
        "Moraš se ulogirati"
      )}
    </>
  );
}
