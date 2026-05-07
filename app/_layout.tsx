import { Stack } from "expo-router";
import { useEffect } from "react";
import { inicializarBancoDeDados } from "../src/database/Database";

export default function Layout() {
  useEffect(() => {
    inicializarBancoDeDados();
  }, []);

  return <Stack />;
}