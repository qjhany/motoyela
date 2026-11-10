import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { supabase } from '../../lib/supabase';

type Item = {
  codigo: string;
  Titulo: string;
  Descripcion: string;
  Detalle: string;
  Precio: string;
};

export default function Catalogo() {
  const router = useRouter();

  const [items, setItems] = useState<Item[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorTexto, setErrorTexto] = useState('');

  // Consultar al abrir la pantalla
  useEffect(() => {
    cargarCatalogo();
  }, []);

  const cargarCatalogo = async () => {
    try {
      setCargando(true);
      setErrorTexto('');

      const { data, error } = await supabase
        .from('Catalogo')
        .select('codigo, Titulo, Descripcion, Detalle, Precio')
        .order('codigo', { ascending: true });

      if (error) {
        throw error;
      }

      if (data) {
        setItems(data as Item[]);
      }
    } catch (error: any) {
      console.error('Error al consultar catálogo:', error);
      const mensaje =
        error instanceof Error
          ? error.message
          : typeof error === 'object' &&
            error !== null &&
            'message' in error
          ? String((error as any).message)
          : String(error);

      setErrorTexto('No fue posible cargar: ' + mensaje);
      setItems([]);
    } finally {
      setCargando(false);
    }
  };

  // Mostrar indicador de carga
  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#8B5E3C" />
        <Text style={styles.cargandotexto}>
          Consultando productos en Supabase...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* TÍTULOS DE LA SECCIÓN */}
      <View style={styles.headerContainer}>
        <Text style={styles.titulo}>Explora Nuestro catálogo</Text>
        <Text style={styles.subtitulo}>Nuestros productos y sus características</Text>
      </View>

      {/* MENSAJE DE ERROR Y REINTENTAR */}
      {errorTexto ? (
        <View style={styles.errorcaja}>
          <Text style={styles.errorTextoContenido}>{errorTexto}</Text>
          <Pressable style={styles.botonriintentar} onPress={cargarCatalogo}>
            <Text style={styles.botontexto}>Reintentar conexión</Text>
          </Pressable>
        </View>
      ) : null}

      {/* LISTA DE PRODUCTOS */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.codigo}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          errorTexto ? null : (
            <View style={styles.centro}>
              <Text style={styles.vacio}>
                No hay productos registrados.
              </Text>
            </View>
          )
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: '/(app)/Detalle',
                params: {
                  codigo: item.codigo,
                  titulo: item.Titulo,
                  descripcion: item.Descripcion,
                  detalle: item.Detalle,
                  precio: item.Precio,
                },
              })
            }
          >
            <View style={styles.iconoCaja}>
              <Text style={styles.icono}>🏍️</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.nombre}>
                {item.Titulo}
              </Text>

              <Text style={styles.descripcion} numberOfLines={2}>
                {item.Descripcion}
              </Text>

              {item.Precio !== null &&
                item.Precio !== undefined && (
                  <Text style={styles.precio}>
                    ${Number(item.Precio).toLocaleString('es-CO')}
                  </Text>
                )}

              <Text style={styles.enlace}>
                Ver detalles →
              </Text>
            </View>
          </Pressable>
        )}
      />

      {/* BOTÓN PARA VOLVER A CONSULTAR */}
      {!errorTexto && (
        <Pressable
          style={styles.botonActualizar}
          onPress={cargarCatalogo}
        >
          <Text style={styles.botonTexto}>
            Actualizar catálogo
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cargandotexto: {
    marginTop: 12,
    color: '#8B5E3C',
    fontSize: 14,
    fontWeight: '700',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 48,
    backgroundColor: '#FFF9F5',
  },
  headerContainer: {
    marginBottom: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5B3A2D',
  },
  subtitulo: {
    fontSize: 14,
    color: '#8B6A5D',
    marginTop: 4,
  },
  errorcaja: {
    backgroundColor: '#F8DDE7',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#C97C8E',
    alignItems: 'center',
  },
  errorTextoContenido: {
    color: '#7A3E48',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 10,
  },
  botonriintentar: {
    backgroundColor: '#5B3A2D',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  botontexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  lista: {
    paddingBottom: 24,
  },
  vacio: {
    color: '#8B6A5D',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1DDD6',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },
  iconoCaja: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#F8DDE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  icono: {
    fontSize: 24,
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5B3A2D',
    marginBottom: 2,
  },
  descripcion: {
    fontSize: 13,
    color: '#8B6A5D',
    marginBottom: 6,
  },
  precio: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C97C8E',
    marginBottom: 4,
  },
  enlace: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#5B3A2D',
  },
  botonActualizar: {
    backgroundColor: '#5B3A2D',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});