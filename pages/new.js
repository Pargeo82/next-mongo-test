import { useRouter } from "next/router";
import { useState } from "react";

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
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    nameEng: "",
    mjera: "",
    cijenaKN: 0,
    cijenaEUR: 0,
  });

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

  console.log(form);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch("/api/pice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    router.push("/");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Naziv"
          name="name"
          value={form.name}
          onChange={handleChange}
        ></input>
        <input
          type="text"
          placeholder="Engleski naziv"
          name="nameEng"
          value={form.nameEng}
          onChange={handleChange}
        ></input>
        <div>
          <label htmlFor="tip">Tip: </label>
          <select name="tip" value={form.tip} onChange={handleChange}>
            <option value="napitci">Napitci</option>
            <option value="gazirano">Gazirani sokovi</option>
            <option value="sokovi">Prirodni sokovi</option>
            <option value="mineralna">Mineralna</option>
            <option value="tocenoPivo">Točeno pivo</option>
            <option value="pivo">Pivo u boci</option>
            <option value="zestoka">Žestoko</option>
            <option value="vino">Vino</option>
            <option value="trgovacka">Trgovačka roba</option>
          </select>
        </div>
        <div>
          <label htmlFor="mjera">Mjera: </label>
          <select name="mjera" value={form.mjera} onChange={handleChange}>
            <option value="kom">kom</option>
            <option value="por">por</option>
            <option value="šalica">šalica</option>
            <option value="0.02l">0.02l</option>
            <option value="0.03l">0.03l</option>
            <option value="0.05l">0.05l</option>
            <option value="0.1l">0.1l</option>
            <option value="0.2l">0.2l</option>
            <option value="0.25l">0.25l</option>
            <option value="0.3l">0.3l</option>
            <option value="0.33l">0.33l</option>
            <option value="0.5l">0.5l</option>
            <option value="0.75l">0.75l</option>
            <option value="1l">1l</option>
          </select>
        </div>
        <input
          type="number"
          name="cijenaKN"
          value={form.cijenaKN}
          onChange={handleChange}
          className="numbersInput"
        ></input>
        <input
          type="number"
          name="cijenaEUR"
          value={form.cijenaEUR}
          onChange={handleChange}
          className="numbersInput"
        ></input>
        <input type="submit" value="Potvrdi" />
      </form>
    </div>
  );
}
