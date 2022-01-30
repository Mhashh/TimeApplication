import { useState, useEffect, useMemo } from 'react';
import {View, Button, ScrollView} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { styles } from '../Styles/appstyle'
import { setObjectValue, initAlarmviews, allAlarms, clearAll } from '../helper/Storage'
import Alarmitems from '../Component/alarmlist';
import { useLinkProps } from '@react-navigation/native';

var data = []
initAlarmviews().then(
    (val)=>{
        data = val
        data.forEach((it)=>console.log(it+`yeh`))
    },
    (err)=>{
        console.log(err)
    }
)

const Alarm=() => {
    
    
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dates,setDate] = useState(data)
    const [added,setAd] = useState(false)
    
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        console.log("A date has been picked: ", date);
        setObjectValue(date,`${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`)
        setDate((Dates)=>
        {
            Dates.push({key:`${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`})
            return [...Dates]
        })
     
        hideDatePicker();
    };

    const handleAllDelete = ()=>{
        setDate([])
        clearAll()
    }

    useEffect(
        ()=>{if(dates !== data){
            setDate([...dates])
        }}
        
        ,[])

    
    return(
        <View>
            <View style={{ marginTop:'10%'}}>
            <View style={{margin:'4%'}}>
                <Button style={{width:'100'}} onPress={showDatePicker} title="Set Alarm" />
            </View>    
            <View style={{margin:'4%'}}>
                <Button style={{width:'100',marginTop:'10%'}} onPress={handleAllDelete} title="Delete All alarm" />
            </View> 
            <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            /></View>
            
                <Alarmitems dates={dates} chng={added}/>
            
        </View>
            
    )

    

    

}

export default Alarm