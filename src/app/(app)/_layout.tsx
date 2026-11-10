import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#FF5722" },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Moto Yela" }} />
      <Stack.Screen name="formulario" options={{ title: "Registro de Mantenimiento" }} />
      <Stack.Screen name="resultado" options={{ title: "Resultado" }} />
      <Stack.Screen name="registros" options={{ title: "Historial de Servicios" }} />
      <Stack.Screen name="imagenes" options={{ title: "Galería" }} />
      <Stack.Screen name="contacto" options={{ title: "Contacto" }} />
       <Stack.Screen name="catalogo" options={{ title: "Catalogo" }} />
        <Stack.Screen name="Escanear" options={{ title: "Escanear" }} />
         <Stack.Screen name="Detalle" options={{ title: "Detalle" }} />
    </Stack>
  );
}