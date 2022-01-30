
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Alarm from '../Screens/AlarmScreen'
import Stopw from '../Screens/StopwatchScreen';
import Timers from '../Screens/Timerscreen';
import { initKeys } from '../helper/StorageTimer';

const Tab = createBottomTabNavigator();


export default Tabbar = ()=> {
  return (
      <Tab.Navigator>

        <Tab.Screen name="Stopwatch" component={Stopw} options={{
          title: 'Stopwatch',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTitleAlign:'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>

        <Tab.Screen name="Timer" component={Timers} options={{
          title: 'Timer',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTitleAlign:'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>

      </Tab.Navigator>
  );
}