class Interfaz {
  constructor() {
    this.mostrar = document.getElementById("provincias");
    this.mostrar2 = document.getElementById("municipios");
    this.selectM = document.createElement("select");
    this.select = document.querySelector("[name='user']");
    this.options = document.getElementsByTagName("option");
    this.validator = document.getElementById("val");

    this.mos = "";
    this.res = "";
    this.array = "";
    this.filter = "";
    this.init();
  }

  init() {
    this.ConstruirSelect();
  }

  ConstruirSelect() {
    api.ListProvincias().then(({ listM, listP }) => {
      listP.sort((a, b) => (a.nm > b.nm ? 1 : b.nm > a.nm ? -1 : 0));
      this.MostrarSelect(listM, listP);
    });
  }

  handleChange(listM) {
    this.select.addEventListener("change", () => {
      this.res = this.select.options[this.select.selectedIndex].value;
      this.array = Object.values(listM).map((value) => value);
      this.filter = this.array.filter(({ id }) => id.startsWith(this.res));
      this.Mostrar2Select(this.filter);
    });
  }

  MostrarSelect(listM, listP) {
    listP.map(({ id, nm }) => {
      this.mostrar.innerHTML += `
      <option value=${id}>${nm}</option>
      `;
    });

    this.array = Object.values(listM).map((value) => value);
    this.mos = this.array.filter(({ id }) => id.startsWith("02"));

    this.mos.map(({ id, nm }) => {
      this.mostrar2.innerHTML += `
     <option value=${id}>${nm}</option>`;
    });
    this.handleChange(listM);
  }

  Mostrar2Select(listM) {
    while (this.mostrar2.firstChild) {
      this.mostrar2.removeChild(this.mostrar2.firstChild);
    }

    this.validator.innerHTML = "<span>Cargando Localidades....</span>";
    this.mostrar2.style.display = "none";

    setTimeout(() => {
      this.validator.innerHTML = "";
      this.mostrar2.style.display = "block";

      listM.map(({ id, nm }) => {
        this.mostrar2.innerHTML += `
     <option value=${id}>${nm}</option>;
     `;
      });
    }, 1000);
  }
}
