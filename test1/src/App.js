import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WindImg from './images/wind.png';
import Humidity from './images/humidity.png';
import Search from './images/search.png';
import clouds from './images/clouds.png';
import clear from './images/clear.png';
import drizzle from './images/drizzle.png';
import rain  from './images/rain.png';
import snow from './images/snow.png';
import mist from './images/mist.png';


function App() {

  const API_KEY="886093901309e3046d681d2ea292b3f6";
  // const city="london";
  
  const [city,setCity]=useState("");
  console.log(city)
  const [temp,setTemp]=useState("");
  const [humidity,setHumidity]=useState("");
  const [wind,setWind]=useState("");
  const [cloud,setCloud]=useState("");



    const get_data=async()=>{
      try{
        const response=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
        setCloud(response.data.weather[0].main)
        console.log(response.data.weather[0].main)
        setTemp((response.data.main.temp-273.15))
        setWind((response.data.wind.speed))
        setHumidity(response.data.main.humidity)
        
    }
    catch(error){
      console.log(error)
    }
    }
    
  
  const execute=()=>{
       get_data();
  }  

  useEffect(()=>{
    execute();
  },[])

  return (
    <div className='main_container'>
         <div className='main'>
          <div className='search-div'>
          <h3><span style={{color:'#483939'}}>City</span>:{!city && "Your city"}{city}</h3>
          <input type='text' id='city' onChange={(e)=>setCity(e.target.value)}/>
          <button className='btn' onClick={execute}><img src={Search} width={10} /></button>
          </div>
          <h1 className='temp_con'>
            Temperature
            <br />
          <span className='temp'>{!temp && "00"}{temp}C</span>
          </h1>
          <div className='sec_container'>
            <h4><span>Wind</span><br />{!wind && "00.00"}{wind}MPH&nbsp;<img src={WindImg} width={20}/></h4>
            <h4><span>Humidity</span><br />{!humidity && "0.00"}{humidity}%&nbsp;<img src={Humidity} width={20}/></h4>
          </div>
          <div className='img_container'>
            {cloud==="Mist" &&
            <img src={mist} height={200} width={200}/>
            }
            {cloud==="Rain" &&
            <img src={rain} height={200} width={200}/>
            }
            {cloud==="Drizzle" &&
            <img src={drizzle} height={200} width={200}/>
            }
            {cloud==="Clear" &&
            <img src={clear} height={200} width={200}/>
            }
            {cloud==="Snow" &&
            <img src={snow} height={200} width={200}/>
            }
            {cloud==="Clouds" &&
            <img src={clouds} height={200} width={200}/>
            }
            {cloud==="Haze" &&
            <img src={drizzle} height={200} width={200}/>
            }
          </div>
         </div>
    </div>
  );
}

export default App;
