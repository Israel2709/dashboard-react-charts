import React, { Component } from 'react';
//import logo from './logo.svg';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem } from 'reactstrap'
import moment from 'moment'
import Moment from 'react-moment'
import 'moment/locale/es-us'
import 'moment-timezone'
import MultiLineChart from './Components/MultiLineChart'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries:[],
      filteredCountries:[],
      listIsHidden:true,
      startDate: "",
      endDate: "",
      country: "México",
      countrySlug: "mexico",
      confirmedCases: [],
      recoveredCases:[],
      chartData:[],
    }
    this.changeDateHandler = this.changeDateHandler.bind(this)
    this.getChartData = this.getChartData.bind(this)
    this.changeCountryHandler = this.changeCountryHandler.bind(this)
    this.selectCountry = this.selectCountry.bind(this)
  }

  componentDidMount(){
    fetch("https://api.covid19api.com/countries").then( response => {
      response.json().then( json => {
        this.setState({ countries : json })
      })
    })
  }

  selectCountry(event){
    let country = event.target.dataset.countryName
    let countrySlug = event.target.dataset.countrySlug
    this.setState({ country, countrySlug, listIsHidden:true})
    console.log(country, countrySlug)
  }

  changeDateHandler( event ) {
    let dateValue = moment(event.target.value).toISOString();
    this.setState({ 
      [event.target.name]: dateValue,
      heading:"adios" 
    })
  }

  changeCountryHandler( event ) {
    let value = event.target.value.toLowerCase()
    console.log(value)
    let filteredCountries = this.state.countries.filter( country => {
      return country.Slug.includes(value)
    })
    this.setState({ filteredCountries, country:value, listIsHidden:false })
    console.log(filteredCountries)
  }

  getChartData() {
    let { startDate, endDate, country, countrySlug } = this.state;
    fetch(`https://api.covid19api.com/country/${countrySlug}?from=${startDate}&to=${endDate}`)
      .then( response => {
        response.json().then( json => {
          this.setState({chartData:json})
        })
      })
  }

  render() {
    const {country, chartData, startDate, endDate, countries, filteredCountries} = this.state;
    return (
      <div className="App bg-dark">
        <Container fluid className="py-5">
          <Row>
            <Col xs="12" className="text-center text-white mb-5">
              <h1>Consulta las estadísticas actualizadas referentes a Covid 19</h1>
            </Col>
            <Col xs="12" md="4">
              <Form className="p-3 bg-light shadow rounded">
                <FormGroup className="position-relative">
                  <Label>País:</Label>
                  <Input
                    type="text"
                    name="country"
                    id="country"
                    placeholder="Escribe el nombre de un país"
                    value={country}
                    onChange={this.changeCountryHandler}
                  ></Input>
                  <ListGroup className={`floating-list shadow border ${this.state.listIsHidden ? 'd-none' : ''}`}>
                    {
                      filteredCountries.map( ( country, index ) => (
                        <ListGroupItem
                          action 
                          key={index}
                          onClick={this.selectCountry}
                          data-country-name={country.Country}
                          data-country-slug={country.Slug}
                          className="cursor-pointer"  
                        >{country.Country}</ListGroupItem>
                      ))
                    }
                  </ListGroup>

                </FormGroup>
                <FormGroup>
                  <Label>Desde:</Label>
                  <Input
                    type="date"
                    name="startDate"
                    id="startDate"
                    onChange={this.changeDateHandler}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label>Hasta:</Label>
                  <Input
                    type="date"
                    name="endDate"
                    id="endDate"
                    onChange={this.changeDateHandler}
                  ></Input>
                </FormGroup>
                <Button 
                  color="secondary" 
                  className="btn-block" 
                  type="button"
                  onClick={this.getChartData}
                >Ver gráfica</Button>
              </Form>
            </Col>
            <Col xs="12" md="8" className="text-white">
              {
                this.state.chartData.length != 0 
                  ? <MultiLineChart chartData={chartData} startDate={startDate} endDate={endDate} country={country} /> : null
              }
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
