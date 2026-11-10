import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator, Alert, Pressable, StyleSheet,
    Text, TextInput, View
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function Registro() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [guardando, setGuardando] = useState(false);

  const crearCuenta = async () => {
    if (!correo.trim() || !password) {
      Alert.alert("Campos incompletos", "Ingrese correo y contraseña");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Contraseña", "Debe tener mínimo 6 caracteres");
      return;
    }
    try {
      setGuardando(true);
      const { error } = await supabase.auth.signUp({
        email: correo.trim(),
        password,
      });
      if (error) {
        Alert.alert("Error", error.message);
        return;
      }
      // Cerramos sesión de inmediato para obligar a pasar por el Login
      await supabase.auth.signOut();
      Alert.alert("Cuenta creada", "Ahora puede iniciar sesión");
      router.replace("/(auth)/login"as any);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🏍️</Text>
      <Text style={styles.titulo}>Crear cuenta</Text>
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
      <Pressable style={styles.boton} onPress={crearCuenta} disabled={guardando}>
        {guardando ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.botonTexto}>Crear cuenta</Text>
        )}
      </Pressable>
      <Pressable onPress={() => router.replace("/(auth)/login"as any)}>
        <Text style={styles.enlace}>Ya tengo una cuenta</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#121212" },
  logo: { fontSize: 56, textAlign: "center", marginBottom: 10 },
  titulo: { fontSize: 28, fontWeight: "bold", color: "#FF5722", textAlign: "center", marginBottom: 24 },
  input: { backgroundColor: "#1E1E1E", color: "#FFF", borderWidth: 1, borderColor: "#333", borderRadius: 14, padding: 14, marginBottom: 14 },
  boton: { backgroundColor: "#FF5722", padding: 15, borderRadius: 14, alignItems: "center" },
  botonTexto: { color: "#FFFFFF", fontWeight: "bold", fontSize: 16 },
  enlace: { color: "#FF5722", textAlign: "center", marginTop: 18, fontWeight: "600" },
});