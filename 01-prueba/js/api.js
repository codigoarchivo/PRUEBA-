class Api {
  async ListProvincias() {
    try {
      const urlP = await fetch(
        `https://raw.githubusercontent.com/IagoLast/pselect/master/data/provincias.json`
      );
      const listP = await urlP.json();

      const urlM = await fetch(
        `https://raw.githubusercontent.com/IagoLast/pselect/master/data/municipios.json`
      );
      const listM = await urlM.json();
      return {
        listP,
        listM,
      };
    } catch (error) {
      console.log(`${error}`);
    }
  }
}
