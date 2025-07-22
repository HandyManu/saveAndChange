import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import CardUser from "../components/users/CardUser";
import useFetchUser from "../hooks/useFetchUsers";

const ShowUser = ({ navigation }) => {
  const { usuarios, loading, handleEliminar, prepararActualizacion } = useFetchUser();

  const handleEditUser = (user) => {
    // Navegar a la pantalla de edición (AddUser) con los datos del usuario
    navigation.navigate('AddUser', { 
      userToEdit: user,
      isEditing: true 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      <Text style={styles.subtitle}>
        Consulta los usuarios registrados desde la API
      </Text>

      {!loading && (
        <Text style={styles.counterText}>
          Total de usuarios: {usuarios.length}
        </Text>
      )}

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#5C3D2E"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={usuarios.filter(user => user && user.id != null)}
          keyExtractor={(user) => user.id.toString()}
          renderItem={({ item }) => (
            <CardUser 
              user={item} 
              onDelete={handleEliminar}
              onEdit={handleEditUser}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAD8C0",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  listContainer: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#5C3D2E",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#5C3D2E",
    textAlign: "center",
    marginBottom: 10,
  },
  counterText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B2C24",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default ShowUser;