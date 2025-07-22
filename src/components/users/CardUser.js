import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import useFetchUser from "../../hooks/useFetchUsers"; // 🆕

const CardUser = ({ user }) => {
  const { setNombre, setEdad, setCorreo, handleEliminar, handleActualizar } = useFetchUser();

  const prepararActualizacion = () => {
    setNombre(user.nombre);
    setEdad(user.edad.toString());
    setCorreo(user.correo);
    handleActualizar(user.id); // 🆕
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{user.nombre}</Text>
      <Text style={styles.cardText}>Edad: {user.edad}</Text>
      <Text style={styles.cardText}>Correo: {user.correo}</Text>

      {/* 🔧 Botones añadidos */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleEliminar(user.id)}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.updateButton} onPress={prepararActualizacion}>
          <Text style={styles.buttonText}>Actualizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5C3D2E',
    marginBottom: 5
  },
  cardText: {
    fontSize: 16,
    color: '#3B2C24'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  deleteButton: {
    backgroundColor: '#A94438',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5
  },
  updateButton: {
    backgroundColor: '#3B7D63',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default CardUser;
