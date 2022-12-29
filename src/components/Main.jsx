import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from '@fortawesome/free-solid-svg-icons';
import './Main.scss';
class Main extends Component {
    state = {
        city:'',
        wdata:[],
        date: moment().format("DD-MM-YYYY hh:mm:ss")
    }
    
    componentDidUpdate(prevprops,prevstate)
    {
        // console.log(prevstate);
        if(prevstate.city!=this.state.city)
        {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=55bd7a68fa4fe1a14faac35d7618fb00&units=metric`).then(res=>this.setState({wdata:res.data})).catch(err=>console.log(err));
        }
    }
    handleChange=(e)=>{
        e.preventDefault();
        this.setState({city:e.target.value});
    }
    handleSubmit=(e)=>
    {
        e.preventDefault();
        console.log("clicked");
        this.setState({fcity:this.state.city});
    }
    render() { 
        let weatherIcon = null;
    if(this.state.wdata.length!=0)
    {
    if (this.state.wdata.weather[0].main === 'Thunderstorm') {
      weatherIcon = <FontAwesomeIcon icon={faBolt} />;
    } else if (this.state.wdata.weather[0].main === 'Drizzle') {
      weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
    } else if (this.state.wdata.weather[0].main === 'Rain') {
      weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
    } else if (this.state.wdata.weather[0].main === 'Snow') {
      weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
    } else if (this.state.wdata.weather[0].main === 'Clear') {
      weatherIcon = <FontAwesomeIcon icon={faSun} />;
    } else if (this.state.wdata.weather[0].main=== 'Clouds') {
      weatherIcon = <FontAwesomeIcon icon={faCloud} />;
    } else {
      weatherIcon = <FontAwesomeIcon icon={faSmog} />;
    }
}
        console.log(this.state.wdata);
        return (<div className="whole">
            <h1 className="title">weather Aplication</h1>
            <input className="inp" onChange={this.handleChange}  value={this.state.city} type="text" placeholder="enter the city name"></input>
            {this.state.wdata.length!=0?<div className="wrapper">
                <div className="location">
                <h1>{this.state.wdata.name},{this.state.wdata.sys.country}</h1>
                <h3>{this.state.date}</h3>
                <div className="large">
        <div id="icon">{weatherIcon}</div><div className="temp">
                {this.state.wdata.main.temp}&#176; 
                </div>
                </div>
                </div>
                <div class="right">
                    <div className="top">
            <div class="data">
        <div><label htmlFor="lat">lat:</label>{this.state.wdata.coord.lat}</div>
        <div> <label htmlFor="lat">speed:</label>{this.state.wdata.wind.speed}mph</div>
        <div> <label htmlFor="lat">sunrise:</label>{this.state.wdata.sys.sunrise}</div>
        </div>
        </div>
        <div className="bottom">
            <div className="data">
        <div><label htmlFor="lat">long:</label>{this.state.wdata.coord.lon}</div>
        <div><label htmlFor="lat">climate:</label>{this.state.wdata.weather[0].description}</div>
        <div><label htmlFor="lat">sunset:</label>{this.state.wdata.sys.sunset}</div>
        </div>
        </div>
                </div>
            </div>:<div></div>}
        </div>  );
    }
}
 
export default Main;