import React, { useState } from 'react'
import { Text, View,StyleSheet, Button, ScrollView } from 'react-native'
import { Stopwatch } from 'react-native-stopwatch-timer'


const ControlButton = ({title,color,onPress}) =>{
  return(
      <View style={style.button}>
          <Button  color={color} title={title} onPress={onPress}/>            
      </View>
  )
}

const Lap=({number,interval})=>{
  return(
    <View style={style.lap}>
      <Text style={style.lapText}>Lap {number}</Text>
      <Text style={style.lapText}>{interval}</Text>
    </View>
  )
}

const Laptable=({laps,timer})=>{
  return(
    <ScrollView>
      {
        laps.map((lap,index)=>(
          <Lap number={laps.length-index-1} key={laps.length-index} interval={index===0?timer:lap} />
        ))
      }
    </ScrollView>
  )
}

export default function Stopw() {
  

    const [timer,setTimer] = useState(0)
    const [data,setData] = useState([0])

    const [stopwatchStart,setSws] = useState(false)
    const [stopwatchReset,setSwr] = useState(false)

    let timehundred = 0

    const toggleStopwatch=()=>{
      setSws((stopwatchStart)=>{
        return !stopwatchStart
      })

      setSwr(false)
    }
   
    const resetStopwatch=()=>{

      setSws(false)

      setSwr(true)
      setData([0])
      timehundred = 0
    }

    const laptime=()=>{
      console.log(timer)
        setData((Data)=>{
         Data[0] = timer
         return [0,...Data] 
        })
    }
    
    function getFormattedTime(time) {
      if(timehundred%500 == 0)
        setTimer(time)
      timehundred++  
        //console.log(time)
    };

    //millisecond updation is highly unstable in expo,not sure about android
    return (
      <View style={style.outer} >
        <View style={style.container}>
          
          <Stopwatch laps={false} msecs={true} start={stopwatchStart}
          reset={stopwatchReset}
          getTime={(time)=>getFormattedTime(time)} />
        </View>

        <View style={style.buttonlayout}>
          <ControlButton title={!stopwatchStart ? "Start" : "Stop"} color={!stopwatchStart ? 'green' : 'red'} onPress={toggleStopwatch}/>
          <ControlButton title="Reset" color='red' onPress={resetStopwatch}/>
          <View style={style.button}>
            <Button title='lap' onPress={laptime} disabled={!stopwatchStart}/>            
          </View>
        
        
        </View>
        {<Laptable laps={data} timer={timer}/>}
        

      </View>
    );
  }

  const style = StyleSheet.create({
    outer:{
      flex:1,
      alignItems:'center'
    },
    container:{
        alignItems:'center',
        paddingTop:'10%'
    },
    timer:{
        fontSize:80,
        fontWeight:'400'
    },
    button:{
        margin:'3%',
        width:'20%'
    },
    buttonlayout:{
      flexDirection:'row',
      alignItems:'stretch',
      justifyContent:'space-between',
      margin:'3%'
        
    },lap:{
      flexDirection:'row',
      alignItems:'center',
      alignItems:'stretch',
      justifyContent:'space-between',
    },lapText:{
      fontSize:20,
      margin:'3%'
    },
    
    
  })