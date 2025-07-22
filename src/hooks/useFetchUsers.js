import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

const useFetchUser = () => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [correo, setCorreo] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // Nuevo estado para controlar el modo edición

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://retoolapi.dev/zZhXYF/movil');
      const data = await response.json();
      
      // Filtrar usuarios válidos y agregar logs para debugging
      const usuariosValidos = data.filter(user => {
        if (!user || user.id == null) {
          console.log('Usuario inválido encontrado:', user);
          return false;
        }
        return true;
      });
      
      console.log('Usuarios cargados:', usuariosValidos.length);
      setUsuarios(usuariosValidos);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      Alert.alert('Error', 'No se pudieron cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const limpiarFormulario = () => {
    setNombre('');
    setEdad('');
    setCorreo('');
    setEditingId(null);
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
        const nuevoUsuario = await response.json();
        // Actualizar el estado local inmediatamente
        setUsuarios(prev => [...prev, nuevoUsuario]);
        Alert.alert('Éxito', 'Usuario guardado correctamente');
        limpiarFormulario();
      } else {
        Alert.alert('Error', 'No se pudo guardar el usuario');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al enviar los datos');
    }
  };

  const handleEliminar = async (id) => {
    // Validar que el ID existe
    if (!id) {
      Alert.alert('Error', 'ID de usuario no válido');
      return;
    }

    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este usuario?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`https://retoolapi.dev/zZhXYF/movil/${id}`, {
                method: 'DELETE'
              });
              
              if (response.ok) {
                // Actualizar el estado local inmediatamente
                setUsuarios(prev => prev.filter(user => user.id !== id));
                Alert.alert('Éxito', 'Usuario eliminado correctamente');
              } else {
                Alert.alert('Error', 'No se pudo eliminar el usuario');
              }
            } catch (error) {
              console.error(error);
              Alert.alert('Error', 'Ocurrió un error al eliminar el usuario');
            }
          },
        },
      ]
    );
  };

  const prepararActualizacion = (user) => {
    setNombre(user.nombre);
    setEdad(user.edad.toString());
    setCorreo(user.correo);
    setEditingId(user.id);
  };

  const handleActualizar = async () => {
    if (!nombre || !edad || !correo || !editingId) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }

    try {
      const response = await fetch(`https://retoolapi.dev/zZhXYF/movil/${editingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, edad: parseInt(edad), correo })
      });
      
      if (response.ok) {
        const usuarioActualizado = await response.json();
        // Actualizar el estado local inmediatamente
        setUsuarios(prev => 
          prev.map(user => 
            user.id === editingId 
              ? { ...user, nombre, edad: parseInt(edad), correo }
              : user
          )
        );
        Alert.alert('Éxito', 'Usuario actualizado correctamente');
        limpiarFormulario();
      } else {
        Alert.alert('Error', 'No se pudo actualizar el usuario');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al actualizar el usuario');
    }
  };

  const cancelarEdicion = () => {
    limpiarFormulario();
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return {
    nombre, setNombre,
    edad, setEdad,
    correo, setCorreo,
    handleGuardar,
    handleEliminar,
    handleActualizar,
    prepararActualizacion,
    cancelarEdicion,
    editingId,
    usuarios, loading,
    fetchUsuarios,
    limpiarFormulario
  };
};

export default useFetchUser;
