import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';


export const setTimeValue = async (key,value) => {  
    try {   
        await AsyncStorage.setItem(key,value)
    } catch(e) { 
        console.log('Done Again Error.')
    }
}

export const initKeys = async () => {  
    let keys = []  
    try {    
        keys = await AsyncStorage.getAllKeys() 
        
    } catch(e) {
        console.warn(e)    
        // read key error  
    }
    
    
    return keys
}


export const getData = async (key) => {  
    try {    
        const jsonValue = await AsyncStorage.getItem(key)   
        console.log("getData main")
        console.log(jsonValue) 
        return jsonValue 
    } catch(e) {    
        // error reading value  
     }
}

export const removeValue = async (key) => {  
    try {   
         await AsyncStorage.removeItem(key)  
    } catch(e) {    // remove error  
    }
    console.log('removed.')
}

export const msToTime = (duration)=>{
      let seconds = Math.floor((duration / 1000) % 60)
      let minutes = Math.floor((duration / (1000 * 60)) % 60)
      let hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds
  }

  export const timeToMs = (duration)=>{
    let tmp = duration.split(':')
    console.log(tmp)
    return (parseInt(tmp[0])*3600000)+(parseInt(tmp[1])*60000)+(parseInt(tmp[2])*1000)
}

