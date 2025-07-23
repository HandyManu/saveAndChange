import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import useFetchUser from '../hooks/useFetchUsers';

const UpdateUser = ({ navigation }) => {
  const {
    nombre,
    edad,
    correo,
    setNombre,
    setEdad,
    setCorreo,
    handleActualizar,
    cancelarEdicion,
    editingId
  } = useFetchUser();

  const handleUpdate = () => {
    if (editingId) {
      handleActualizar(editingId);
    }
  };

  const handleCancel = () => {
    cancelarEdicion();
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

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
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
