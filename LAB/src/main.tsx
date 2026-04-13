import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.tsx'
import HolaMundo from './Hola.tsx';
import App from "./App";

import '../classes/arrays.ts'
import '../classes/strings.ts'
import '../classes/objeto.ts'
import '../classes/funciones.ts'
import Perfil from './mood.js';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HolaMundo />
    <Perfil />
    <App />
  </StrictMode>
);