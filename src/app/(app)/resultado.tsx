import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Resultado() {
  const router = useRouter();

  const {
    id,
    nombre,
    marca,
    modelo,
    anio,
    telefono,
    ciudad,
  } = useLocalSearchParams();

  return (
    <View style={styles.container}>

      <Text style={styles.icono}>
        🏍️
      </Text>

      <Text style={styles.titulo}>
        Motocicleta registrada
      </Text>

      <Text style={styles.subtitulo}>
        Registro guardado correctamente.
      </Text>

      <View style={styles.card}>

        <Text style={styles.label}>
          🆔 ID del registro
        </Text>

        <Text style={styles.valor}>
          {id}
        </Text>

        <Text style={styles.label}>
          👤 Propietario
        </Text>

        <Text style={styles.valor}>
          {nombre}
        </Text>

        <Text style={styles.label}>
          🏍️ Marca
        </Text>

        <Text style={styles.valor}>
          {marca}
        </Text>

        <Text style={styles.label}>
          🔧 Modelo
        </Text>

        <Text style={styles.valor}>
          {modelo}
        </Text>

        <Text style={styles.label}>
          📅 Año
        </Text>

        <Text style={styles.valor}>
          {anio}
        </Text>

        <Text style={styles.label}>
          📱 Teléfono
        </Text>

        <Text style={styles.valor}>
          {telefono}
        </Text>

        <Text style={styles.label}>
          📍 Ciudad
        </Text>

        <Text style={styles.valor}>
          {ciudad}
        </Text>

      </View>

      <Pressable
        style={styles.boton}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.botonTexto}>
          Volver al inicio
        </Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7FA",
    justifyContent: "center",
    padding: 20,
  },

  icono: {
    fontSize: 50,
    textAlign: "center",
    marginBottom: 5,
  },

  titulo: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#6C4051",
    textAlign: "center",
  },

  subtitulo: {
    color: "#8A727C",
    textAlign: "center",
    marginBottom: 22,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F2D5E0",
    marginBottom: 18,
    elevation: 3,
  },

  label: {
    color: "#A06C80",
    fontSize: 13,
    marginTop: 8,
  },

  valor: {
    color: "#563C46",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 8,
  },

  boton: {
    backgroundColor: "#C96A8B",
    padding: 14,
    borderRadius: 13,
    alignItems: "center",
  },

  botonTexto: {
    color: "white",
    fontWeight: "bold",
  },
});