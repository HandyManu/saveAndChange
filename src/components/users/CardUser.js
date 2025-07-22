import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const CardUser = ({ user, onDelete, onEdit }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{user.nombre}</Text>
      <Text style={styles.cardText}>Edad: {user.edad}</Text>
      <Text style={styles.cardText}>Correo: {user.correo}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={() => onDelete(user.id)}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.updateButton} 
          onPress={() => onEdit(user)}
        >
          <Text style={styles.buttonText}>Editar</Text>
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
