/**
 * ========================================
 * CONFIGURACIÓN DE LA APLICACIÓN
 * ========================================
 */

const CONFIG = {
    // Información de la aplicación
    app: {
        name: 'Google Cloud Ops',
        version: '1.0.0',
        description: 'Catálogo de Servicios Google Cloud Platform'
    },

    // Configuración de servicios
    services: {
        refreshInterval: 30000, // 30 segundos
        enableNotifications: true,
        autoRefresh: false
    },

    // Configuración de UI
    ui: {
        animationDuration: 500,
        theme: 'dark',
        sidebarWidth: 260
    },

    // URLs (para futuras integraciones)
    api: {
        baseUrl: '',
        endpoints: {
            services: '/api/services',
            tickets: '/api/tickets',
            status: '/api/status'
        }
    }
};

// Hacer CONFIG de solo lectura
Object.freeze(CONFIG);
