import React from "react";

import {AuthProvider} from "../app/src/context/AuthContext"

import {Slot} from "expo-router"

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot/>
    </AuthProvider>
  )
}
