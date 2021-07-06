import React, { useEffect, useState } from 'react';
import { MenuItem, FormControl, Select, Button, Card, CardContent } from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { formattedPrint, sortData, formattedPrintTotal } from './Util';
import LineGraph from './LineGraph';
import 'leaflet/dist/leaflet.css';
import numeral from "numeral";
import './App.css';

function App() {
  //https://disease.sh/v3/covid-19/all/
  //https://disease.sh/v3/covid-19/gov/
  //https://disease.sh/v3/covid-19/countries/
  const [countries,setCountries]=useState([
    'India','Nepal','Bhutan','USA','China'
  ]);
  const [country,setCountry]=useState('worldwide');
  const [countryInfo,setCountryInfo]=useState({});
  const [tableData,setTableData]=useState([]);
  const [mapCenter,setMapCenter]=useState({lat:20.5937,lng:78.9629});
  const [mapZoom,setMapZoom]=useState(4);
  const [mapCountries,setMapCountries]=useState([]);
  const [casesType, setCasesType] = useState('cases');
  //Run when component loads or countries variable changes
  //Fetch all the countries with their country codes
  useEffect(()=>{
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };
    getCountriesData();
  },[]);

  //fetch the worldwide data to show before the user selects anything from the dropdown menu
  useEffect(()=>{
    const getCountriesInfo= async()=>{
      await fetch("https://disease.sh/v3/covid-19/all/")
            .then((response)=>response.json())
            .then((data)=>{
              setCountryInfo(data);
            });
    };
    getCountriesInfo();
  },[]);

  // //fetch stats for all countries
  // useEffect(()=>{
  //   const getTableData= async()=>{
  //     await fetch("https://disease.sh/v3/covid-19/countries")
  //           .then((response)=>response.json())
  //           .then((data)=>{
  //             const countries=data.map((country)=>({
  //                 name:country.country,
  //                 value:country.countryInfo.iso2,
  //               }));
  //               setTableData(data);
  //           });
  //   };
  //   getTableData();
  // },[]);

  const onCountryChange=async(event)=>{
    const countryCode=event.target.value;
    console.log("Country changed to ", countryCode);
    setCountry(countryCode);
    //https://disease.sh/v3/covid-19/all/
    //https://disease.sh/v3/covid-19/countries/country_code

    const url=countryCode==='worldwide'?
                  'https://disease.sh/v3/covid-19/all/':
                  `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url).then(response=>response.json())
                    .then(data=>{
                      setCountry(countryCode);
                      setCountryInfo(data);
                      setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
                      setMapZoom(4);
                    });
  };
  console.log('Country info is as follows',countryInfo);

  return (
    <div className="app">
      <div className="app__left">
        <CardContent>
          <div className="app__header">
            {/*Header*/}
            <h1>Covid Statistics</h1>
            {/*Title,dropbox*/}
            <FormControl className="app__dropdown">
              <Select 
                variant="outlined"
                onChange={onCountryChange}
                value={country}>
                  <MenuItem value="worldwide">Worldwide</MenuItem>
                  <MenuItem value="IN">India</MenuItem>
                  {/* Loop all countries and show */}
                  {
                    countries.map(country=>                  
                    <MenuItem value={country.value}>{country.name}</MenuItem>)
                  }
                  {/*<MenuItem value="WorldWide">WorldWide</MenuItem>
                  <MenuItem value="India">India</MenuItem>*/}
              </Select>
            </FormControl>
          </div>
        </CardContent>

        <div className="app__stats">
          {/*INFO  Cases*/}
          <InfoBox
              onClick={(e) => setCasesType("cases")}
              title="Cases"
              isRed
              active={casesType === "cases"}
              cases={formattedPrint(countryInfo.todayCases)} 
              total={formattedPrintTotal(countryInfo.cases)}/>
          {/*INFO  Recovered*/}
          <InfoBox 
              onClick={(e) => setCasesType("recovered")}
              title="Recovered"
              active={casesType === "recovered"}
              cases={formattedPrint(countryInfo.todayRecovered)} 
              total={formattedPrintTotal(countryInfo.recovered)}/>
          {/*INFO  Deaths*/}
          <InfoBox 
              onClick={(e) => setCasesType("deaths")}
              title="Deaths"
              isRed
              active={casesType === "deaths"}
              cases={formattedPrint(countryInfo.todayDeaths)} 
              total={formattedPrintTotal(countryInfo.deaths)}/>
        </div>
        
        
        {/*MAP*/}
        <Map className="app__map"
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <div className="app__right">
        <CardContent>
          {/*Graph*/}
          <h3>Total {casesType} worldwide</h3>
          <LineGraph className="app__graph"
            casesType={casesType}
          />
          {/*TABLE*/}
          <br></br>
          <h3> Countries with most live cases</h3>
          <br></br>
          <Table countries={tableData}/>
          
        </CardContent>
      </div>
      {/*Footer*/}
    </div>
  );
}

export default App;
