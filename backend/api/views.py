

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .locale_data import PORTFOLIO_EN

# ==============================================================================
# DATA ESTRUCTURADA PROFESIONAL (Basada en el Currículum Corporativo)
# ==============================================================================

PROFILE_DATA = {
    "name": "Edinson Caraballo",
    "title": "Ingeniero en Informática / Especialista Web",
    "subtitles": [
        "Desarrollador Full-Stack",
        "Especialista en Python, Django & Django REST Framework",
        "Diseñador de Arquitecturas MVC / MTV",
        "Especialista en Optimización de Consultas SQL Complejas"
    ],
    "bio": "Ingeniero en Informática con más de 8 años de trayectoria liderando el desarrollo, implantación y optimización de aplicaciones web empresariales de alta disponibilidad. Experto en unificar lógicas de negocio robustas en el backend (Python/Django, PHP, ASP Classic) con arquitecturas de bases de datos críticas (Oracle, PostgreSQL, SQL Server). Especializado en la refactorización de código para reducción de latencia, consumo eficiente de APIs y diseño de interfaces dinámicas y modulares.",
    "location": "Caracas, Venezuela",
    "email": "ecaraballo231@gmail.com",
    "phone": "+58 212 6474145",
    "linkedin": "https://linkedin.com/in/edinson-caraballo-troncoso",
    "stats": [
        {"value": "9+ Años", "label": "Experiencia Profesional"},
        {"value": "9+", "label": "Proyectos de Software"},
        {"value": "Consola", "label": "Creacion, optimización y Consumo de APIs"},
        {"value": "Avanzado", "label": "Análisis en levantamiento de informacion, desarrollo de software y depuración de errores"}
    ]
}

EXPERIENCES_DATA = [
    {
        "period": "2018 - Actualidad",
        "company": "Humanitas Administradora de Riesgos",
        "role": "Especialista Web",
        "description": "Liderazgo en el desarrollo, mantenimiento evolutivo y optimización de la suite de sistemas web corporativos bajo patrones arquitectónicos estructurados, asegurando altos estándares de mantenibilidad y escalabilidad.",
        "achievements": [
            "Dirección del desarrollo de módulos críticos de gestión, logrando mitigar drásticamente la latencia del sistema mediante refactorización estructural y optimización de procesos.",
            "Diseño e implementación de nuevos componentes modulares en el frontend (Angular) y endpoints robustos en el backend (Django REST Framework) para el procesamiento eficiente de flujos de datos en formato JSON.",
            "Ejecución continua de auditorías de código, pruebas (testing) y depuración minuciosa para elevar la estabilidad del software en entornos de producción.",
            "Garantía de soporte técnico especializado y actualización tecnológica para plataformas satélite y páginas web afiliadas a la corporación."
        ],
        "stack": ["Python", "Django", "Django REST Framework", "Angular", "ASP Classic", "Oracle DB", "Bootstrap 3", "jQuery", "JavaScript"]
    },
    {
        "period": "2016 - 2018",
        "company": "Ministerio de Ecosocialismo y Aguas (MINEA)",
        "role": "Programador",
        "description": "Automatización integral de flujos de trabajo institucionales mediante la concepción y desarrollo de plataformas digitales basadas en la arquitectura MVC y optimización del manejo de datos relacionales.",
        "achievements": [
            "Concepción y desarrollo de aplicaciones web interactivas orientadas al control de asistencia, gestión de horas extras y auditorías internas de Recursos Humanos.",
            "Construcción de consultas complejas y scripts en PL/SQL orientados a la migración masiva de grandes volúmenes de datos bajo estrictos criterios de integridad.",
            "Integración de módulos centralizados para comunicaciones masivas a través del consumo estratégico de APIs externas.",
            "Diagnóstico oportuno de bugs y optimización del backend en plataformas con motores PostgreSQL y MySQL."
        ],
        "stack": ["PHP", "PL/SQL", "PostgreSQL", "MySQL", "Bootstrap 3", "jQuery", "JavaScript", "HTML5 / CSS3"]
    }
]

PROJECTS_DATA = [
    {
        "id": "sistema-melquiades",
        "title": "Sistema Melquiades",
        "category": "Fullstack",
        "description": "Plataforma corporativa moderna construida con arquitectura desacoplada para la optimización de procesos internos.",
        "fullDesc": "Diseño integral de endpoints de alto rendimiento en el backend con Django REST Framework y estructuración de componentes interactivos y reutilizables en Angular en el frontend. El sistema destaca por una gestión avanzada de estructuras JSON y flujos asíncronos.",
        "metrics": "Elevación de estándares en mantenibilidad y escalabilidad mediante auditorías estrictas de código.",
        "tech": ["Python", "Django Rest Framework", "Angular", "Oracle DB", "Bootstrap 3", "GIT", "HTML5", "CSS"],
        "type": "laboral",
        "featured": True
    },
    {
        "id": "sistema-manakaind",
        "title": "Sistema Mankaind",
        "category": "Fullstack",
        "description": "Motor central para la gestión, tarificación e inserción de primas de seguros en Python y Django.",
        "fullDesc": "Reingeniería estructural y modificación del proceso central de cotización de pólizas HCM. Automatiza la inserción parametrizada de tarifas y primas tanto para titulares como para beneficiarios, incorporando filtros avanzados de búsqueda, carga de recaudos médicos/técnicos en suscripción y generación dinámica de solicitudes en formato PDF.",
        "metrics": "Reducción sustancial del tiempo de cotización y optimización de flujos de suscripción.",
        "tech": ["Python", "Django", "Oracle DB", "Bootstrap 3", "jQuery", "GIT", "PDF Generation"],
        "type": "laboral",
        "featured": True
    },
    {
        "id": "sigefor",
        "title": "SIGEFOR",
        "category": "Fullstack",
        "description": "Sistema de control y auditoría de guías electrónicas de bienes forestales nacionales.",
        "fullDesc": "Desarrollado para asegurar la legalidad y el rastreo de los bienes forestales en tránsito a nivel nacional. SIGEFOR valida firmas electrónicas, almacena permisos ministeriales y facilita las inspecciones forestales en tiempo real.",
        "metrics": "Utilizado por más de 50 inspectores en puestos de control en todo el país.",
        "tech": ["PHP", "PostgreSQL", "JavaScript", "Bootstrap 3", "jQuery", "Linux", "HTML5", "CSS"],
        "type": "universitario",
        "featured": True
    },
    {
        "id": "registro-horas-extras",
        "title": "Sistema de Gestión de Horas Extras",
        "category": "Fullstack",
        "description": "Plataforma de automatización de asistencia y jornadas extraordinarias para el MINEA.",
        "fullDesc": "Desarrollo de un sistema centralizado para el control de asistencia y cómputo de horas extraordinarias del personal ministerial bajo arquitectura MVC. Incluye una arquitectura robusta de reportería avanzada orientada a auditorías del departamento de Recursos Humanos.",
        "metrics": "Digitalización y transparencia total de los procesos de asistencia institucional.",
        "tech": ["PHP", "PostgreSQL", "Bootstrap 3", "jQuery", "JavaScript", "HTML5", "CSS"],
        "type": "laboral",
        "featured": False
    },
    {
        "id": "control-ingreso-egreso",
        "title": "Sistema de Control de Ingreso y Egreso",
        "category": "Fullstack",
        "description": "Plataforma digital de auditoría de personal basada en bases de datos relacionales.",
        "fullDesc": "Solución de software dedicada a registrar con precisión los movimientos de personal en la institución, vinculando las interfaces dinámicas de usuario con bases de datos MySQL debidamente normalizadas.",
        "metrics": "Garantía de integridad de datos y logs de acceso auditables en tiempo real.",
        "tech": ["PHP", "MySQL", "Bootstrap 3", "jQuery", "JavaScript", "HTML5", "CSS"],
        "type": "laboral",
        "featured": False
    },
    {
        "id": "sirebip",
        "title": "SIREBIP",
        "category": "Fullstack",
        "description": "Sistema de Registro de Bienes Públicos para control institucional de activos del MINEA.",
        "fullDesc": "Audita y controla los activos físicos y tecnológicos del ministerio. Genera de forma automatizada las hojas de asignación por departamento e historial de traspaso de activos, con firmas de actas digitales.",
        "metrics": "Control exacto de más de 15,000 activos físicos ministeriales.",
        "tech": ["PHP", "jQuery", "PostgreSQL", "CSS", "Apache", "HTML5", "CSS3", "Bootstrap", "jQuery", "JavaScript"],
        "type": "universitario",
        "featured": True
    },
    {
        "id": "kardex",
        "title": "Kardex Almacén",
        "category": "Fullstack",
        "description": "Migración a plataforma libre del sistema de control y stock del ministerio.",
        "fullDesc": "Migración total de sistemas de almacenamiento y control a código libre. Incluye el control de consumibles, papelería e inventarios de equipos del Ministerio del Ambiente.",
        "metrics": "Ahorro del 100% en costos de licencias en base de datos propietaria.",
        "tech": ["Linux", "PHP", "PostgreSQL", "Apache", "HTML5", "CSS3", "Bootstrap", "jQuery", "JavaScript"],
        "type": "universitario",
        "featured": False
    },
    {
        "id": "previsora",
        "title": "Previsora",
        "category": "Fullstack",
        "description": "Sistema de gestión de procesos de seguros HCM .",
        "fullDesc": "Optimiza y automatiza el ciclo de vida de las pólizas y siniestros.",
        "metrics": "Desarrollar nuevos procesos para la automatizacion de los procesos para la gestion de los siniestros y mantenimiento correctivo de los módulos de gestión.",
        "tech": ["ASP", "Oracle", "HTML5", "CSS3", "Bootstrap", "jQuery", "JavaScript"],
        "type": "laboral",
        "featured": False
    },
    {
        "id": "humanitas",
        "title": "Humanitas",
        "category": "Fullstack",
        "description": "Sistema de gestión de procesos de seguros HCM .",
        "fullDesc": "Optimiza y automatiza el ciclo de vida de las pólizas y siniestros.",
        "metrics": "Centraliza la información, reduce errores operativos, acelera la atención al cliente y garantiza el cumplimiento normativo mediante la digitalización de flujos de trabajo en un mercado altamente competitivo.",
        "tech": ["ASP", "Oracle", "HTML5", "CSS3", "Bootstrap", "jQuery", "JavaScript"],
        "type": "laboral",
        "featured": False
    }
]

SKILLS_DATA = [
    # Backend
    {"name": "Python", "category": "Backend", "level": "Sénior / Excelente", "usage": "Diseño de microservicios, APIs robustas y automatización avanzada."},
    {"name": "Django", "category": "Backend", "level": "Sénior / Excelente", "usage": "Desarrollo del Sistema Manakaind bajo patrones MTV eficientes."},
    {"name": "Django REST Framework", "category": "Backend", "level": "Excelente", "usage": "Construcción de endpoints de alto rendimiento (Sistema Melquiades)."},
    {"name": "PHP", "category": "Backend", "level": "Avanzado", "usage": "Automatización de procesos institucionales y lógica MVC en MINEA."},
    {"name": "ASP Classic", "category": "Backend", "level": "Avanzado", "usage": "Mantenimiento evolutivo de sistemas de seguros de alta prioridad."},
    {"name": "C++", "category": "Backend", "level": "Medio", "usage": "Desarrollo algorítmico y sistemas académicos de control de inventario."},
    {"name": ".NET / C#", "category": "Backend", "level": "Medio", "usage": "Integraciones de backend corporativo y lógica de escritorio."},
    # Frontend
    {"name": "HTML5 / CSS3", "category": "Frontend", "level": "Excelente", "usage": "Diseño web semántico, estructuras responsivas y limpias."},
    {"name": "JavaScript ES6+", "category": "Frontend", "level": "Avanzado", "usage": "Lógica asíncrona del cliente, interactividad y manipulación JSON."},
    {"name": "Angular", "category": "Frontend", "level": "Avanzado", "usage": "Arquitectura modular SPA y componentes dinámicos en frontend."},
    {"name": "Bootstrap 3", "category": "Frontend", "level": "Avanzado", "usage": "Estilización ágil y diseño adaptable en soluciones multiplataforma."},
    {"name": "jQuery", "category": "Frontend", "level": "Avanzado", "usage": "Optimización del árbol DOM y comunicación asíncrona vía AJAX."},
    {"name": "AmCharts", "category": "Frontend", "level": "Medio", "usage": "Generación de dashboards de reportería avanzada con gráficas dinámicas."},
    {"name": "Crispy Forms", "category": "Frontend", "level": "Avanzado", "usage": "Estandarización y renderizado estricto de formularios Django."},
    # Databases
    {"name": "Oracle DB", "category": "Bases de Datos", "level": "Excelente", "usage": "Consultas jerárquicas, optimización PL/SQL y bases de datos críticas."},
    {"name": "PostgreSQL", "category": "Bases de Datos", "level": "Excelente", "usage": "Esquema relacional principal del MINEA (Horas Extras, SIGEFOR, SIREBIP)."},
    {"name": "MySQL", "category": "Bases de Datos", "level": "Avanzado", "usage": "Estructuras de almacenamiento para control de acceso y auditorías."},
    {"name": "SQL Server", "category": "Bases de Datos", "level": "Avanzado", "usage": "Consultas relacionales complejas cruzadas y reportería ejecutiva."},
    # Tools
    {"name": "GIT", "category": "Herramientas", "level": "Excelente", "usage": "Control de versiones distribuido y flujo de ramas en producción."},
    {"name": "Sourcetree", "category": "Herramientas", "level": "Excelente", "usage": "Gestión visual y auditoría avanzada de repositorios y commits."},
    {"name": "Docker", "category": "Herramientas", "level": "Medio", "usage": "Virtualización de entornos y contenedores de despliegue."}
]

EDUCATION_DATA = [
    {
        "period": "2015 - 2017",
        "degree": "Ingeniero en Informática",
        "institution": "Colegio Universitario de Caracas",
        "detail": "Formación enfocada en auditoría de sistemas de software, administración avanzada de bases de datos relacionales y optimización de algoritmos complejos.",
        "projects": "SIGEFOR (Gestión de Calidad de Guías Forestales) y SIREBIP (Registro de Bienes Públicos institucionales)."
    },
    {
        "period": "2012 - 2015",
        "degree": "Técnico Superior en Informática",
        "institution": "Colegio Universitario de Caracas",
        "detail": "Especialización en lógica algorítmica de alto nivel, modelado relacional de datos y principios de desarrollo estructurado de software.",
        "projects": "Kardex de Almacén (Migración a plataforma libre) y desarrollo de sistemas de inventario en C++."
    }
]

PORTFOLIO_LOCALES = {
    "es": {
        "profile": PROFILE_DATA,
        "experiences": EXPERIENCES_DATA,
        "projects": PROJECTS_DATA,
        "skills": SKILLS_DATA,
        "education": EDUCATION_DATA,
    },
    "en": PORTFOLIO_EN,
}

# ==============================================================================
# VISTAS DE LA API (CONTROLADORES)
# ==============================================================================

class PortfolioView(APIView):
    """
    Controlador unificado del Portafolio.
    Retorna la totalidad del currículum estructurado en una sola carga JSON optimizada.
    """
    def get(self, request, format=None):
        lang = request.query_params.get("lang", "es")
        if lang not in PORTFOLIO_LOCALES:
            lang = "es"
        return Response(PORTFOLIO_LOCALES[lang], status=status.HTTP_200_OK)


class ProfileView(APIView):
    def get(self, request):
        lang = request.query_params.get("lang", "es")
        if lang not in PORTFOLIO_LOCALES:
            lang = "es"
        return Response(PORTFOLIO_LOCALES[lang]["profile"], status=status.HTTP_200_OK)


class ExperienceListView(APIView):
    def get(self, request):
        lang = request.query_params.get("lang", "es")
        if lang not in PORTFOLIO_LOCALES:
            lang = "es"
        return Response(PORTFOLIO_LOCALES[lang]["experiences"], status=status.HTTP_200_OK)


class ProjectListView(APIView):
    def get(self, request):
        lang = request.query_params.get("lang", "es")
        if lang not in PORTFOLIO_LOCALES:
            lang = "es"
        return Response(PORTFOLIO_LOCALES[lang]["projects"], status=status.HTTP_200_OK)


class SkillListView(APIView):
    def get(self, request):
        lang = request.query_params.get("lang", "es")
        if lang not in PORTFOLIO_LOCALES:
            lang = "es"
        return Response(PORTFOLIO_LOCALES[lang]["skills"], status=status.HTTP_200_OK)


class EducationListView(APIView):
    def get(self, request):
        lang = request.query_params.get("lang", "es")
        if lang not in PORTFOLIO_LOCALES:
            lang = "es"
        return Response(PORTFOLIO_LOCALES[lang]["education"], status=status.HTTP_200_OK)


@api_view(['POST'])
def contact_message(request):
    """
    Controlador funcional para la recepción de mensajes del portafolio.
    Valida la integridad de la petición, registra el evento en el log y envía
    el correo correspondiente usando el backend de Django (SMTP o Consola).
    """
    name = request.data.get('name', '').strip()
    email = request.data.get('email', '').strip()
    message = request.data.get('message', '').strip()

    if not name or not email or not message:
        return Response(
            {"error": "Todos los campos (nombre, correo y mensaje) son estrictamente mandatorios."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Registro formal en los logs del servidor Django
    print("\n" + "="*60)
    print(" LOG DE SERVIDOR: PROCESANDO MENSAJE DE CONTACTO ".center(60, "="))
    print("="*60)
    print(f"Remitente: {name}")
    print(f"Contacto:  {email}")
    print(f"Mensaje:   {message}")
    print("="*60 + "\n")

    # Envío de correo electrónico a través de Django
    try:
        from django.core.mail import send_mail
        from django.conf import settings

        subject = f"Nuevo contacto: {name} desde tu Portafolio Web"
        email_body = f"""
        Has recibido un nuevo mensaje de contacto a través de tu portafolio profesional.

        Detalles del Remitente:
        ------------------------------------------------------------
        Nombre completo: {name}
        Correo electrónico: {email}

        Contenido del Mensaje:
        ------------------------------------------------------------
        {message}
        ------------------------------------------------------------

        Este correo ha sido despachado de forma automatizada por la pasarela de la API del Portafolio.
        """

        send_mail(
            subject=subject,
            message=email_body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=['ecaraballo231@gmail.com'],
            fail_silently=False,
        )
    except Exception as e:
        print(f"!!! ERROR DE ENVÍO DE CORREO SMTP: {str(e)} !!!")
        # En caso de error SMTP (credenciales incorrectas, puerto bloqueado), retornamos detalle útil al cliente
        return Response(
            {"error": f"Error del servidor de correo (SMTP): {str(e)}. Por favor, verifica las credenciales en settings.py."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    return Response(
        {"status": "success", "message": "El mensaje ha sido procesado y transmitido con éxito."},
        status=status.HTTP_201_CREATED
    )
