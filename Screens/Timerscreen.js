import React, { useEffect, useState } from 'react'
import { Text, View,StyleSheet, Button, ScrollView,TextInput } from 'react-native'
import { Timer} from 'react-native-stopwatch-timer'
import { setTimeValue, initKeys ,removeValue, msToTime,timeToMs} from '../helper/StorageTimer'


const ControlButton = ({title,color,onPress,disable}) =>{
  return(
      <View style={style.button}>
          <Button  color={color} title={title} onPress={onPress} disabled={disable}/>            
      </View>
  )
}



export default function Timers() {

    const [timer,setTimer] = useState(0)
    const [hour,setHour] = useState('00')
    const [min,setMin] = useState('00')
    const [sec,setSec] = useState('00')

    const [keys,setKey] = useState([])
    const [totalDuration,setTd] = useState(10000)

    const [timerStart,setTs] = useState(false)
    const [timerReset,setTr] = useState(true)
    const [onetime,setOt] = useState(true)

    const TimerProfile=({interval})=>{

        return(
          <View style={style.lap}>
            <Text style={style.lapText2}> {interval}</Text>
            <View style={style.button2}>
                <Button  color='black' title='use' onPress={()=>useTimer(interval)}/>            
                <Button  color='grey' title='del' onPress={()=>removeTimer(interval)} />            
            </View>
            
          </View>
        )
      }
      
      const TimerProfileTable=({profiles})=>{
        return(
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {
              profiles.map((lap,index)=>(
                <TimerProfile key={index} interval={lap}/>
              ))
            }
          </ScrollView>
        )
      }
  

    

    const toggleTimer=()=>{
      setTs((timerStart)=>{
        return !timerStart
      })

      setTr(false)
    }
   
    const resetTimer=()=>{

        setHour('00')
        setMin('00')
        setSec('00')
        setTs(false)
      setTr(true)
      setTd(()=>{
          return 10000
      })
    }

    const saveTimer = ()=>{
      let time = parseInt(hour)*3600000+parseInt(min)*60000+parseInt(sec)*1000
      setTimeValue(msToTime(time),`${time}`).then(
        (value)=>{},
        (err)=>{error}
      )

        setTd(()=>{
            return time
        })
        
        initKeys().then(
          (value)=>{
            setKey(()=>value)
          },
          (err)=>{
            console.log(err)
          }
        )
    }

    const onChangeHour=(text)=>{
        console.log(parseInt(text))
        if(isNaN(parseInt(text))){
            setHour('0')
        }else if(parseInt(text)<0 || parseInt(text)>99){
            setHour('0')
        }else{
            
            setHour(parseInt(text))
        }
       
    }

    const onChangeMin=(text)=>{
        console.log(parseInt(text))
        if(isNaN(parseInt(text))){
            setMin('0')
        }else if(parseInt(text)<0 || parseInt(text)>59){
            setMin('0')
        }else{
            
            setMin(parseInt(text))
        }
        
    }

    const onChangeSec=(text)=>{
        console.log(parseInt(text))
        if(isNaN(parseInt(text))){
            setSec('0')
        }else if(parseInt(text)<0 || parseInt(text)>59){
            setSec('0')
        }else{
            
            setSec(parseInt(text))
        }
                
    }

    const useTimer = (keyi) =>{
        console.log('use')
        console.log(keyi)
        let time = timeToMs(keyi)
        console.log(time)
        
        setTd(()=>{return parseInt(time)})
        
        
    }

    const removeTimer = (keyi) =>{
        console.log('remove')
        console.log(keyi)
        removeValue(keyi).then(
          (val)=>console.log('done'),
          (err)=>console.log('error')
        )
        initKeys().then(
          (value)=>{
            setKey(()=>value)
          },
          (err)=>{
            console.log(err)
          }
        )
    }
    const savedProfiles = () =>{
      initKeys().then(
        (value)=>{
          setKey(()=>value)
        },
        (err)=>{
          console.log(err)
        }
      )
      initKeys().then(
          (value)=>{
            setKey(()=>value)
          },
          (err)=>{
            console.log(err)
          }
        )
        setOt(false)
    }

    const handleTimerComplete=()=>{
        resetTimer()
    }
    
    function getFormattedTime(time) {
      //setTimer(time)
        //console.log(time)
    };

    return (
      <View style={{flex:1}} >
        <View style={style.container}>
          <Timer totalDuration={totalDuration} msecs={false} start={timerStart}
          reset={timerReset}
          getTime={(time)=>getFormattedTime(time)} 
          handleFinish={handleTimerComplete}/>
        </View>
        <View style={style.buttonlayout}>
            {
                timerReset && <TextInput style={style.input}
                onChangeText={onChangeHour}
                value={hour}
                placeholder="00"
                keyboardType="numeric"/>

            }
            {
            timerReset && <TextInput style={style.input}
            onChangeText={onChangeMin}
            value={min}
            placeholder="00"
            keyboardType="numeric"/>

            }
            {
            timerReset && <TextInput style={style.input}
            onChangeText={onChangeSec}
            value={sec}
            placeholder="00"
            keyboardType="numeric"/>

            }
        </View>
        

        <View style={style.buttonlayout}>
          <ControlButton title={!timerStart ? "Start" : "Pause"} color='black' onPress={toggleTimer} disable={false}/>
          <ControlButton title="Reset" color='black' onPress={resetTimer} disable={!timerStart}/> 
          <ControlButton title="Save" color='black' onPress={saveTimer} disable={!timerReset} />
          {onetime && <ControlButton title="load" color='black' onPress={savedProfiles} disable={!timerReset} />}         
        </View>

        <View style={{flex:1}}>
            {
                timerReset &&<TimerProfileTable profiles={keys}/>
            }
            
        </View>
        

      </View>
    );
  }

  const style = StyleSheet.create({
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
    },button2:{
        margin:'3%',
        width:'20%',
    },
    buttonlayout:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      padding:'1%',
        
    },lap:{
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      alignItems:'stretch',
      justifyContent:'space-between',
    },lapText1:{
      fontSize:10,
      margin:'5%'
    },lapText2:{
        fontSize:20,
        margin:'5%'
      }
    ,input:{
        fontSize:20,
        margin:'1%',
        borderWidth:1,
        padding:10
    }
    
    
  })