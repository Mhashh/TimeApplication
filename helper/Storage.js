import AsyncStorage from '@react-native-async-storage/async-storage';


export const setObjectValue = async (key,value) => {  
    try {   
        await AsyncStorage.setItem(key.toString(),value.toString())
    } catch(e) { 
        console.log('Done Again Error.')
    }
}

export const initAlarmviews = async () => {  
    let keys = []  
    try {    
        keys = await AsyncStorage.getAllKeys() 
        
    } catch(e) {
        console.warn(e)    
        // read key error  
    }
    
    
    return allAlarms(keys)
}

export const allAlarms = async (keys) => {
    let values = []
    let viewvalue = []
    try {    
        values = await AsyncStorage.multiGet(keys)  
    } catch(e) {    /*read error*/  }  

    console.log("-----------------------------------")
    for(let i = 0;i<values.length;i++){
        viewvalue.push({key:`${values[i][1]}`})
        console.log(viewvalue[i])
    }
        
    console.log("-----------------------------------")
    

    return viewvalue
}

export const clearAll = async () => {  
    try {    
        await AsyncStorage.clear()  
    } catch(e) {     }
    console.log('Deleted.')
    initAlarmviews()
    
}