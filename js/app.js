/**
 * ========================================
 * CATÁLOGO DE SERVICIOS - GOOGLE CLOUD OPS
 * Sistema completo de gestión de servicios e incidentes
 * ========================================
 */

// ========================================
// CONFIGURACIÓN DE DATOS DE SERVICIOS
// ========================================

const servicesData = {
    compute: {
        title: 'Compute Engine',
        description: 'Máquinas virtuales en la infraestructura de Google Cloud.',
        icon: 'assets/icons/compute.svg',
        status: 'Activo',
        statusClass: 'status',
        details: [
            'Escalabilidad automática y balanceo de carga',
            'Alta disponibilidad con SLA del 99.99%',
            'Múltiples zonas y regiones globales',
            'Configuración personalizada de CPU y RAM',
            'Soporte para Linux y Windows Server'
        ],
        metrics: {
            uptime: '99.99%',
            instances: '1,247',
            regions: '35'
        }
    },
    kubernetes: {
        title: 'Kubernetes Engine (GKE)',
        description: 'Clústeres de contenedores administrados por Google.',
        icon: 'assets/icons/kubernetes.svg',
        status: 'Activo',
        statusClass: 'status',
        details: [
            'Orquestación automática de contenedores',
            'Actualizaciones y parches automáticos',
            'Escalado horizontal de pods',
            'Integración con CI/CD',
            'Monitoreo y logging integrado'
        ],
        metrics: {
            clusters: '342',
            pods: '12,847',
            nodes: '2,156'
        }
    },
    sql: {
        title: 'Cloud SQL',
        description: 'Bases de datos relacionales administradas y seguras.',
        icon: 'assets/icons/database.svg',
        status: 'Activo',
        statusClass: 'status',
        details: [
            'MySQL, PostgreSQL y SQL Server',
            'Backups automáticos diarios',
            'Replicación y alta disponibilidad',
            'Escalado vertical automático',
            'Cifrado en reposo y en tránsito'
        ],
        metrics: {
            databases: '89',
            storage: '15TB',
            backups: '365'
        }
    },
    storage: {
        title: 'Cloud Storage',
        description: 'Almacenamiento de objetos escalable y seguro.',
        icon: 'assets/icons/storage.svg',
        status: 'Activo',
        statusClass: 'status',
        details: [
            'Almacenamiento ilimitado y duradero',
            'Múltiples clases de almacenamiento',
            'Cifrado en reposo y tránsito',
            'Control de versiones de objetos',
            'Integración con CDN global'
        ],
        metrics: {
            buckets: '1,234',
            storage: '500TB',
            requests: '2.5M/día'
        }
    },
    iam: {
        title: 'IAM – Identity & Access Management',
        description: 'Control centralizado de permisos y accesos.',
        icon: 'assets/icons/security.svg',
        status: 'Activo',
        statusClass: 'status',
        details: [
            'Gestión centralizada de identidades',
            'Control granular de permisos (RBAC)',
            'Auditoría completa de accesos',
            'Integración con Active Directory',
            'Autenticación multifactor (MFA)'
        ],
        metrics: {
            users: '1,456',
            roles: '234',
            policies: '567'
        }
    }
};

// ========================================
// SISTEMA DE ALMACENAMIENTO LOCAL
// ========================================

class StorageManager {
    constructor() {
        this.storageKey = 'googleCloudTickets';
        this.initStorage();
    }

    initStorage() {
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify([]));
        }
    }

    getTickets() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    addTicket(ticket) {
        const tickets = this.getTickets();
        ticket.id = this.generateId();
        ticket.createdAt = new Date().toISOString();
        ticket.status = 'Abierto';
        tickets.push(ticket);
        localStorage.setItem(this.storageKey, JSON.stringify(tickets));
        return ticket;
    }

    deleteTicket(id) {
        let tickets = this.getTickets();
        tickets = tickets.filter(t => t.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(tickets));
    }

    updateTicketStatus(id, newStatus) {
        const tickets = this.getTickets();
        const ticket = tickets.find(t => t.id === id);
        if (ticket) {
            ticket.status = newStatus;
            localStorage.setItem(this.storageKey, JSON.stringify(tickets));
        }
    }

    generateId() {
        return 'TICKET-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    getTicketsByPriority(priority) {
        return this.getTickets().filter(t => t.priority === priority);
    }

    getStats() {
        const tickets = this.getTickets();
        return {
            total: tickets.length,
            p1: tickets.filter(t => t.priority === 'P1').length,
            p2: tickets.filter(t => t.priority === 'P2').length,
            p3: tickets.filter(t => t.priority === 'P3').length,
            abiertos: tickets.filter(t => t.status === 'Abierto').length,
            cerrados: tickets.filter(t => t.status === 'Cerrado').length
        };
    }
}

const storage = new StorageManager();

// ========================================
// SISTEMA DE NOTIFICACIONES
// ========================================

function showNotification(message, type = 'success') {
    // Eliminar notificación anterior si existe
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ========================================
// FUNCIONES DE VISUALIZACIÓN DE SERVICIOS
// ========================================

function showService(type) {
    const contentElement = document.getElementById('content');

    // Limpiar selección activa
    clearActiveMenuItems();

    // Marcar elemento activo
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        if (item.getAttribute('data-service') === type) {
            item.classList.add('active');
        }
    });

    // Renderizar contenido según el tipo
    switch(type) {
        case 'compute':
        case 'kubernetes':
        case 'sql':
        case 'storage':
        case 'iam':
            renderServiceCard(type, contentElement);
            break;
        case 'ticket':
            renderTicketForm(contentElement);
            break;
        case 'mis':
            renderMyTickets(contentElement);
            break;
        case 'p1':
            renderP1Incidents(contentElement);
            break;
        case 'status':
            renderStatusDashboard(contentElement);
            break;
        default:
            contentElement.innerHTML = createErrorCard('Servicio no encontrado');
    }

    // Aplicar animación
    contentElement.classList.add('fade-in');
    setTimeout(() => contentElement.classList.remove('fade-in'), 500);
}

function renderServiceCard(type, container) {
    const service = servicesData[type];
    if (!service) return;

    let html = `
        <div class="card">
            <div class="card-icon">
                <img src="${service.icon}" alt="${service.title}">
            </div>
            <h2>${service.title}</h2>
            <p>${service.description}</p>
            <p class="${service.statusClass}">Estado: ${service.status}</p>

            <h3 style="margin-top: 25px;">Características principales:</h3>
            <ul>
                ${service.details.map(detail => `<li>${detail}</li>`).join('')}
            </ul>
    `;

    if (service.metrics) {
        html += `
            <h3 style="margin-top: 25px;">Métricas en tiempo real:</h3>
            <div class="stats-grid" style="margin-top: 15px;">
                ${Object.entries(service.metrics).map(([key, value]) => `
                    <div class="stat-card">
                        <h3>${formatMetricName(key)}</h3>
                        <div class="stat-value">${value}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    html += `
            <div style="margin-top: 30px;">
                <button class="btn btn-success" onclick="showNotification('Conexión al servicio ${service.title} establecida', 'info')">
                    Conectar Servicio
                </button>
                <button class="btn btn-secondary" onclick="showNotification('Documentación del servicio ${service.title}', 'info')">
                    Ver Documentación
                </button>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

function renderTicketForm(container) {
    const html = `
        <div class="card">
            <div class="card-icon">
                <img src="assets/icons/ticket.svg" alt="Crear Ticket">
            </div>
            <h2>Crear Nuevo Incidente</h2>
            <p>Complete el formulario para registrar un nuevo ticket de soporte.</p>

            <form id="ticketForm" style="margin-top: 30px;">
                <div class="form-group">
                    <label for="ticketTitle">Título del Incidente *</label>
                    <input type="text" id="ticketTitle" name="title" required
                           placeholder="Ej: Error en conexión a base de datos">
                </div>

                <div class="form-group">
                    <label for="ticketService">Servicio Afectado *</label>
                    <select id="ticketService" name="service" required>
                        <option value="">Seleccione un servicio</option>
                        <option value="Compute Engine">Compute Engine</option>
                        <option value="Kubernetes Engine">Kubernetes Engine</option>
                        <option value="Cloud SQL">Cloud SQL</option>
                        <option value="Cloud Storage">Cloud Storage</option>
                        <option value="IAM">IAM - Identity & Access</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="ticketPriority">Prioridad *</label>
                    <select id="ticketPriority" name="priority" required>
                        <option value="">Seleccione prioridad</option>
                        <option value="P1">P1 - Crítico (Sistema caído)</option>
                        <option value="P2">P2 - Alto (Funcionalidad afectada)</option>
                        <option value="P3">P3 - Normal (Consulta o mejora)</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="ticketDescription">Descripción Detallada *</label>
                    <textarea id="ticketDescription" name="description" required
                              placeholder="Describa el problema en detalle, pasos para reproducir, impacto, etc."></textarea>
                </div>

                <div class="form-group">
                    <label for="ticketContact">Email de Contacto *</label>
                    <input type="email" id="ticketContact" name="contact" required
                           placeholder="ejemplo@empresa.com">
                </div>

                <button type="submit" class="btn btn-success">Crear Incidente</button>
                <button type="reset" class="btn btn-secondary">Limpiar Formulario</button>
            </form>
        </div>
    `;

    container.innerHTML = html;

    // Agregar event listener al formulario
    document.getElementById('ticketForm').addEventListener('submit', handleTicketSubmit);
}

function handleTicketSubmit(e) {
    e.preventDefault();

    const formData = {
        title: document.getElementById('ticketTitle').value,
        service: document.getElementById('ticketService').value,
        priority: document.getElementById('ticketPriority').value,
        description: document.getElementById('ticketDescription').value,
        contact: document.getElementById('ticketContact').value
    };

    // Guardar ticket
    const newTicket = storage.addTicket(formData);

    // Mostrar notificación
    showNotification(`Incidente ${newTicket.id} creado exitosamente`, 'success');

    // Limpiar formulario
    e.target.reset();

    // Mostrar la sección de mis incidentes después de 1 segundo
    setTimeout(() => {
        showService('mis');
    }, 1500);
}

function renderMyTickets(container) {
    const tickets = storage.getTickets();

    let html = `
        <div class="card">
            <h2>Mis Incidentes</h2>
            <p>Listado de todos los tickets registrados en el sistema.</p>
    `;

    if (tickets.length === 0) {
        html += `
            <div style="text-align: center; padding: 40px 0;">
                <p class="status info">No hay incidentes registrados</p>
                <button class="btn" onclick="showService('ticket')" style="margin-top: 20px;">
                    Crear Primer Incidente
                </button>
            </div>
        `;
    } else {
        html += `
            <table class="tickets-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Servicio</th>
                        <th>Prioridad</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${tickets.map(ticket => `
                        <tr>
                            <td><strong>${ticket.id}</strong></td>
                            <td>${ticket.title}</td>
                            <td>${ticket.service}</td>
                            <td><span class="priority-badge priority-${ticket.priority.toLowerCase()}">${ticket.priority}</span></td>
                            <td><span class="status ${ticket.status === 'Cerrado' ? 'critical' : ''}">${ticket.status}</span></td>
                            <td>${new Date(ticket.createdAt).toLocaleDateString('es-ES')}</td>
                            <td>
                                <button class="btn btn-danger" onclick="deleteTicket('${ticket.id}')" style="padding: 8px 16px; margin: 0;">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    html += `</div>`;
    container.innerHTML = html;
}

function deleteTicket(id) {
    if (confirm('¿Está seguro de eliminar este incidente?')) {
        storage.deleteTicket(id);
        showNotification('Incidente eliminado correctamente', 'info');
        showService('mis');
    }
}

function renderP1Incidents(container) {
    const p1Tickets = storage.getTicketsByPriority('P1');

    let html = `
        <div class="card">
            <h2>Incidentes Críticos (P1)</h2>
            <p>Monitoreo de incidentes de prioridad crítica que requieren atención inmediata.</p>
    `;

    if (p1Tickets.length === 0) {
        html += `
            <div style="text-align: center; padding: 40px 0;">
                <p class="status">✓ Sin incidentes críticos activos</p>
                <p style="margin-top: 20px; color: #94a3b8;">Todos los sistemas operan con normalidad.</p>
            </div>
        `;
    } else {
        html += `
            <div class="status critical" style="display: block; margin: 20px 0;">
                ⚠ ${p1Tickets.length} incidente(s) crítico(s) activo(s)
            </div>
            <table class="tickets-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Servicio</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    ${p1Tickets.map(ticket => `
                        <tr>
                            <td><strong>${ticket.id}</strong></td>
                            <td>${ticket.title}</td>
                            <td>${ticket.service}</td>
                            <td><span class="status critical">${ticket.status}</span></td>
                            <td>${new Date(ticket.createdAt).toLocaleDateString('es-ES')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    html += `</div>`;
    container.innerHTML = html;
}

function renderStatusDashboard(container) {
    const stats = storage.getStats();

    const html = `
        <div class="card">
            <h2>Panel de Estado del Sistema</h2>
            <p>Vista general del estado de todos los servicios y métricas de incidentes.</p>

            <h3 style="margin-top: 30px;">Estado de Servicios</h3>
            <div class="stats-grid" style="margin-top: 20px;">
                ${Object.keys(servicesData).map(key => {
                    const service = servicesData[key];
                    return `
                        <div class="stat-card">
                            <img src="${service.icon}" alt="${service.title}" style="width: 50px; height: 50px; margin-bottom: 10px;">
                            <h3>${service.title}</h3>
                            <div class="status">${service.status}</div>
                        </div>
                    `;
                }).join('')}
            </div>

            <h3 style="margin-top: 40px;">Estadísticas de Incidentes</h3>
            <div class="stats-grid" style="margin-top: 20px;">
                <div class="stat-card">
                    <h3>Total de Tickets</h3>
                    <div class="stat-value">${stats.total}</div>
                </div>
                <div class="stat-card">
                    <h3>Incidentes P1</h3>
                    <div class="stat-value" style="color: #ea4335;">${stats.p1}</div>
                </div>
                <div class="stat-card">
                    <h3>Incidentes P2</h3>
                    <div class="stat-value" style="color: #fbbc04;">${stats.p2}</div>
                </div>
                <div class="stat-card">
                    <h3>Incidentes P3</h3>
                    <div class="stat-value" style="color: #34a853;">${stats.p3}</div>
                </div>
                <div class="stat-card">
                    <h3>Abiertos</h3>
                    <div class="stat-value" style="color: #4285f4;">${stats.abiertos}</div>
                </div>
                <div class="stat-card">
                    <h3>Cerrados</h3>
                    <div class="stat-value" style="color: #34a853;">${stats.cerrados}</div>
                </div>
            </div>

            <div style="margin-top: 30px; text-align: center;">
                <p class="status">Sistema operativo al 100%</p>
                <p style="margin-top: 15px; color: #94a3b8;">Última actualización: ${new Date().toLocaleString('es-ES')}</p>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

// ========================================
// FUNCIONES AUXILIARES
// ========================================

function createErrorCard(message) {
    return `
        <div class="card">
            <h2>Error</h2>
            <p class="status critical">${message}</p>
        </div>
    `;
}

function clearActiveMenuItems() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => item.classList.remove('active'));
}

function formatMetricName(key) {
    const names = {
        uptime: 'Disponibilidad',
        instances: 'Instancias',
        regions: 'Regiones',
        clusters: 'Clusters',
        pods: 'Pods',
        nodes: 'Nodos',
        databases: 'Bases de Datos',
        storage: 'Almacenamiento',
        backups: 'Backups',
        buckets: 'Buckets',
        requests: 'Solicitudes',
        users: 'Usuarios',
        roles: 'Roles',
        policies: 'Políticas'
    };
    return names[key] || key;
}

// ========================================
// INICIALIZACIÓN
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Catálogo de Servicios Google Cloud Ops - Iniciado');

    // Agregar eventos a los elementos del menú
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        const serviceType = item.getAttribute('data-service');
        item.addEventListener('click', () => showService(serviceType));
    });

    // Mostrar bienvenida
    showNotification('Bienvenido al Catálogo de Servicios Google Cloud', 'info');
});

// Exponer funciones globales
window.showService = showService;
window.deleteTicket = deleteTicket;
window.showNotification = showNotification;
