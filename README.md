# Parkin-AI
<br>
<img width="1579" height="825" alt="2025-10-02 16 48 25 (2)" src="https://github.com/user-attachments/assets/6a8518fe-1d4d-4e67-8241-a2ce6357ca5a" />
<br>
<img width="1593" height="796" alt="2025-10-02 16 48 25 (3)" src="https://github.com/user-attachments/assets/ed79399a-0df3-4df0-a8b3-6c14430aeb82" />
<br>
<img width="1565" height="810" alt="2025-10-02 16 48 25 (4)" src="https://github.com/user-attachments/assets/05d4030a-9ab0-4369-8c5a-ffcf37e2f0a8" />
<br>
<img width="1580" height="803" alt="2025-10-02 16 48 25 (5)" src="https://github.com/user-attachments/assets/2c10fc82-5ac9-46bc-9766-7cb87eda391f" />
<br>
<br>

📌 Descripción
Parkinson-Diagnosis-AI es una aplicación web desarrollada con React que utiliza inteligencia artificial para diagnosticar las etapas del Parkinson (inicial, baja, media, avanzada) a partir de síntomas reportados por el usuario. La aplicación permite registrar diagnósticos en un historial, visualizar la progresión de la enfermedad mediante gráficas exponenciales, y exportar los datos para seguimiento médico.
Con una interfaz intuitiva y centrada en el usuario, esta herramienta está diseñada para apoyar a pacientes, cuidadores y profesionales de la salud en el monitoreo y manejo de la enfermedad.

✨ Características Principales
CaracterísticaDescripciónDiagnóstico por etapasClasifica los síntomas en etapas de Parkinson (inicial, baja, media, avanzada).Integración con OpenAIUtiliza la API de OpenAI para analizar síntomas y generar diagnósticos precisos.Historial de diagnósticosGuarda cada diagnóstico en un historial para seguimiento a largo plazo.Gráficas exponencialesVisualiza la progresión de la enfermedad con gráficas interactivas (usando Chart.js o D3.js).Exportación de datosPermite exportar el historial y gráficas a PDF o CSV para compartir con médicos.Interfaz con ReactDiseño responsivo y accesible, con componentes reutilizables y gestión de estado con hooks.

🔧 Tecnologías Utilizadas
TecnologíaDescripciónReactBiblioteca para construir interfaces de usuario dinámicas y escalables.OpenAI APIModelo de lenguaje para analizar síntomas y diagnosticar etapas de Parkinson.Chart.jsBiblioteca para generar gráficas interactivas de progresión exponencial.AxiosBiblioteca para realizar llamadas HTTP a la API de OpenAI.PDF-LibBiblioteca para exportar informes y gráficas a formato PDF.React RouterManejo de rutas para navegación entre secciones (diagnóstico, historial, gráficas).

Aquí tienes una descripción técnica y profesional para tu aplicación en React que utiliza una API key de OpenAI para diagnosticar las etapas del Parkinson, guardar el historial y graficar la progresión con una línea exponencial:

Parkinson-Diagnosis-AI
Sistema de Diagnóstico y Seguimiento de Parkinson con React e IA

📌 Descripción
Parkinson-Diagnosis-AI es una aplicación web desarrollada con React que utiliza inteligencia artificial para diagnosticar las etapas del Parkinson (inicial, baja, media, avanzada) a partir de síntomas reportados por el usuario. La aplicación permite registrar diagnósticos en un historial, visualizar la progresión de la enfermedad mediante gráficas exponenciales, y exportar los datos para seguimiento médico.
Con una interfaz intuitiva y centrada en el usuario, esta herramienta está diseñada para apoyar a pacientes, cuidadores y profesionales de la salud en el monitoreo y manejo de la enfermedad.

✨ Características Principales
CaracterísticaDescripciónDiagnóstico por etapasClasifica los síntomas en etapas de Parkinson (inicial, baja, media, avanzada).Integración con OpenAIUtiliza la API de OpenAI para analizar síntomas y generar diagnósticos precisos.Historial de diagnósticosGuarda cada diagnóstico en un historial para seguimiento a largo plazo.Gráficas exponencialesVisualiza la progresión de la enfermedad con gráficas interactivas (usando Chart.js o D3.js).Exportación de datosPermite exportar el historial y gráficas a PDF o CSV para compartir con médicos.Interfaz con ReactDiseño responsivo y accesible, con componentes reutilizables y gestión de estado con hooks.

🔧 Tecnologías Utilizadas
TecnologíaDescripciónReactBiblioteca para construir interfaces de usuario dinámicas y escalables.OpenAI APIModelo de lenguaje para analizar síntomas y diagnosticar etapas de Parkinson.Chart.jsBiblioteca para generar gráficas interactivas de progresión exponencial.AxiosBiblioteca para realizar llamadas HTTP a la API de OpenAI.PDF-LibBiblioteca para exportar informes y gráficas a formato PDF.React RouterManejo de rutas para navegación entre secciones (diagnóstico, historial, gráficas).

📂 Estructura del Proyecto

<img width="676" height="296" alt="image" src="https://github.com/user-attachments/assets/199ba5d7-4be4-45bd-8157-bf89dbd037a5" />


⚙️ Instalación y Configuración
1. Requisitos previos

Node.js (v18 o superior)
Cuenta en OpenAI para obtener una API key

2. Clonar el repositorio
 Copygit clone https://github.com/Santiavila573/parkin.git
cd parkinson-diagnosis-ai/client
3. Instalar dependencias
 Copynpm install
4. Configurar la API key
Crea un archivo .env en la raíz del proyecto client/ y agrega tu API key de OpenAI:
 CopyREACT_APP_OPENAI_API_KEY=tu_api_key_aqui
5. Ejecutar la aplicación
 Copynpm start

La aplicación estará disponible en http://localhost:3000.


🎯 Funcionalidades Clave

Diagnóstico de etapas: El usuario responde un cuestionario de síntomas, y la IA clasifica la etapa del Parkinson.
Historial de diagnósticos: Cada diagnóstico se guarda con fecha y síntomas reportados.
Gráficas de progresión: Visualiza la evolución de la enfermedad con una línea exponencial, usando datos del historial.
Exportación de datos: Genera informes en PDF o CSV con el historial y gráficas para compartir con médicos.
Interfaz accesible: Diseño claro y fácil de usar, con opciones para ajustar el tamaño de texto y contraste.


📊 Ejemplo de Uso

Responder cuestionario: El usuario ingresa sus síntomas (temblor, rigidez, problemas de equilibrio, etc.).
Obtener diagnóstico: La IA analiza los síntomas y devuelve la etapa del Parkinson.
Guardar en historial: El diagnóstico se registra automáticamente con fecha y hora.
Visualizar gráfica: La aplicación muestra la progresión de la enfermedad en una gráfica exponencial.
Exportar informe: El usuario puede descargar el historial y la gráfica en PDF para revisión médica.


📈 Implementación de la Gráfica Exponencial
Para graficar la progresión del Parkinson, se utiliza Chart.js o D3.js. Aquí tienes un ejemplo de cómo implementar una gráfica exponencial con Chart.js:
 Copyimport { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const GraficaProgresion = ({ historial }) => {
  // Procesar datos del historial para la gráfica
  const fechas = historial.map(item => item.fecha);
  const etapas = historial.map(item => {
    // Asignar un valor numérico a cada etapa (ej: inicial=1, baja=2, media=3, avanzada=4)
    const etapaValor = { inicial: 1, baja: 2, media: 3, avanzada: 4 };
    return etapaValor[item.etapa];
  });

  const data = {
    labels: fechas,
    datasets: [
      {
        label: 'Progresión de Parkinson',
        data: etapas,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.3,
        fill: false,
        borderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        type: 'logarithmic', // Para simular una escala exponencial
        title: { display: true, text: 'Etapa de Parkinson' },
      },
      x: {
        title: { display: true, text: 'Fecha de Diagnóstico' },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default GraficaProgresion;

📝 Contribuciones
¡Las contribuciones son bienvenidas! Para colaborar:

Abrir un issue con la propuesta.
Crear un fork del repositorio.
Enviar un pull request con los cambios.


📜 Licencia
Este proyecto está bajo la licencia Apache 2.0. Consulta el archivo LICENSE para más detalles.

📬 Contacto

Autor: Santiago Avila
<br>
Correo: avilasantiago917@ngmail.com
<br>
Linkedin: https://www.linkedin.com/in/santiago-ávila-301047200



Abre un issue para discutir tu propuesta.
Haz un fork del repositorio.
Envía un pull request con tus cambios.
