import './style.css'
import { productos } from './datos.js'

// Elemento donde se dibujan las tarjetas (lo creas en el Ejercicio 1)
const catalogo = document.getElementById('catalogo')

// ------------------------------------------------------------
// EJERCICIO 2 — mostrarProductos(lista)
// Convierte una lista de productos en tarjetas HTML y las pone en la página.
// Forma general:
//   catalogo.innerHTML = lista.map(p => `
//     <article class="...las mismas clases de tu Ejercicio 1...">
//       <h3>${p.nombre}</h3>
//       ...
//       <button data-id="${p.id}">Agregar</button>
//     </article>
//   `).join('')
// ------------------------------------------------------------
function mostrarProductos(lista) {
    catalogo.innerHTML = lista.map(p => `
        <article class="bg-white rounded-lg shadow p-4">
            <h3 class="text-xl font-bold text-blue-800">${p.nombre}</h3>
            <p>$${p.precio}</p>
            <button class="bg-blue-600 text-white p-2 hover:bg-blue-700" data-id="${p.id}">Agregar</button>
        </article>
    `).join('')
}

mostrarProductos(productos)

// ------------------------------------------------------------
// EJERCICIO 3 — Armar el pedido
// El pedido es un arreglo con los productos que la persona va agregando.
// Pasos (detalle en el README):
//   1. Escucha el clic en el contenedor #catalogo (delegación de eventos).
//   2. Busca el producto por id con .find() y agrégalo con .push().
//   3. Dibuja el pedido con mostrarPedido() y calcula el total con .reduce().
//   4. Botón "Vaciar pedido".
// ------------------------------------------------------------
const pedido = []
const listaPedido = document.getElementById('lista-pedido')
const total = document.getElementById('total')
const btnVaciar = document.getElementById('btn-vaciar')
catalogo.addEventListener('click', (evento) => {
    const boton = evento.target.closest('button[data-id]')
    if (!boton) return
    const id = Number(boton.dataset.id)
    const producto = productos.find(p => p.id === id)
    pedido.push(producto)
    mostrarPedido()
})


// Escribe aquí tu código del Ejercicio 3
function mostrarPedido() {
    listaPedido.innerHTML = pedido.map(p => `
        <li>${p.nombre} - $${p.precio}</li>
    `).join('')
    const totalPedido = pedido.reduce((suma, p) => suma + p.precio, 0)
    total.textContent = totalPedido
}

btnVaciar.addEventListener('click', () => {
    pedido.length = 0
    mostrarPedido()
})
// ------------------------------------------------------------
// EJERCICIO 4 — Filtrar por categoría
// Botones de categoría que llamen a mostrarProductos() con
// productos.filter(...). El botón "Todos" muestra la lista completa.
// ------------------------------------------------------------

// Escribe aquí tu código del Ejercicio 4
const botonesCategoria = document.querySelectorAll('[data-categoria]')

botonesCategoria.forEach(boton => {
  boton.addEventListener('click', () => {
    const categoria = boton.dataset.categoria
    if (categoria === 'Todas') {
      mostrarProductos(productos)
    } else {
      const filtrados = productos.filter(p => p.categoria === categoria)
      mostrarProductos(filtrados)
    }
    botonesCategoria.forEach(b => {
      b.classList.remove('bg-blue-600', 'text-white')
      b.classList.add('bg-white', 'text-blue-800')
    })
    boton.classList.remove('bg-white', 'text-blue-800')
    boton.classList.add('bg-blue-600', 'text-white')
  })
})
  //Ejercicio 5
const formulario = document.querySelector('#form-cliente')

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault()

  const nombre = document.querySelector('#nombre')
  const telefono = document.querySelector('#telefono')
  const correo = document.querySelector('#correo')
  const errorNombre = document.querySelector('#error-nombre')
  const errorTelefono = document.querySelector('#error-telefono')
  const errorCorreo = document.querySelector('#error-correo')
  const errorPedido = document.querySelector('#error-pedido')

  let esValido = true

  if (nombre.value.trim() === '') {
    errorNombre.textContent = 'El nombre no puede estar vacío ni ser solo espacios'
    errorNombre.classList.remove('hidden')
    nombre.classList.add('border-red-600')
    esValido = false
  } else {
    errorNombre.classList.add('hidden')
    nombre.classList.remove('border-red-600')
  }

  if (!/^\d{10}$/.test(telefono.value)) {
    errorTelefono.textContent = 'El teléfono debe tener 10 dígitos'
    errorTelefono.classList.remove('hidden')
    telefono.classList.add('border-red-600')
    esValido = false
  } else {
    errorTelefono.classList.add('hidden')
    telefono.classList.remove('border-red-600')
  }

  if (!/^\S+@\S+\.\S+$/.test(correo.value)) {
    errorCorreo.textContent = 'La forma del correo debe ser algo@algo.algo'
    errorCorreo.classList.remove('hidden')
    correo.classList.add('border-red-600')
    esValido = false
  } else {
    errorCorreo.classList.add('hidden')
    correo.classList.remove('border-red-600')
  }

  if (pedido.length === 0) {
    errorPedido.textContent = 'El pedido no puede estar vacío.'
    errorPedido.classList.remove('hidden')
    esValido = false
  } else {
    errorPedido.classList.add('hidden')
  }
  if (!esValido) {
    return
  }

    pedidosRegistrados.push({
    id: Date.now(),
    nombre: nombre.value.trim(),
    telefono: telefono.value.trim(),
    correo: correo.value.trim(),
    productos: [...pedido],
    total: pedido.reduce((suma, p) => suma + p.precio, 0),
    estado: 'Pendiente'
  })

  pedido.length = 0
  mostrarPedido()
  formulario.reset()
  mostrarPedidosRegistrados()  
  })  

  const contenedorPedidosRegistrados = document.querySelector('#pedidos-registrados')

   function mostrarPedidosRegistrados() {
   contenedorPedidosRegistrados.innerHTML = pedidosRegistrados.map(p => `
     <article class="border rounded-lg p-4 ${COLORES[p.estado]}">
      <h3 class="font-bold">${p.nombre}</h3>
      <ul>
        ${p.productos.map(prod => `<li>${prod.nombre} - $${prod.precio}</li>`).join('')}
      </ul>
      <p class="font-bold mt-2">Total: $${p.total}</p>
        <p>Estado: ${p.estado}</p>
        ${p.estado !== 'Entregado' ? `<button data-avanzar="${p.id}" class="bg-blue-600 text-white p-2 mt-2">Avanzar estado</button>` : ''}
     </article>
    `).join('')
}  

    contenedorPedidosRegistrados.addEventListener('click', (evento) => {
       const boton = evento.target.closest('button[data-avanzar]')
         if (!boton) return
       const id = Number(boton.dataset.avanzar)
       const pedidoRegistrado = pedidosRegistrados.find(p => p.id === id)
       const indiceActual = ESTADOS.indexOf(pedidoRegistrado.estado)
       pedidoRegistrado.estado = ESTADOS[indiceActual + 1]
       mostrarPedidosRegistrados()
     })

 //Ejercicio 6
const pedidosRegistrados = []
const ESTADOS = ['Pendiente', 'En preparación', 'Entregado']

const COLORES = {
  'Pendiente': 'bg-yellow-100 border-yellow-400',
  'En preparación': 'bg-blue-100 border-blue-400',
  'Entregado': 'bg-green-100 border-green-400'
}