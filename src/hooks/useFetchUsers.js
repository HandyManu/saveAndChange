import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

const useFetchUser = () => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [correo, setCorreo] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('https://retoolapi.dev/zZhXYF/movil');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGuardar = async () => {
    if (!nombre || !edad || !correo) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }
    try {
      const response = await fetch('https://retoolapi.dev/zZhXYF/movil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, edad: parseInt(edad), correo })
      });
      if (response.ok) {
        Alert.alert('Éxito', 'Usuario guardado correctamente');
        setNombre('');
        setEdad('');
        setCorreo('');
        fetchUsuarios();
      } else {
        Alert.alert('Error', 'No se pudo guardar el usuario');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al enviar los datos');
    }
  };

  // 🔧 Eliminar usuario
  const handleEliminar = async (id) => {
    try {
      const response = await fetch(`https://retoolapi.dev/zZhXYF/movil/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        Alert.alert('Éxito', 'Usuario eliminado correctamente');
        fetchUsuarios();
      } else {
        Alert.alert('Error', 'No se pudo eliminar el usuario');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al eliminar el usuario');
    }
  };

  // 🔧 Actualizar usuario
  const handleActualizar = async (id) => {
    if (!nombre || !edad || !correo) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }
    try {
      const response = await fetch(`https://retoolapi.dev/zZhXYF/movil/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, edad: parseInt(edad), correo })
      });
      if (response.ok) {
        Alert.alert('Éxito', 'Usuario actualizado correctamente');
        fetchUsuarios();
      } else {
        Alert.alert('Error', 'No se pudo actualizar el usuario');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al actualizar el usuario');
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return {
    nombre, setNombre,
    edad, setEdad,
    correo, setCorreo,
    handleGuardar,
    handleEliminar, // 🆕
    handleActualizar, // 🆕
    usuarios, loading,
    fetchUsuarios
  };
};

export default useFetchUser;
