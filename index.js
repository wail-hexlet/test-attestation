import _ from 'lodash'

export default function solution(content){
  // BEGIN
  const makeDataRow = (arr) => {
    return arr.map((element) => {
      return {
        date: element[0],
        maxTemperature: Number(element[1]),
        minTemperature: Number(element[2]),
        humidity: Number(element[3]),
        pressure: Number(element[4]),
        windSpeed: Number(element[5]),
        windDirection: element[6],
        city: element[7],
        state: element[8],
        timeZone: element[9]
      }
    })
  }
  
  const makeDataArray = (data) => {
    const parts = data.split('\n').slice(1).map((element) => {// will split rows by 'enter' and remove 2 first rows (captions);
       return element.split(','); // will split row by ','
    })
    for (let index = 0; index < parts.length; index++) {
      const element = parts[index];
      if(element.length <10){
        parts.splice(index)
      }
    }
    return makeDataRow(parts);
  };
  
  const data = makeDataArray(content);
  //console.log(data);
 
  console.log(`Count: ${data.length}`);

  const citiesFiltered = data.reduce((result, item) => {
    return result.includes(item.city) ? result : [... result, item.city];
  }, []);

  console.log(`Cities: ${citiesFiltered.sort((a, b) => a.localeCompare(b)).join(', ')}`);

  const orderByHumidityAsc = data.map((o) => o).sort((a, b) => a.humidity-b.humidity);
  const orderByHumidityDesc = data.map((o) => o).sort((a, b) => a.humidity-b.humidity).reverse();
  console.log(`Humidity: Min: ${orderByHumidityAsc[0].humidity}, Max: ${orderByHumidityDesc[0].humidity}`);
  
  const orderByMaxTemperatureDesc = data.map((o) => o).sort((a, b) => a.maxTemperature-b.maxTemperature).reverse();
  console.log(`HottestDay: ${orderByMaxTemperatureDesc[0].date} ${orderByMaxTemperatureDesc[0].city}`);

  const hottestTowns = [];
  for (let i = 0; i < citiesFiltered.length; i++) {
    const filterByCity = data.filter(o => o.city == citiesFiltered[i]);
    let averageTemperature = 0;
    for (let j = 0; j < filterByCity.length; j++) {
      averageTemperature +=filterByCity[j].maxTemperature;
    }
    averageTemperature /=filterByCity.length;
    const obj = {name: citiesFiltered[i], avgTemp: averageTemperature};
    hottestTowns.push(obj);
  }
  
  const orderByAvgTempDesc = hottestTowns.map((o) => o).sort((a, b) => a.avgTemp-b.avgTemp).reverse();
  console.log(`HottestCity: ${orderByAvgTempDesc[0].name}`);
  // END

}