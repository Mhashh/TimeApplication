import { FlatList, Text,Button,View } from "react-native";
//import {ListItem} from 'native-base';
import { styles } from '../Styles/appstyle'
const Alarmitems = (props) =>{
    
    const renderItems = ({item}) =>{
        return(
            <View style= {{marginLeft:'5%',marginTop:'10%',flexDirection:'row',justifyContent:'flex-start'}}>
                
                <View style={{width:'60%',fontSize:20,fontWeight:'bold'}}>
                    <Text style={{fontSize:20,fontWeight:'bold'}}>{item.key}</Text>
                </View>
                <View style= {{width:'20%',marginLeft:'10%',marginRight:'5%',alignSelf:'flex-end'}}>
                    <Button  title="Delete "  />
                </View>
                
            </View>
            
        )
    }
    
    return(

        <FlatList T
        data={props.dates}
        renderItem={renderItems}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 5 }}
    onEndReachedThreshold={0.5}/>
        
        
        
        
    )
}

export default Alarmitems