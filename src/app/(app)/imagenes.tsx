
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Imagenes() {

  const imagenes = [
    {
      id: 1,
      titulo: "Motocicleta deportiva",
      uri: "https://images.unsplash.com/photo-1786712402005-759af56756d2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGgyciUyMG1vdG98ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 2,
      titulo: "Motocicleta clásica",
      uri: "https://images.unsplash.com/photo-1557744245-f942aa767a7b?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      titulo: "Motocicleta de aventura",
      uri: "https://images.unsplash.com/photo-1771402382360-5d4b0fb45045?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGJtdyUyMGF2ZW50dXIlMjBtb3RvfGVufDB8fDB8fHww",
    },
    {
    id: 4,
      titulo: "Motocicleta de calle",
      uri: "https://images.unsplash.com/photo-1630787283150-519a05fefee3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXQtMDl8ZW58MHx8MHx8fDA%3D",
    },
     {
    id: 5,
      titulo: "Motocicleta de cross ",
      uri: "https://images.unsplash.com/photo-1525013066836-c6090f0ad9d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1vdG9jcm9zc3xlbnwwfHwwfHx8MA%3D%3D"
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Título principal de la galería */}
      <Text style={styles.titulo}>
        🏍️ Galería de Motos
      </Text>

      {/* Descripción de la galería */}
      <Text style={styles.subtitulo}>
        Conoce diferentes estilos y diseños de motocicletas.
      </Text>

      {/* Recorremos la lista de motocicletas */}
      {imagenes.map((item) => (

        // Tarjeta individual de cada motocicleta
        <View style={styles.card} key={item.id}>

          {/* Imagen de la motocicleta */}
          <Image
            source={{ uri: item.uri }}
            style={styles.imagen}
          />

          {/* Nombre o descripción de la motocicleta */}
          <Text style={styles.descripcion}>
            {item.titulo}
          </Text>

        </View>
      ))}

    </ScrollView>
  );
}

// Estilos de la pantalla
const styles = StyleSheet.create({

  // Contenedor principal
  container: {
    padding: 20,
    backgroundColor: "#FFF7FA",
  },

  // Estilo del título
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#6C4051",
  },

  // Estilo del subtítulo
  subtitulo: {
    textAlign: "center",
    color: "#8A727C",
    marginBottom: 20,
  },

  // Estilo de cada tarjeta
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#F2D5E0",
    elevation: 3,
  },

  // Tamaño de las imágenes
  imagen: {
    width: "100%",
    height: 210,
  },

  // Estilo del texto debajo de cada imagen
  descripcion: {
    padding: 14,
    color: "#684552",
    fontWeight: "600",
    fontSize: 16,
  },
});