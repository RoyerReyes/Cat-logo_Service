/**
 * CATÁLOGO DE SERVICIOS - GOOGLE CLOUD OPS
 * Versión simplificada y funcional
 */

// Datos de servicios
const servicesData = {
    compute: {
        title: 'Compute Engine',
        description: 'Máquinas virtuales escalables en la nube',
        icon: './assets/icons/compute.svg',
        status: 'Operativo',
        features: [
            'Escalabilidad automática',
            'SLA 99.99%',
            'Múltiples regiones'
        ]
    },
    kubernetes: {
        title: 'Kubernetes Engine',
        description: 'Orquestación de contenedores',
        icon: './assets/icons/kubernetes.svg',
        status: 'Operativo',
        features: [
            'Gestión automatizada',
            'Alta disponibilidad',
            'Integración CI/CD'
        ]
    },
    sql: {
        title: 'Cloud SQL',
        description: 'Bases de datos administradas',
        icon: './assets/icons/database.svg',
        status: 'Operativo',
        features: [
            'MySQL y PostgreSQL',
            'Backups automáticos',
            'Replicación'
        ]
    },
    storage: {
        title: 'Cloud Storage',
        description: 'Almacenamiento de objetos',
        icon: './assets/icons/storage.svg',
        status: 'Operativo',
        features: [
            'Almacenamiento ilimitado',
            'CDN integrado',
            'Control de versiones'
        ]
    },
    iam: {
        title: 'IAM',
        description: 'Gestión de identidad y acceso',
        icon: './assets/icons/security.svg',
        status: 'Operativo',
        features: [
            'Control de permisos',
            'Auditoría completa',
            'MFA integrado'
        ]
    }
};

// Sistema de almacenamiento
class TicketStorage {
    constructor() {
        this.key = 'cloudTickets';
    }

    getAll() {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : [];
    }

    add(ticket) {
        const tickets = this.getAll();
        ticket.id = 'TICKET-' + Date.now();
        ticket.fecha = new Date().toLocaleDateString('es-ES');
        ticket.estado = 'Abierto';
        tickets.push(ticket);
        localStorage.setItem(this.key, JSON.stringify(tickets));
        return ticket;
    }

    delete(id) {
        const tickets = this.getAll().filter(t => t.id !== id);
        localStorage.setItem(this.key, JSON.stringify(tickets));
    }

    getByPriority(priority) {
        return this.getAll().filter(t => t.priority === priority.toUpperCase());
    }
}

const ticketStorage = new TicketStorage();

// Notificaciones
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
}

// Mostrar servicio
function showService(type) {
    const container = document.getElementById('dynamicContent');

    // Limpiar activos
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });

    // Marcar activo
    const activeItem = document.querySelector(`[data-service="${type}"]`);
    if (activeItem) activeItem.classList.add('active');

    // Renderizar contenido
    if (servicesData[type]) {
        renderService(container, servicesData[type]);
    } else if (type === 'ticket') {
        renderTicketForm(container);
    } else if (type === 'mis') {
        renderMyTickets(container);
    } else if (type === 'p1') {
        renderP1Tickets(container);
    } else if (type === 'status') {
        renderStatus(container);
    }
}

function renderService(container, service) {
    container.innerHTML = `
        <div class="card fade-in">
            <div class="card-icon">
                <img src="${service.icon}" alt="${service.title}">
            </div>
            <h2>${service.title}</h2>
            <p>${service.description}</p>
            <p class="status">${service.status}</p>
            <h3>Características:</h3>
            <ul>
                ${service.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
        </div>
    `;
}

function renderTicketForm(container) {
    container.innerHTML = `
        <div class="card fade-in">
            <h2>Crear Incidente</h2>
            <form id="ticketForm">
                <div class="form-group">
                    <label>Título *</label>
                    <input type="text" id="title" required>
                </div>
                <div class="form-group">
                    <label>Servicio *</label>
                    <select id="service" required>
                        <option value="">Seleccione...</option>
                        <option>Compute Engine</option>
                        <option>Kubernetes</option>
                        <option>Cloud SQL</option>
                        <option>Cloud Storage</option>
                        <option>IAM</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Prioridad *</label>
                    <select id="priority" required>
                        <option value="">Seleccione...</option>
                        <option value="P1">P1 - Crítico</option>
                        <option value="P2">P2 - Alto</option>
                        <option value="P3">P3 - Normal</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Descripción *</label>
                    <textarea id="description" required></textarea>
                </div>
                <div class="form-group">
                    <label>Email *</label>
                    <input type="email" id="email" required>
                </div>
                <button type="submit" class="btn btn-success">Crear Incidente</button>
            </form>
        </div>
    `;

    document.getElementById('ticketForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const ticket = {
            title: document.getElementById('title').value,
            service: document.getElementById('service').value,
            priority: document.getElementById('priority').value,
            description: document.getElementById('description').value,
            email: document.getElementById('email').value
        };

        const saved = ticketStorage.add(ticket);
        showNotification(`Ticket ${saved.id} creado exitosamente`);

        setTimeout(() => showService('mis'), 1500);
    });
}

function renderMyTickets(container) {
    const tickets = ticketStorage.getAll();

    let html = '<div class="card fade-in"><h2>Mis Incidentes</h2>';

    if (tickets.length === 0) {
        html += '<p class="status info">No hay tickets registrados</p>';
        html += '<button class="btn" onclick="showService(\'ticket\')">Crear Ticket</button>';
    } else {
        html += `<table class="tickets-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Servicio</th>
                    <th>Prioridad</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>`;

        tickets.forEach(ticket => {
            html += `<tr>
                <td><strong>${ticket.id}</strong></td>
                <td>${ticket.title}</td>
                <td>${ticket.service}</td>
                <td><span class="priority-badge priority-${ticket.priority.toLowerCase()}">${ticket.priority}</span></td>
                <td>${ticket.estado}</td>
                <td>${ticket.fecha}</td>
                <td><button class="btn btn-danger" onclick="deleteTicket('${ticket.id}')">Eliminar</button></td>
            </tr>`;
        });

        html += '</tbody></table>';
    }

    html += '</div>';
    container.innerHTML = html;
}

function deleteTicket(id) {
    if (confirm('¿Eliminar este ticket?')) {
        ticketStorage.delete(id);
        showNotification('Ticket eliminado');
        showService('mis');
    }
}

function renderP1Tickets(container) {
    const p1 = ticketStorage.getByPriority('P1');

    let html = '<div class="card fade-in"><h2>Incidentes Críticos (P1)</h2>';

    if (p1.length === 0) {
        html += '<p class="status">✓ Sin incidentes críticos</p>';
    } else {
        html += `<p class="status critical">⚠ ${p1.length} incidente(s) crítico(s)</p>`;
        html += '<table class="tickets-table"><thead><tr><th>ID</th><th>Título</th><th>Fecha</th></tr></thead><tbody>';
        p1.forEach(t => {
            html += `<tr><td>${t.id}</td><td>${t.title}</td><td>${t.fecha}</td></tr>`;
        });
        html += '</tbody></table>';
    }

    html += '</div>';
    container.innerHTML = html;
}

function renderStatus(container) {
    const tickets = ticketStorage.getAll();
    const stats = {
        total: tickets.length,
        p1: ticketStorage.getByPriority('P1').length,
        p2: ticketStorage.getByPriority('P2').length,
        p3: ticketStorage.getByPriority('P3').length
    };

    container.innerHTML = `
        <div class="card fade-in">
            <h2>Dashboard de Estado</h2>

            <h3>Servicios</h3>
            <div class="stats-grid">
                ${Object.entries(servicesData).map(([key, service]) => `
                    <div class="stat-card">
                        <img src="${service.icon}" style="width:50px;height:50px;margin-bottom:10px;">
                        <h3>${service.title}</h3>
                        <div class="status">${service.status}</div>
                    </div>
                `).join('')}
            </div>

            <h3 style="margin-top:30px;">Estadísticas de Tickets</h3>
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>Total</h3>
                    <div class="stat-value">${stats.total}</div>
                </div>
                <div class="stat-card">
                    <h3>P1 Críticos</h3>
                    <div class="stat-value" style="color:#ea4335;">${stats.p1}</div>
                </div>
                <div class="stat-card">
                    <h3>P2 Altos</h3>
                    <div class="stat-value" style="color:#fbbc04;">${stats.p2}</div>
                </div>
                <div class="stat-card">
                    <h3>P3 Normales</h3>
                    <div class="stat-value" style="color:#34a853;">${stats.p3}</div>
                </div>
            </div>

            <p class="status" style="margin-top:30px;">Sistema 100% Operativo</p>
            <p style="color:#94a3b8;margin-top:10px;">Última actualización: ${new Date().toLocaleString('es-ES')}</p>
        </div>
    `;
}

// Sistema de favoritos
class FavoritesManager {
    constructor() {
        this.key = 'cloudFavorites';
    }

    getAll() {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : [];
    }

    toggle(serviceId) {
        const favorites = this.getAll();
        const index = favorites.indexOf(serviceId);

        if (index > -1) {
            favorites.splice(index, 1);
            showNotification('Eliminado de favoritos', 'info');
        } else {
            favorites.push(serviceId);
            showNotification('Agregado a favoritos', 'success');
        }

        localStorage.setItem(this.key, JSON.stringify(favorites));
        this.updateUI();
    }

    updateUI() {
        const favorites = this.getAll();
        const favSection = document.getElementById('favoritesSection');
        const favContainer = document.getElementById('favoritesContainer');

        if (!favSection || !favContainer) return;

        // Actualizar botones de favoritos
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            const serviceId = btn.getAttribute('data-service');
            if (favorites.includes(serviceId)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Mostrar sección de favoritos
        if (favorites.length > 0) {
            favSection.style.display = 'block';
            favContainer.innerHTML = favorites.map(id => {
                const service = servicesData[id];
                if (!service) return '';
                return `
                    <div class="menu-item" data-service="${id}">
                        <img src="${service.icon}" class="menu-icon" alt="${service.title}">
                        <span>${service.title}</span>
                    </div>
                `;
            }).join('');

            // Agregar event listeners a favoritos
            favContainer.querySelectorAll('.menu-item').forEach(item => {
                item.addEventListener('click', () => {
                    showService(item.getAttribute('data-service'));
                    closeSidebar();
                });
            });
        } else {
            favSection.style.display = 'none';
        }
    }
}

const favoritesManager = new FavoritesManager();

// Sistema de búsqueda
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const menuItems = document.querySelectorAll('.menu-item[data-service]');

        let visibleCount = 0;
        menuItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            const serviceId = item.getAttribute('data-service');
            const service = servicesData[serviceId];

            if (text.includes(term) || (service && service.description.toLowerCase().includes(term))) {
                item.style.display = '';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        if (term && visibleCount === 0) {
            showNotification('No se encontraron servicios', 'info');
        }
    });
}

// Actualizar breadcrumbs
function updateBreadcrumbs(serviceId) {
    const breadcrumbs = document.getElementById('breadcrumbs');
    if (!breadcrumbs) return;

    const service = servicesData[serviceId];

    if (!service) {
        breadcrumbs.innerHTML = '<span class="breadcrumb-item">Inicio</span>';
    } else {
        breadcrumbs.innerHTML = `
            <a href="#" class="breadcrumb-item" onclick="location.reload(); return false;">Inicio</a>
            <span class="breadcrumb-item">${service.title}</span>
        `;
    }
}

// Menú responsive
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const hamburger = document.getElementById('hamburger');

    if (sidebar) sidebar.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
    if (hamburger) hamburger.classList.toggle('active');
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const hamburger = document.getElementById('hamburger');

    if (sidebar) sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
}

// Modal de tickets
function setupModal() {
    const modal = document.getElementById('ticketModal');
    const closeBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelTicket');
    const form = document.getElementById('ticketForm');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const ticket = {
                title: document.getElementById('ticketTitle').value,
                service: document.getElementById('ticketService').value,
                priority: document.getElementById('ticketPriority').value,
                description: document.getElementById('ticketDescription').value,
                email: document.getElementById('ticketEmail').value
            };

            const saved = ticketStorage.add(ticket);
            showNotification(`Ticket ${saved.id} creado exitosamente`, 'success');
            closeModal();
            form.reset();

            // Actualizar contador
            updateTicketCount();

            setTimeout(() => showService('mis'), 1000);
        });
    }
}

function openModal() {
    const modal = document.getElementById('ticketModal');
    if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
    }
}

function closeModal() {
    const modal = document.getElementById('ticketModal');
    const form = document.getElementById('ticketForm');
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }
    if (form) form.reset();
}

function updateTicketCount() {
    const ticketCount = document.getElementById('ticketCount');
    if (ticketCount) {
        ticketCount.textContent = ticketStorage.getAll().length;
    }
}

// Mejorar showService con breadcrumbs
const originalShowService = showService;
showService = function(type) {
    originalShowService(type);
    updateBreadcrumbs(type);

    // Cerrar sidebar en móvil
    if (window.innerWidth <= 768) {
        closeSidebar();
    }
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🚀 Google Cloud Ops cargado exitosamente', 'color: #4285f4; font-size: 14px; font-weight: bold;');

    // Actualizar contador de tickets
    updateTicketCount();

    // Inicializar favoritos
    favoritesManager.updateUI();

    // Configurar búsqueda
    setupSearch();

    // Configurar modal
    setupModal();

    // Event listeners para menú
    document.querySelectorAll('.menu-item[data-service]').forEach(item => {
        item.addEventListener('click', () => {
            const service = item.getAttribute('data-service');
            showService(service);
        });

        // Soporte para teclado
        item.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const service = item.getAttribute('data-service');
                showService(service);
            }
        });
    });

    // Event listeners para favoritos
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const serviceId = btn.getAttribute('data-service');
            favoritesManager.toggle(serviceId);
        });
    });

    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const closeMenu = document.getElementById('closeMenu');
    const overlay = document.getElementById('overlay');

    if (hamburger) hamburger.addEventListener('click', toggleSidebar);
    if (closeMenu) closeMenu.addEventListener('click', closeSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closeSidebar();
        }
    });

    showNotification('Bienvenido a Google Cloud Ops', 'info');
});

// Exponer funciones globales
window.showService = showService;
window.deleteTicket = deleteTicket;
window.showNotification = showNotification;
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;
window.openModal = openModal;
window.closeModal = closeModal;
