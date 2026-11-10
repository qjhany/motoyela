import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator, Pressable, ScrollView,
    StyleSheet, Text, View
} from "react-native";
import { supabase } from "../../lib/supabase";

type Item = {
  codigo: string;
  titulo: string;
  descripcion: string;
  detalle: string;
  precio: number | null;
};

export default function Detalle() {
  const router = useRouter();
  const { codigo } = useLocalSearchParams<{ codigo?: string }>();

  const [item, setItem] = useState<Item | null>(null);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    let activo = true;
    async function consultar() {
      try {
        const { data, error } = await supabase
          .from("catalogo_qr")
          .select("codigo, titulo, descripcion, detalle, precio")
          .eq("codigo", codigo)
          .maybeSingle();

        if (error) throw error;
        if (activo) {
          setItem(data);
          if (!data) setMensaje("Elemento no encontrado");
        }
      } catch (e) {
        if (activo) setMensaje("Error al consultar ficha");
      } finally {
        if (activo) setCargando(false);
      }
    }

    if (codigo) {
      consultar();
    } else {
      setMensaje("Falta código");
      setCargando(false);
    }

    return () => {
      activo = false;
    };
  }, [codigo]);

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#8B5E3C" />
        <Text style={styles.cargandotexto}>Cargando ficha técnica...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {item ? (
        <>
          <Text style={styles.titulo}>{item.titulo}</Text>
          <Text style={styles.codigo}>CÓDIGO: {item.codigo}</Text>
          <Text style={styles.descripcion}>{item.descripcion}</Text>
          <Text style={styles.detalle}>{item.detalle}</Text>
          {item.precio != null && (
            <Text style={styles.precio}>
              $ {Number(item.precio).toLocaleString("es-CO")}
            </Text>
          )}
        </>
      ) : (
        <Text style={styles.mensajeError}>{mensaje}</Text>
      )}

      <Pressable style={styles.boton} onPress={() => router.back()}>
        <Text style={styles.botonTexto}>Volver al catálogo</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF9F5",
    padding: 20,
  },
  cargandotexto: {
    marginTop: 12,
    color: "#8B5E3C",
    fontSize: 14,
    fontWeight: "700",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF9F5",
    padding: 20,
    paddingTop: 48,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#5B3A2D",
    marginBottom: 8,
  },
  codigo: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#C97C8E",
    letterSpacing: 1,
    marginBottom: 16,
  },
  descripcion: {
    fontSize: 14,
    color: "#8B6A5D",
    lineHeight: 20,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F1DDD6",
  },
  detalle: {
    fontSize: 14,
    color: "#73594E",
    lineHeight: 20,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F1DDD6",
  },
  precio: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#5B3A2D",
    marginBottom: 24,
    backgroundColor: "#F8E1E8",
    padding: 16,
    borderRadius: 12,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#F1DDD6",
  },
  mensajeError: {
    fontSize: 14,
    color: "#7A3E48",
    textAlign: "center",
    marginBottom: 20,
  },
  boton: {
    backgroundColor: "#5B3A2D",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  botonTexto: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});