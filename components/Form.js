export default function Form({ handleSubmit, handleChange, form, errorMessage, successMessage }) {
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
        <select name="tip" value={form.tip} onChange={handleChange}>
          <option value="">Tip artikla</option>
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
        <select name="mjera" value={form.mjera} onChange={handleChange}>
          <option value="">Mjera:</option>
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
        <div>
          <input
            type="number"
            name="cijenaKN"
            value={form.cijenaKN}
            onChange={handleChange}
            className="numbersInput"
          ></input>
          <label htmlFor="cijenaKN">KN</label>
        </div>
        <div>
          <input
            type="number"
            name="cijenaEUR"
            value={form.cijenaEUR}
            onChange={handleChange}
            className="numbersInput"
          ></input>
          <label htmlFor="cijenaKN">€</label>
        </div>
        <input type="submit" value="Potvrdi" />
        <div>{errorMessage && `${errorMessage}`.replace("Pice validation failed:", "")}</div>
        <div>{successMessage && successMessage}</div>
      </form>
    </div>
  );
}
