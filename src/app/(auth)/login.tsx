import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator, Alert, Pressable, StyleSheet,
    Text, TextInput, View
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const iniciarSesion = async () => {
    if (!correo.trim() || !password) {
      Alert.alert("Campos incompletos", "Ingrese correo y contraseña");
      return;
    }
    try {
      setCargando(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: correo.trim(),
        password,
      });
      if (error) {
        Alert.alert("Inicio de sesión", error.message);
        return;
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🏍️</Text>
      <Text style={styles.titulo}>Moto Yela</Text>
      <Text style={styles.subtitulo}>Inicia sesión para gestionar mantenimientos</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#666"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#666"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable style={styles.boton} onPress={iniciarSesion} disabled={cargando}>
        {cargando ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.botonTexto}>Iniciar sesión</Text>
        )}
      </Pressable>
      <Pressable onPress={() => router.push("/(auth)/registro"as any)}>
        <Text style={styles.enlace}>¿No tienes cuenta? Regístrate</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#121212" },
  logo: { fontSize: 60, textAlign: "center", marginBottom: 10 },
  titulo: { fontSize: 30, fontWeight: "bold", color: "#FF5722", textAlign: "center" },
  subtitulo: { color: "#AAA", textAlign: "center", marginBottom: 24, fontSize: 16 },
  input: { backgroundColor: "#1E1E1E", color: "#FFF", borderWidth: 1, borderColor: "#333", borderRadius: 14, padding: 14, marginBottom: 14 },
  boton: { backgroundColor: "#FF5722", padding: 15, borderRadius: 14, alignItems: "center" },
  botonTexto: { color: "#FFFFFF", fontWeight: "bold", fontSize: 16 },
  enlace: { color: "#FF5722", textAlign: "center", marginTop: 18, fontWeight: "600" },
});