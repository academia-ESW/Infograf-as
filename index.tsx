/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

interface AutomationCategory {
  category: string;
  color: string;
  icon: string;
  description: string;
  tools: string[];
  workflow: string[];
}

const automationData: AutomationCategory[] = [
  {
    category: 'Automatización de Soporte al Cliente',
    color: 'var(--c-customer-support)',
    icon: 'fas fa-headset',
    description: 'Chatbots y asistentes virtuales impulsados por IA gestionan consultas de clientes 24/7, reduciendo el soporte manual y mejorando los tiempos de respuesta.',
    tools: ['ChatGPT', 'Zendesk AI', 'Intercom', 'Tidio', 'Drift'],
    workflow: ['Recopilar FAQs', 'Elegir herramienta de IA', 'Entrenar chatbot', 'Integrar con CRM', 'Escalar soporte', 'Mejorar precisión', 'Monitorear respuestas', 'Configurar flujos de respuesta'],
  },
  {
    category: 'Automatización de Marketing y Contenido',
    color: 'var(--c-marketing)',
    icon: 'fas fa-bullhorn',
    description: 'Las herramientas de IA automatizan la creación de contenido, la generación de anuncios y las publicaciones en redes sociales para aumentar la visibilidad y reducir el esfuerzo manual.',
    tools: ['Jasper', 'Copy.ai', 'Canva AI', 'Predis', 'Lumen5'],
    workflow: ['Definir objetivos', 'Elegir herramienta de IA', 'Ingresar brief', 'Generar contenido', 'Optimizar estrategia', 'Analizar resultados', 'Programar posts', 'Revisar y editar'],
  },
  {
    category: 'Automatización del Proceso de Ventas',
    color: 'var(--c-sales)',
    icon: 'fas fa-funnel-dollar',
    description: 'Las herramientas de IA ayudan a calificar leads, automatizar campañas de email y personalizar el contacto para convertir más prospectos en clientes.',
    tools: ['HubSpot', 'Zoho CRM', 'Lemlist', 'Pipedrive AI', 'Salesforce Einstein'],
    workflow: ['Capturar leads', 'Segmentar audiencia', 'Seleccionar CRM con IA', 'Calificar leads', 'Refinar embudo', 'Analizar conversiones', 'Rastrear engagement', 'Automatizar contacto'],
  },
  {
    category: 'Automatización Financiera y de Facturación',
    color: 'var(--c-financial)',
    icon: 'fas fa-file-invoice-dollar',
    description: 'Las herramientas de IA agilizan el seguimiento de gastos, la generación de facturas y los pronósticos presupuestarios, ahorrando tiempo y reduciendo errores.',
    tools: ['FreshBooks', 'Bill.com', 'Vic.ai', 'Zoho Books', 'QuickBooks AI'],
    workflow: ['Importar gastos', 'Seleccionar herramienta IA', 'Categorizar entradas', 'Generar facturas', 'Exportar reportes', 'Predecir flujo de caja', 'Rastrear pagos', 'Enviar a clientes'],
  },
  {
    category: 'Automatización de RRHH y Contratación',
    color: 'var(--c-hr)',
    icon: 'fas fa-users',
    description: 'La IA acelera la revisión de currículums, la puntuación de candidatos e incluso los procesos de onboarding para simplificar la adquisición de talento.',
    tools: ['HireLogic', 'Paradox AI', 'Manatal', 'Eightfold', 'Zoho Recruit'],
    workflow: ['Publicar oferta', 'Recibir solicitudes', 'Usar filtro de IA', 'Clasificar candidatos', 'Medir rendimiento', 'Incorporar seleccionados', 'Enviar evaluaciones', 'Programar entrevistas'],
  },
  {
    category: 'Automatización de Análisis y Reportes',
    color: 'var(--c-data-analysis)',
    icon: 'fas fa-chart-pie',
    description: 'La IA analiza grandes conjuntos de datos, encuentra patrones y genera informes con insights accionables para una mejor toma de decisiones.',
    tools: ['MonkeyLearn', 'Polymer', 'Akkio', 'Power BI Copilot', 'Tableau con GPT'],
    workflow: ['Recolectar datos', 'Elegir herramienta', 'Limpiar dataset', 'Ejecutar análisis', 'Optimizar decisiones', 'Compartir con equipo', 'Auto-generar reporte', 'Visualizar resultados'],
  },
];

const toolsGrid = document.getElementById('tools-grid') as HTMLElement;
const searchInput = document.getElementById('search-input') as HTMLInputElement;

/**
 * Renderiza las tarjetas de automatización en el DOM.
 * @param {AutomationCategory[]} data - Los datos a renderizar.
 */
function renderCards(data: AutomationCategory[]) {
  if (!toolsGrid) return;
  toolsGrid.innerHTML = '';

  if (data.length === 0) {
    toolsGrid.innerHTML = `<p class="no-results">No se encontraron resultados para la búsqueda.</p>`;
    return;
  }

  data.forEach(({ category, color, icon, description, tools, workflow }) => {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.style.setProperty('--category-color', color);

    const toolListItems = tools.map(tool => `<li>${tool}</li>`).join('');
    const workflowItems = workflow.map(step => `<li>${step}</li>`).join('');

    card.innerHTML = `
      <div class="category-header">
        <i class="${icon}"></i>
        <h3>${category}</h3>
      </div>
      <div class="card-content">
        <p class="card-description">${description}</p>
        
        <div>
          <h4><i class="fas fa-tools"></i> Herramientas Clave</h4>
          <ul class="tools-list">
            ${toolListItems}
          </ul>
        </div>

        <div>
            <h4><i class="fas fa-project-diagram"></i> Flujo de Trabajo Típico</h4>
            <ol class="workflow-steps">
            ${workflowItems}
            </ol>
        </div>
      </div>
    `;
    toolsGrid.appendChild(card);
  });
}

/**
 * Filtra las categorías basado en el término de búsqueda.
 * @param {string} searchTerm - El texto a buscar.
 */
function filterContent(searchTerm: string) {
  const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

  if (!lowerCaseSearchTerm) {
    renderCards(automationData);
    return;
  }

  const filteredData = automationData.filter(categoryData => {
    const hasMatchingTool = categoryData.tools.some(tool =>
      tool.toLowerCase().includes(lowerCaseSearchTerm)
    );
    const hasMatchingCategory = categoryData.category.toLowerCase().includes(lowerCaseSearchTerm);
    const hasMatchingDescription = categoryData.description.toLowerCase().includes(lowerCaseSearchTerm);

    return hasMatchingTool || hasMatchingCategory || hasMatchingDescription;
  });

  renderCards(filteredData);
}

// Event Listeners
searchInput?.addEventListener('input', () => {
  filterContent(searchInput.value);
});

// Render inicial
document.addEventListener('DOMContentLoaded', () => {
  renderCards(automationData);
});
