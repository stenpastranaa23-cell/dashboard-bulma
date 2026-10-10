import 'bulma/css/bulma.min.css';
import './style.css';
import Chart from 'chart.js/auto';

// =====================================================================
// ICONOS (SVG en linea, se insertan donde hay <i data-icon="...">)
// =====================================================================
const iconos = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    chart: '<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20"/>',
    box: '<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    users: '<path d="M16 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1"/><circle cx="9.5" cy="8" r="3.5"/><path d="M21 20v-1a4 4 0 0 0-3-3.9M16 4.2a3.5 3.5 0 0 1 0 6.6"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
    dollar: '<path d="M12 2v20M17 6.5C16 5 14.2 4.5 12 4.5c-2.8 0-4.5 1.3-4.5 3.3 0 4.5 9 2.2 9 6.7 0 2-1.9 3.3-4.5 3.3-2.3 0-4.2-.7-5.2-2.3"/>',
    bag: '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/>',
    alert: '<path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
};
document.querySelectorAll('i[data-icon]').forEach((el) => {
    el.innerHTML = `<svg viewBox="0 0 24 24">${iconos[el.dataset.icon] ?? ''}</svg>`;
});

// =====================================================================
// DATOS (simulados)
// =====================================================================
const transacciones = [
    { id: 'TX-1042', cliente: 'Distribuidora Maya', fecha: '08 oct 2026', monto: 18450, estado: 'Completada', color: '#6c5ce7' },
    { id: 'TX-1041', cliente: 'Café Marcala S.A.', fecha: '08 oct 2026', monto: 7200, estado: 'Pendiente', color: '#00b894' },
    { id: 'TX-1040', cliente: 'Ferretería El Sol', fecha: '07 oct 2026', monto: 3150, estado: 'Completada', color: '#f0a30a' },
    { id: 'TX-1039', cliente: 'Hotel Bahía', fecha: '07 oct 2026', monto: 25800, estado: 'Completada', color: '#0984e3' },
    { id: 'TX-1038', cliente: 'Importadora Lenca', fecha: '06 oct 2026', monto: 9600, estado: 'Rechazada', color: '#e5484d' },
    { id: 'TX-1037', cliente: 'Supermercado La Ceiba', fecha: '06 oct 2026', monto: 14300, estado: 'Pendiente', color: '#e17055' },
    { id: 'TX-1036', cliente: 'Textiles Sula', fecha: '05 oct 2026', monto: 5400, estado: 'Completada', color: '#a29bfe' },
    { id: 'TX-1035', cliente: 'Agro Olancho', fecha: '05 oct 2026', monto: 11900, estado: 'Completada', color: '#00cec9' },
];

const inventario = [
    { producto: 'Café 1 lb', stock: 82, color: '#00b894' },
    { producto: 'Cacao premium', stock: 45, color: '#6c5ce7' },
    { producto: 'Miel de abeja', stock: 22, color: '#f0a30a' },
    { producto: 'Tabaco artesanal', stock: 9, color: '#e5484d' },
];

const actividad = [
    ['Admin aprobó la transacción TX-1042', 'hace 5 min', '#00b894'],
    ['Nuevo pedido de Hotel Bahía', 'hace 32 min', '#6c5ce7'],
    ['Stock bajo: Tabaco artesanal', 'hace 1 h', '#f0a30a'],
    ['TX-1038 rechazada: fondos insuficientes', 'hace 3 h', '#e5484d'],
    ['Reporte mensual generado', 'ayer', '#0984e3'],
];

const claseEstado = { Completada: 'ok', Pendiente: 'pe', Rechazada: 're' };
const lempiras = (n) => 'L ' + n.toLocaleString('es-HN');
const iniciales = (nombre) => nombre.split(' ').slice(0, 2).map((p) => p[0]).join('').toUpperCase();

// =====================================================================
// MENU LATERAL en movil (burger + fondo oscuro)
// =====================================================================
const sidebar = document.getElementById('sidebar');
const scrim = document.getElementById('scrim');
const burger = document.getElementById('burger');
function alternarMenu(abrir) {
    sidebar.classList.toggle('is-open', abrir);
    scrim.classList.toggle('is-open', abrir);
    burger.classList.toggle('is-active', abrir);
    burger.setAttribute('aria-expanded', abrir);
}
burger.addEventListener('click', () => alternarMenu(!sidebar.classList.contains('is-open')));
scrim.addEventListener('click', () => alternarMenu(false));
document.querySelectorAll('.side-link').forEach((a) => {
    a.addEventListener('click', () => {
        document.querySelectorAll('.side-link').forEach((l) => l.classList.remove('is-active'));
        a.classList.add('is-active');
        alternarMenu(false);
    });
});

// =====================================================================
// KPIs con animacion de conteo
// =====================================================================
function contar(el, hasta, formato) {
    const dur = 900;
    const ini = performance.now();
    (function paso(t) {
        const p = Math.min((t - ini) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = formato(Math.round(hasta * ease));
        if (p < 1) requestAnimationFrame(paso);
    })(ini);
}
const completadas = transacciones.filter((t) => t.estado === 'Completada');
const pendientes = transacciones.filter((t) => t.estado === 'Pendiente').length;
contar(document.getElementById('kpiVentas'), completadas.reduce((s, t) => s + t.monto, 0) * 12, lempiras);
contar(document.getElementById('kpiPedidos'), transacciones.length * 41, String);
contar(document.getElementById('kpiPendientes'), pendientes, String);
document.getElementById('kpiPendientes2').textContent = pendientes;
document.getElementById('fecha').textContent = new Date().toLocaleDateString('es-HN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
});

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
    document.getElementById('contador').textContent = `${filas.length} de ${transacciones.length} registros`;
    tbody.innerHTML = filas.length
        ? filas.map((t) => `<tr>
            <td class="id">${t.id}</td>
            <td><div class="cliente"><span class="avatar" style="--c:${t.color}">${iniciales(t.cliente)}</span>${t.cliente}</div></td>
            <td>${t.fecha}</td>
            <td class="has-text-right"><strong>${lempiras(t.monto)}</strong></td>
            <td><span class="estado ${claseEstado[t.estado]}">${t.estado}</span></td>
        </tr>`).join('')
        : '<tr><td colspan="5" class="has-text-centered has-text-grey py-6">Sin resultados</td></tr>';
}
document.querySelectorAll('#filtros button').forEach((b) => {
    b.addEventListener('click', () => {
        document.querySelectorAll('#filtros button').forEach((x) => x.classList.remove('is-active'));
        b.classList.add('is-active');
        filtroActual = b.dataset.filtro;
        pintarTabla();
    });
});
document.getElementById('buscador').addEventListener('input', (e) => {
    textoBusqueda = e.target.value.toLowerCase();
    pintarTabla();
});
pintarTabla();

// =====================================================================
// INVENTARIO y ACTIVIDAD
// =====================================================================
document.getElementById('listaInventario').innerHTML = inventario.map((i) => `
    <div class="inv">
        <div class="inv-top">${i.producto}<span>${i.stock}%</span></div>
        <div class="bar"><i style="width:${i.stock}%;background:${i.color}"></i></div>
    </div>`).join('');

document.getElementById('listaActividad').innerHTML = actividad.map(([texto, cuando, color]) => `
    <li style="--c:${color}">${texto}<small>${cuando}</small></li>`).join('');

// =====================================================================
// GRAFICOS (Chart.js)
// =====================================================================
Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
Chart.defaults.color = '#7a7a95';

const morado = '#5b4bd6';
const verde = '#00c9a7';

// mini grafico (sparkline) dentro de cada KPI
function spark(id, datos, color) {
    const canvas = document.getElementById(id);
    const g = canvas.getContext('2d').createLinearGradient(0, 0, 0, 38);
    g.addColorStop(0, color + '55');
    g.addColorStop(1, color + '00');
    new Chart(canvas, {
        type: 'line',
        data: { labels: datos.map((_, i) => i), datasets: [{ data: datos, borderColor: color, backgroundColor: g, fill: true, tension: 0.4, borderWidth: 2, pointRadius: 0 }] },
        options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false }, y: { display: false } } },
    });
}
spark('spark1', [12, 14, 13, 17, 16, 20, 19, 24], '#6c5ce7');
spark('spark2', [30, 28, 34, 33, 38, 36, 42, 45], '#00b894');
spark('spark3', [4, 6, 3, 5, 2, 4, 3, 2], '#f0a30a');
spark('spark4', [1.2, 1.0, 1.1, 0.9, 1.0, 0.7, 0.9, 0.8], '#e5484d');

// grafico principal de ventas con degradado y selector 6M / 12M
const ventas = {
    12: { l: ['Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct'], d: [140, 168, 152, 160, 171, 176, 182, 205, 198, 236, 251, 274] },
};
ventas[6] = { l: ventas[12].l.slice(6), d: ventas[12].d.slice(6) };

const canvasVentas = document.getElementById('graficoVentas');
const gradVentas = canvasVentas.getContext('2d').createLinearGradient(0, 0, 0, 290);
gradVentas.addColorStop(0, 'rgba(91, 75, 214, .28)');
gradVentas.addColorStop(1, 'rgba(91, 75, 214, 0)');

const grafVentas = new Chart(canvasVentas, {
    type: 'line',
    data: {
        labels: ventas[6].l,
        datasets: [{
            label: 'Ventas (miles de L)', data: ventas[6].d, borderColor: morado, backgroundColor: gradVentas, fill: true,
            tension: 0.4, borderWidth: 3, pointRadius: 0, pointHoverRadius: 6, pointHoverBackgroundColor: '#fff', pointHoverBorderColor: morado, pointHoverBorderWidth: 3,
        }],
    },
    options: {
        responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: { display: false },
            tooltip: { backgroundColor: '#1c1b33', padding: 12, cornerRadius: 10, displayColors: false, callbacks: { label: (c) => ' L ' + c.parsed.y + ',000' } },
        },
        scales: {
            x: { grid: { display: false }, border: { display: false } },
            y: { grid: { color: '#ececf4', drawTicks: false }, border: { display: false }, ticks: { padding: 10, callback: (v) => v + 'k' } },
        },
    },
});
document.querySelectorAll('#periodo button').forEach((b) => {
    b.addEventListener('click', () => {
        document.querySelectorAll('#periodo button').forEach((x) => x.classList.remove('is-active'));
        b.classList.add('is-active');
        const v = ventas[b.dataset.p];
        grafVentas.data.labels = v.l;
        grafVentas.data.datasets[0].data = v.d;
        grafVentas.update();
    });
});

// dona de metodos de pago con leyenda propia
const pagos = [['Tarjeta', 52, morado], ['Transferencia', 33, verde], ['Efectivo', 15, '#ffc65c']];
new Chart(document.getElementById('graficoPagos'), {
    type: 'doughnut',
    data: { labels: pagos.map((p) => p[0]), datasets: [{ data: pagos.map((p) => p[1]), backgroundColor: pagos.map((p) => p[2]), borderWidth: 4, borderColor: '#fff', borderRadius: 8, hoverOffset: 6 }] },
    options: { responsive: true, maintainAspectRatio: false, cutout: '72%', plugins: { legend: { display: false } } },
});
document.getElementById('leyendaPagos').innerHTML = pagos.map(([n, v, c]) =>
    `<li><span class="sw" style="background:${c}"></span>${n}<b>${v}%</b></li>`).join('');

// anillo de la meta mensual
new Chart(document.getElementById('graficoMeta'), {
    type: 'doughnut',
    data: { datasets: [{ data: [78, 22], backgroundColor: [morado, '#f0f0f8'], borderWidth: 0, borderRadius: 10 }] },
    options: { responsive: true, maintainAspectRatio: false, cutout: '80%', rotation: 0, plugins: { legend: { display: false }, tooltip: { enabled: false } } },
});
