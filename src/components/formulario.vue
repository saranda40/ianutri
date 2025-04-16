<template>
    <h1 class="text-2xl font-bold text-center mb-3">Formulario de Datos</h1>
    <form @submit.prevent="enviarFormulario" class="space-y-5 mt-4">
        <!-- Campo Nombre -->
        <div class="rounded-lg p-4">
            <div>
                <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    v-model="datos.nombre"
                    class="mt-1 p-2 border rounded-md w-full"
                />
            </div>
            <div class="mt-2">
                <label for="edad" class="block text-sm font-medium text-gray-700">Edad:</label>
                <input
                    type="number"
                    id="edad"
                    name="edad"
                    v-model.number="datos.edad"
                    class="mt-1 p-2 border rounded-md w-full"
                />
            </div>
            <div class="mt-2">
                <label for="peso" class="block text-sm font-medium text-gray-700">Peso:</label>
                <input
                    type="number"
                    id="peso"
                    name="peso"
                    v-model.number="datos.peso"
                    class="mt-1 p-2 border rounded-md w-full"
                />
            </div>
            <div class="mt-2">
                <label for="altura" class="block text-sm font-medium text-gray-700">Altura (CM ejemplo 168 cms):</label>
                <input
                    type="number"
                    id="altura"
                    name="altura"
                    v-model.number="datos.altura"
                    class="mt-1 p-2 border rounded-md w-full"
                />
            </div>
            <div class="mt-2">
                <label class="block text-sm font-medium text-gray-700">Género:</label>
                <div class="mt-1 space-x-4">
                    <label for="genero-masculino" class="inline-flex items-center">
                        <input
                            type="radio"
                            id="genero-masculino"
                            name="genero"
                            value="masculino"
                            v-model="datos.genero"
                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <span class="ml-2 text-sm text-gray-700">Masculino</span>
                    </label>
                    <label for="genero-femenino" class="inline-flex items-center">
                        <input
                            type="radio"
                            id="genero-femenino"
                            name="genero"
                            value="femenino"
                            v-model="datos.genero"
                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <span class="ml-2 text-sm text-gray-700">Femenino</span>
                    </label>
                </div>
            </div>
            <div class="mt-2">
                <label for="enfermedades" class="block text-sm font-medium text-gray-700">Enfermedad Preexistente (diabetes, hipertension, etc.)</label>
                <input
                    type="text"
                    id="enfermedades"
                    name="enfermedades"
                    v-model.number="datos.enfermedades"
                    class="mt-1 p-2 border rounded-md w-full"
                />
            </div>
            <div class="mt-2">
                    <input
                        type="checkbox"
                        id="tratamiento"
                        name="tratamiento"
                        v-model="datos.tratamiento"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <span class="ml-2 text-sm text-gray-700">Estoy en tratamiento por estas enfermedades</span>

            </div>
            <div class="mt-2">
                <label for="email" class="block text-sm font-medium text-gray-700">Enviar resultados a su Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    v-model="datos.email"
                    class="mt-1 p-2 border rounded-md w-full"
                />
            </div>
            <div class="mt-2">
                <button
                    type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    Procesar
                </button>
            </div>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';

// Datos del formulario
const datos = ref({
    nombre: '',
    edad: null,
    peso: null,
    altura: null,
    genero: '',
    enfermedades: '',
    tratamiento: false,
    email: ''
});

// Función para enviar el formulario
async function enviarFormulario() {
  try {

    if (!datos.value.nombre || !datos.value.edad || !datos.value.peso || !datos.value.altura || !datos.value.genero || !datos.value.email) 
    {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const response = await fetch('/api/validar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos.value)
    });

    if (response.ok) {
        const resultado = await response.json();
        // Redirigir con los parámetros de consulta en la URL
        window.location.href = resultado.redirectTo;
        return;
    } else {
        alert('Ocurrió un error al enviar los datos');
    }

  } catch (error) {
    console.error('Error al enviar los datos:', error);
    alert('Ocurrió un error inesperado.');
  }
}

</script>