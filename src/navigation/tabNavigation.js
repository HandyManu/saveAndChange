import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Platform } from 'react-native';
 
// Importando las pantallas
import Home from '../screens/home';
import ShowUser from '../screens/showUser';
import AddUser from '../screens/addUser';
import UpdateUser from '../screens/updateUser'; // 👈 ¡Esta es la clave!

 
 
//creando un objeto Tab utilizando createBottomTabNavigator de la libreria/dependencia instalada
const Tab = createBottomTabNavigator();
 
const TabNavigator = () => {
    return (
 
<Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false, // Oculta el header
            tabBarActiveTintColor: '#AF8260', // Color de los íconos activos
            tabBarInactiveTintColor: '#B99873', // Color de los íconos inactivos
            tabBarStyle: { backgroundColor: '#FFF',
              height: Platform.OS === 'ios' ? 80 : 60, // Estilo de la barra de pestañas, altura diferente para iOS y Android
           borderTopWidth: 0 }, // Estilo de la barra de pestañas
            tabBarIcon: ({ focused, color, size }) => { // Función que define el ícono de la pestaña
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'ShowUser') {
            iconName = focused ? 'people' : 'people-outline';
              } else if (route.name === 'AddUser') {
                       iconName = focused ? 'person-add' : 'person-add-outline';
              }
              else if (route.name === 'UpdateUser') {
                iconName = focused ? 'create' : 'create-outline';
              }
              return <Ionicons name={iconName} color={color} size={size} />;
            },
          })}
        >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ title: 'Inicio' }}
      />
      <Tab.Screen
        name="ShowUser"
        component={ShowUser}
        options={{ title: 'ShowUser' }}
      />
      <Tab.Screen
        name="AddUser"
        component={AddUser}
        options={{ title: 'AddUser' }}
      />
      <Tab.Screen
        name="UpdateUser"
        component={UpdateUser}
        options={{ title: 'UpdateUser' }}
      />
    </Tab.Navigator>
    );
};
 
export default TabNavigator;