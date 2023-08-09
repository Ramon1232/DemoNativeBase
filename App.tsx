import React from "react";
import { NativeBaseProvider, Box } from "native-base";
import 'react-native-gesture-handler';
import RootNavigator from "./src/Navigation/RootNavigator";

export default function App() {
  return (
    <NativeBaseProvider>
        <RootNavigator />
    </NativeBaseProvider>
  );
}