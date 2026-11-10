import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function Inicio() {
  const router = useRouter();

  const cerrarSesion = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* PORTADA PRINCIPAL */}
      <View style={styles.hero}>
        <Image
          source={{
            uri: "https://www.xtrafondos.com/thumbs/webp/1_12331.webp",
          }}
          style={styles.imagenHero}
        />

        <View style={styles.overlay}>
          <Text style={styles.etiqueta}>
            MOTO🏍️YELA
          </Text>

          <Text style={styles.titulo}>
            Moto Yela
          </Text>

          <Text style={styles.subtitulo}>
            Servicio y mantenimiento para tu moto.
          </Text>
        </View>
      </View>

      {/* BIENVENIDA */}
      <View style={styles.saludoBox}>
        <View>
          <Text style={styles.saludoTitulo}>
            Hola, motociclista
          </Text>

          <Text style={styles.saludoTexto}>
            ¿Qué deseas explorar hoy?
          </Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>
            🏍️
          </Text>
        </View>
      </View>

      {/* TÍTULO */}
      <Text style={styles.seccionTitulo}>
        Explorar Moto Yela
      </Text>

      {/* 3 BOTONES EN HORIZONTAL */}
      <View style={styles.botonesContainer}>

        {/* GALERÍA */}
        <Pressable
          style={styles.boton}
          onPress={() => router.push("/imagenes")}
        >
          <Text style={styles.emoji}>
            🏍️
          </Text>

          <Text style={styles.botonTitulo}>
            Galería
          </Text>

          <Text style={styles.flecha}>
            ›
          </Text>
        </Pressable>

        {/* MANTENIMIENTO */}
        <Pressable
          style={styles.boton}
          onPress={() => router.push("/formulario")}
        >
          <Text style={styles.emoji}>
            🔧
          </Text>

          <Text style={styles.botonTitulo}>
            Mantenimiento
          </Text>

          <Text style={styles.flecha}>
            ›
          </Text>
        </Pressable>

        {/* CONTACTO */}
        <Pressable
          style={styles.boton}
          onPress={() => router.push("/contacto")}
        >
          <Text style={styles.emoji}>
            📞
          </Text>

          <Text style={styles.botonTitulo}>
            Contacto
          </Text>

          <Text style={styles.flecha}>
            ›
          </Text>
        </Pressable>

      </View>

      {/* REGISTROS DE SUPABASE */}
      <Pressable
        style={styles.botonRegistros}
        onPress={() => router.push("/registros")}
      >
        <View style={styles.registrosIcono}>
          <Text style={styles.registrosEmoji}>
            📋
          </Text>
        </View>

        <View style={styles.registrosInfo}>
          <Text style={styles.registrosTitulo}>
            Ver registros
          </Text>

          <Text style={styles.registrosTexto}>
            Consulta las motocicletas guardadas en Supabase.
          </Text>
        </View>

        <Text style={styles.registrosFlecha}>
          ›
        </Text>
      </Pressable>

      {/* CATÁLOGO */}
<Pressable
  style={styles.boton}
  onPress={() => router.push("/Catalogo")}
>
  <Text style={styles.emoji}>
    📖
  </Text>

  <Text style={styles.botonTitulo}>
    Catálogo
  </Text>

  <Text style={styles.flecha}>
    ›
  </Text>
</Pressable>

{/* DETALLE */}
<Pressable
  style={styles.boton}
  onPress={() => router.push("/Detalle")}
>
  <Text style={styles.emoji}>
    📋
  </Text>

  <Text style={styles.botonTitulo}>
    Detalle
  </Text>

  <Text style={styles.flecha}>
    ›
  </Text>
</Pressable>

{/* ESCÁNER */}
<Pressable
  style={styles.boton}
  onPress={() => router.push("/Escaner")}
>
  <Text style={styles.emoji}>
    📷
  </Text>

  <Text style={styles.botonTitulo}>
    Escáner
  </Text>

  <Text style={styles.flecha}>
    ›
  </Text>
</Pressable>

      {/* RECOMENDACIÓN */}
      <View style={styles.destacado}>

        <View style={styles.destacadoIcono}>
          <Text style={styles.destacadoEmoji}>
            🔧
          </Text>
        </View>

        <View style={styles.destacadoInfo}>

          <Text style={styles.destacadoTitulo}>
            Recomendación
          </Text>

          <Text style={styles.destacadoTexto}>
            Mantén tu motocicleta en buen estado
            realizando revisiones periódicas.
          </Text>

        </View>

      </View>

      {/* CERRAR SESIÓN */}
      <Pressable style={styles.botonCerrar} onPress={cerrarSesion}>
        <Text style={styles.textoCerrar}>Cerrar sesión</Text>
      </Pressable>

      {/* FOOTER */}
      <Text style={styles.footer}>
        Moto Yela · Desarrollo Móvil
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF9F5",
    padding: 18,
  },

  /* PORTADA */

  hero: {
    height: 280,
    borderRadius: 28,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 6,
  },

  imagenHero: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 22,
    backgroundColor: "rgba(92, 53, 38, 0.76)",
  },

  etiqueta: {
    color: "#FFE7EF",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1.8,
    marginBottom: 6,
  },

  titulo: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 6,
  },

  subtitulo: {
    color: "#FFF1EA",
    fontSize: 14,
    lineHeight: 21,
  },

  /* BIENVENIDA */

  saludoBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    elevation: 2,
  },

  saludoTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5B3A2D",
  },

  saludoTexto: {
    marginTop: 3,
    color: "#8B6A5D",
    fontSize: 14,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F8DDE7",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarTexto: {
    fontSize: 24,
  },

  /* TÍTULO */

  seccionTitulo: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#5B3A2D",
    marginBottom: 14,
  },

  /* CONTENEDOR DE LOS 3 BOTONES */

  botonesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 16,
  },

  /* BOTÓN */

  boton: {
    flex: 1,
    minHeight: 130,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F1DDD6",
    elevation: 3,
  },

  emoji: {
    fontSize: 30,
    marginBottom: 8,
  },

  botonTitulo: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#5B3A2D",
    textAlign: "center",
  },

  flecha: {
    fontSize: 24,
    color: "#C97C8E",
    marginTop: 4,
  },

  /* REGISTROS */

  botonRegistros: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1DDD6",
    elevation: 3,
    marginBottom: 20,
  },

  registrosIcono: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#F8DDE7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  registrosEmoji: {
    fontSize: 25,
  },

  registrosInfo: {
    flex: 1,
  },

  registrosTitulo: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#5B3A2D",
    marginBottom: 4,
  },

  registrosTexto: {
    color: "#8B6A5D",
    fontSize: 13,
    lineHeight: 18,
  },

  registrosFlecha: {
    fontSize: 28,
    color: "#C97C8E",
    marginLeft: 8,
  },

  /* RECOMENDACIÓN */

  destacado: {
    backgroundColor: "#F8E1E8",
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  destacadoIcono: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  destacadoEmoji: {
    fontSize: 25,
  },

  destacadoInfo: {
    flex: 1,
  },

  destacadoTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7A4C3A",
    marginBottom: 4,
  },

  destacadoTexto: {
    color: "#73594E",
    fontSize: 13,
    lineHeight: 19,
  },

  /* CERRAR SESIÓN */
  botonCerrar: {
    backgroundColor: "#D32F2F",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
  },
  
  textoCerrar: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  /* FOOTER */

  footer: {
    textAlign: "center",
    color: "#9B7A6E",
    fontSize: 12,
    marginTop: 24,
    marginBottom: 12,
  },
});