
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function Registros() {
  const [registros, setRegistros] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  const cargarRegistros = async () => {
    try {
      setCargando(true);

      const { data, error } = await supabase
        .from("clientes_moto")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.log("Error de Supabase:", error);
        alert("No se pudieron cargar los registros.");
        return;
      }

      setRegistros(data || []);
    } catch (error) {
      console.log("Error:", error);
      alert("Ocurrió un error al consultar los registros.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarRegistros();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.icono}>🏍️</Text>

      <Text style={styles.titulo}>
        Registros de motocicletas
      </Text>

      <Text style={styles.subtitulo}>
        Motocicletas guardadas en Supabase
      </Text>

      {cargando ? (
        <View style={styles.cargando}>
          <ActivityIndicator size="large" color="#C96A8B" />

          <Text style={styles.textoCargando}>
            Cargando registros...
          </Text>
        </View>
      ) : registros.length === 0 ? (
        <View style={styles.card}>
          <Text style={styles.sinRegistros}>
            No hay registros todavía.
          </Text>
        </View>
      ) : (
        registros.map((registro) => (
          <View style={styles.card} key={registro.id}>
            <Text style={styles.id}>
              🆔 Registro #{registro.id}
            </Text>

            <Text style={styles.label}>
              👤 Propietario
            </Text>

            <Text style={styles.valor}>
              {registro.nombre}
            </Text>

            <Text style={styles.label}>
              🏍️ Motocicleta
            </Text>

            <Text style={styles.valor}>
              {registro.moto_favorita}
            </Text>

            <Text style={styles.label}>
              📱 Teléfono
            </Text>

            <Text style={styles.valor}>
              {registro.telefono}
            </Text>

            <Text style={styles.label}>
              📍 Ciudad
            </Text>

            <Text style={styles.valor}>
              {registro.ciudad}
            </Text>

            <Text style={styles.label}>
              ✉️ Correo
            </Text>

            <Text style={styles.valor}>
              {registro.correo}
            </Text>
          </View>
        ))
      )}

      <Pressable
        style={styles.boton}
        onPress={cargarRegistros}
      >
        <Text style={styles.botonTexto}>
          🔄 Actualizar registros
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF7FA",
    padding: 20,
  },

  icono: {
    fontSize: 50,
    textAlign: "center",
    marginTop: 30,
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
    marginBottom: 20,
  },

  cargando: {
    alignItems: "center",
    marginTop: 40,
  },

  textoCargando: {
    marginTop: 10,
    color: "#8A727C",
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F2D5E0",
    marginBottom: 15,
    elevation: 3,
  },

  id: {
    color: "#C96A8B",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  label: {
    color: "#A06C80",
    fontSize: 13,
    marginTop: 7,
  },

  valor: {
    color: "#563C46",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 5,
  },

  sinRegistros: {
    textAlign: "center",
    color: "#8A727C",
    fontSize: 16,
  },

  boton: {
    backgroundColor: "#C96A8B",
    padding: 14,
    borderRadius: 13,
    alignItems: "center",
    marginTop: 5,
    marginBottom: 30,
  },

  botonTexto: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});

