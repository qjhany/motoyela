import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function Formulario() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [anio, setAnio] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [guardando, setGuardando] = useState(false);

  const enviar = async () => {
    if (!nombre || !marca || !modelo || !anio || !telefono || !ciudad) {
      alert("Todos los campos son obligatorios");
      return;
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
      alert("El nombre solo debe contener letras");
      return;
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(ciudad)) {
      alert("La ciudad solo debe contener letras");
      return;
    }
  
    
    if (!/^\d+$/.test(telefono)) {
      alert("El número de teléfono solo debe contener números");
      return;
    }
    if (telefono.length < 7) {
      alert("El número de teléfono debe tener al menos 7 dígitos");
      return;
    }

    try {
      setGuardando(true);

      // Información completa de la motocicleta
      const motoFavorita = `${marca} ${modelo} - Año ${anio}`;

      // Guardar los datos en Supabase
      const { data, error } = await supabase
        .from("clientes_moto")
        .insert([
          {
            nombre: nombre,
            correo: "sin-correo@moto.com",
            telefono: telefono,
            ciudad: ciudad,
            moto_favorita: motoFavorita,
          },
        ])
        .select()
        .single();

      if (error) {
        console.log("Error de Supabase:", error);
        alert("No se pudo guardar el registro.");
        return;
      }

      console.log("Registro guardado:", data);

      // Ir a la pantalla resultado
      router.push({
        pathname: "/resultado",
        params: {
          nombre,
          marca,
          modelo,
          anio,
          telefono,
          ciudad,
          id: String(data.id),
        },
      });
    } catch (error) {
      console.log("Error:", error);
      alert("Ocurrió un error al guardar los datos.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.icono}>🏍️</Text>

      <Text style={styles.titulo}>
        Registro de motocicleta
      </Text>

      <Text style={styles.subtitulo}>
        Completa la información de tu motocicleta.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          👤 Nombre del propietario
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ingrese su nombre"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>
          🏍️ Marca de la moto
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ej: Yamaha, Honda, Suzuki"
          value={marca}
          onChangeText={setMarca}
        />

        <Text style={styles.label}>
          🔧 Modelo
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ej: MT-15, CB190R"
          value={modelo}
          onChangeText={setModelo}
        />

        <Text style={styles.label}>
          📅 Año de la motocicleta
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ej: 2024"
          keyboardType="numeric"
          value={anio}
          onChangeText={setAnio}
        />

        <Text style={styles.label}>
          📱 Teléfono
        </Text>

        <TextInput
          style={styles.input}
          placeholder="3001234567"
          keyboardType="numeric"
          value={telefono}
          onChangeText={setTelefono}
        />

        <Text style={styles.label}>
          📍 Ciudad
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ej: Pasto"
          value={ciudad}
          onChangeText={setCiudad}
        />

        <Pressable
          style={styles.boton}
          onPress={enviar}
          disabled={guardando}
        >
          <Text style={styles.botonTexto}>
            {guardando
              ? "Guardando..."
              : "Registrar motocicleta 🏍️"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF7FA",
    padding: 20,
    justifyContent: "center",
  },

  icono: {
    fontSize: 50,
    textAlign: "center",
    marginBottom: 5,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6C4051",
    textAlign: "center",
  },

  subtitulo: {
    color: "#8A727C",
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F2D5E0",
    elevation: 3,
  },

  label: {
    color: "#684552",
    fontWeight: "600",
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#FFF9FB",
    borderWidth: 1,
    borderColor: "#EBC8D6",
    borderRadius: 13,
    padding: 12,
    marginBottom: 14,
  },

  boton: {
    backgroundColor: "#C96A8B",
    paddingVertical: 14,
    borderRadius: 13,
    alignItems: "center",
    marginTop: 4,
  },

  botonTexto: {
    color: "white",
    fontWeight: "bold",
  },
});