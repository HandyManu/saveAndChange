import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';

const UpdateUser = ({ navigation, route }) => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [correo, setCorreo] = useState('');
  const [userId, setUserId] = useState(null);

  // Cargar los datos del usuario cuando se reciban por parámetros
  useEffect(() => {
    if (route.params?.userToEdit) {
      const user = route.params.userToEdit;
      setNombre(user.nombre || '');
      setEdad(user.edad ? user.edad.toString() : '');
      setCorreo(user.correo || '');
      setUserId(user.id);
    }
  }, [route.params]);

  const handleActualizar = async () => {
    if (!nombre || !edad || !correo || !userId) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }

    try {
      const response = await fetch(`https://retoolapi.dev/zZhXYF/movil/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nombre, 
          edad: parseInt(edad), 
          correo 
        })
      });
      
      if (response.ok) {
        Alert.alert(
          'Éxito', 
          'Usuario actualizado correctamente',
          [
            {
              text: 'OK',
              onPress: () => {
                // Regresar a la pantalla de ShowUser
                navigation.goBack();
              }
            }
          ]
        );
      } else {
        Alert.alert('Error', 'No se pudo actualizar el usuario');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al actualizar el usuario');
    }
  };

  const handleCancel = () => {
    // Regresar a la pantalla anterior (ShowUser)
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Actualizar Usuario</Text>
      <Text style={styles.subtitle}>Modifica la información del usuario</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        placeholderTextColor="#A1866F"
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
        placeholderTextColor="#A1866F"
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        placeholderTextColor="#A1866F"
      />

      <TouchableOpacity style={styles.button} onPress={handleActualizar}>
        <Text style={styles.buttonText}>Actualizar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#EAD8C0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#5C3D2E'
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#5C3D2E'
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#5C3D2E',
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    backgroundColor: '#FFF',
    color: '#000'
  },
  button: {
    backgroundColor: '#3B7D63',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginTop: 20
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  cancelButton: {
    backgroundColor: '#A94438',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginTop: 10
  },
  cancelButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default UpdateUser;
