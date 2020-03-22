import React from "react";
import Select from "react-select";
import ImgLogo from "./imgs/logohead.png";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      clicked: false,
      preco: 0.0
    };
  }

  transformBrands(results) {
    return results.map(brand => {
      return {
        label: brand,
        value: brand
      };
    });
  }

  transformVersions(results) {
    return results.map(version => {
      return {
        label: version.version,
        value: version.versionId
      };
    });
  }

  transformPrice(results) {
    return parseFloat(results.tetoPrecoMedioVolanty);
  }

  getBrands() {
    fetch("https://volanty-price-api.herokuapp.com/brands")
      .then(results => results.json())
      .then(results =>
        this.setState({ brandName: this.transformBrands(results) })
      );
  }

  getModels(brand) {
    fetch(`https://volanty-price-api.herokuapp.com/brands/${brand}/models`)
      .then(results => results.json())
      .then(results =>
        this.setState({ modelName: this.transformBrands(results) })
      );
  }

  getYears(brand, model) {
    fetch(
      `https://volanty-price-api.herokuapp.com/brands/${brand}/models/${model}/years`
    )
      .then(results => results.json())
      .then(results =>
        this.setState({ yearID: this.transformBrands(results) })
      );
  }

  getVersion(brand, model, year) {
    fetch(
      `https://volanty-price-api.herokuapp.com/brands/${brand}/models/${model}/years/${year}/versions`
    )
      .then(results => results.json())
      .then(results =>
        this.setState({ versionID: this.transformVersions(results) })
      );
  }

  getPrice(brand, model, year, version) {
    fetch(
      `https://volanty-price-api.herokuapp.com/brands/${brand}/models/${model}/years/${year}/versions/${version}`
    )
      .then(results => results.json())
      .then(results => this.setState({ preco: this.transformPrice(results) }));
  }

  handleChange(e) {
    this.setState({ selectedBrand: e.label });
    this.getModels(e.label);
  }

  handleChange2(e) {
    this.setState({ selectedModel: e.label });
    this.getYears(this.state.selectedBrand, e.label);
  }

  handleChange3(e) {
    this.setState({ selectedYear: e.label });
    this.getVersion(
      this.state.selectedBrand,
      this.state.selectedModel,
      e.label
    );
  }

  handleChange4(e) {
    this.setState({ selectedVersion: e.value });
    this.getPrice(
      this.state.selectedBrand,
      this.state.selectedModel,
      this.state.selectedYear,
      e.value
    );
  }

  componentDidMount() {
    this.getBrands();
  }

  render() {
    return (
      <div className="container">
        <div>
          <div></div>
          <div>
            <img src={ImgLogo} width="120" height="65" />
          </div>
          <p>
            <h2 style={{ color: "#2d5986" }}>Descubra o valor do seu carro:</h2>
          </p>
        </div>
        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-10">
            <Select
              placeholder="Marca"
              options={this.state.brandName}
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div className="col-md-10"></div>
          <div className="col-md-10">
            <Select
              placeholder="Modelo"
              options={this.state.modelName}
              onChange={e => this.handleChange2(e)}
            />
          </div>
          <div className="col-md-10"></div>
          <div className="col-md-10">
            <Select
              placeholder="Ano"
              options={this.state.yearID}
              onChange={e => this.handleChange3(e)}
            />
          </div>
          <div className="col-md-10">
            <Select
              placeholder="Versão"
              options={this.state.versionID}
              onChange={e => this.handleChange4(e)}
            />
          </div>
          <div>
            <h2 style={{ color: "#2d5986" }}>
              {this.state.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
