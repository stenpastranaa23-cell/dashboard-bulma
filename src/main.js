import 'bulma/css/bulma.min.css';
import './style.css';
import Chart from 'chart.js/auto';

// =====================================================================
// DATOS (simulados)
// =====================================================================
const transacciones = [
    { id: 'TX-1042', cliente: 'Distribuidora Maya', fecha: '2026-10-08', monto: 18450, estado: 'Completada' },
    { id: 'TX-1041', cliente: 'Café Marcala S.A.', fecha: '2026-10-08', monto: 7200, estado: 'Pendiente' },
    { id: 'TX-1040', cliente: 'Ferretería El Sol', fecha: '2026-10-07', monto: 3150, estado: 'Completada' },
    { id: 'TX-1039', cliente: 'Hotel Bahía', fecha: '2026-10-07', monto: 25800, estado: 'Completada' },
    { id: 'TX-1038', cliente: 'Importadora Lenca', fecha: '2026-10-06', monto: 9600, estado: 'Rechazada' },
    { id: 'TX-1037', cliente: 'Supermercado La Ceiba', fecha: '2026-10-06', monto: 14300, estado: 'Pendiente' },
    { id: 'TX-1036', cliente: 'Textiles Sula', fecha: '2026-10-05', monto: 5400, estado: 'Completada' },
    { id: 'TX-1035', cliente: 'Agro Olancho', fecha: '2026-10-05', monto: 11900, estado: 'Completada' },
];

const inventario = [
    { producto: 'Café 1 lb', stock: 82, color: 'is-success' },
    { producto: 'Cacao premium', stock: 45, color: 'is-info' },
    { producto: 'Miel de abeja', stock: 22, color: 'is-warning' },
    { producto: 'Tabaco artesanal', stock: 9, color: 'is-danger' },
];

const actividad = [
    ['Admin aprobó la transacción TX-1042', 'hace 5 min'],
    ['Nuevo pedido de Hotel Bahía', 'hace 32 min'],
    ['Stock bajo: Tabaco artesanal', 'hace 1 h'],
    ['TX-1038 rechazada por fondos insuficientes', 'hace 3 h'],
    ['Reporte mensual generado', 'ayer'],
];

const etiqueta = (estado) =>
    ({ Completada: 'is-success', Pendiente: 'is-warning', Rechazada: 'is-danger' }[estado]);

const lempiras = (n) => 'L ' + n.toLocaleString('es-HN');

// =====================================================================
// NAVBAR: boton burger (menu en movil)
// =====================================================================
document.querySelectorAll('.navbar-burger').forEach((burger) => {
    burger.addEventListener('click', () => {
        const menu = document.getElementById(burger.dataset.target);
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
        burger.setAttribute('aria-expanded', burger.classList.contains('is-active'));
    });
});

// =====================================================================
// KPIs
// =====================================================================
const completadas = transacciones.filter((t) => t.estado === 'Completada');
document.getElementById('kpiVentas').textContent = lempiras(
    completadas.reduce((s, t) => s + t.monto, 0) * 12
);
document.getElementById('kpiPedidos').textContent = String(transacciones.length * 41);
document.getElementById('kpiPendientes').textContent = String(
    transacciones.filter((t) => t.estado === 'Pendiente').length
);
document.getElementById('fecha').textContent = new Date().toLocaleDateString('es-HN');

// =====================================================================
// TABLA con filtros y buscador
// =====================================================================
let filtroActual = 'todas';
let textoBusqueda = '';
const tbody = document.getElementById('tablaTransacciones');

function pintarTabla() {
    const filas = transacciones.filter(
        (t) =>
            (filtroActual === 'todas' || t.estado === filtroActual) &&
            (t.cliente + t.id).toLowerCase().includes(textoBusqueda)
    );
    tbody.innerHTML = filas.length
        ? filas
              .map(
                  (t) => `<tr>
                    <td><strong>${t.id}</strong></td><td>${t.cliente}</td><td>${t.fecha}</td>
                    <td>${lempiras(t.monto)}</td>
                    <td><span class="tag ${etiqueta(t.estado)} is-light">${t.estado}</span></td>
                </tr>`
              )
              .join('')
        : '<tr><td colspan="5" class="has-text-centered has-text-grey">Sin resultados</td></tr>';
}

document.querySelectorAll('#filtros a').forEach((a) => {
    a.addEventListener('click', () => {
        document.querySelectorAll('#filtros li').forEach((li) => li.classList.remove('is-active'));
        a.parentElement.classList.add('is-active');
        filtroActual = a.dataset.filtro;
        pintarTabla();
    });
});
document.getElementById('buscador').addEventListener('input', (e) => {
    textoBusqueda = e.target.value.toLowerCase();
    pintarTabla();
});
pintarTabla();

// =====================================================================
// INVENTARIO (barras de progreso) y ACTIVIDAD
// =====================================================================
document.getElementById('listaInventario').innerHTML = inventario
    .map(
        (i) => `<p class="mb-1"><strong>${i.producto}</strong> <span class="is-pulled-right">${i.stock}%</span></p>
        <progress class="progress ${i.color} mb-4" value="${i.stock}" max="100">${i.stock}%</progress>`
    )
    .join('');

document.getElementById('listaActividad').innerHTML = actividad
    .map(
        ([texto, cuando]) => `<div class="media">
            <div class="media-content"><p>${texto}</p><p class="is-size-7 has-text-grey">${cuando}</p></div>
        </div><hr class="my-2" />`
    )
    .join('');

// =====================================================================
// GRAFICOS (Chart.js)
// =====================================================================
const morado = 'hsl(246, 62%, 48%)';
new Chart(document.getElementById('graficoVentas'), {
    type: 'line',
    data: {
        labels: ['May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct'],
        datasets: [{
            label: 'Ventas (L)',
            data: [182000, 205000, 198000, 236000, 251000, 274000],
            borderColor: morado,
            backgroundColor: 'hsla(246, 62%, 48%, .15)',
            fill: true,
            tension: 0.35,
        }],
    },
    options: { plugins: { legend: { display: false } } },
});

new Chart(document.getElementById('graficoPagos'), {
    type: 'doughnut',
    data: {
        labels: ['Tarjeta', 'Transferencia', 'Efectivo'],
        datasets: [{ data: [52, 33, 15], backgroundColor: [morado, '#00d1b2', '#ffe08a'] }],
    },
});
