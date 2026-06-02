"""English portfolio content for i18n API responses."""

PORTFOLIO_EN = {
    "profile": {
        "name": "Edinson Caraballo",
        "title": "Computer Engineer / Web Specialist",
        "subtitles": [
            "Full-Stack Developer",
            "Python, Django & Django REST Framework Specialist",
            "MVC / MTV Architecture Designer",
            "Complex SQL Query Optimization Specialist"
        ],
        "bio": "Computer Engineer with over 8 years of experience leading the development, implementation, and optimization of high-availability enterprise web applications. Expert in unifying robust business logic on the backend (Python/Django, PHP, ASP Classic) with critical database architectures (Oracle, PostgreSQL, SQL Server). Specialized in code refactoring to reduce latency, efficient API consumption, and modular dynamic interface design.",
        "location": "Caracas, Venezuela",
        "email": "ecaraballo231@gmail.com",
        "phone": "+58 212 6474145",
        "linkedin": "https://linkedin.com/in/edinson-caraballo-troncoso",
        "stats": [
            {"value": "9+ Years", "label": "Professional Experience"},
            {"value": "9+", "label": "Software Projects"},
            {"value": "Console", "label": "Creation, optimization & API Consumption"},
            {"value": "Advanced", "label": "Analysis & Bug Debugging"}
        ]
    },
    "experiences": [
        {
            "period": "2018 - Present",
            "company": "Humanitas Risk Administrator",
            "role": "Web Specialist",
            "description": "Leadership in the development, evolutionary maintenance, and optimization of the corporate web systems suite under structured architectural patterns, ensuring high standards of maintainability and scalability.",
            "achievements": [
                "Directed the development of critical management modules, drastically reducing system latency through structural refactoring and process optimization.",
                "Designed and implemented new modular frontend components (Angular) and robust backend endpoints (Django REST Framework) for efficient JSON data flow processing.",
                "Continuous execution of code audits, testing, and thorough debugging to improve software stability in production environments.",
                "Guaranteed specialized technical support and technology updates for satellite platforms and affiliated corporate websites."
            ],
            "stack": ["Python", "Django", "Django REST Framework", "Angular", "ASP Classic", "Oracle DB", "Bootstrap 3", "jQuery", "JavaScript"]
        },
        {
            "period": "2016 - 2018",
            "company": "Ministry of Ecosocialism and Water (MINEA)",
            "role": "Programmer",
            "description": "Comprehensive automation of institutional workflows through the design and development of digital platforms based on MVC architecture and relational data management optimization.",
            "achievements": [
                "Designed and developed interactive web applications focused on attendance control, overtime management, and internal Human Resources audits.",
                "Built complex queries and PL/SQL scripts for massive data migration under strict integrity criteria.",
                "Integrated centralized modules for mass communications through strategic consumption of external APIs.",
                "Timely diagnosis of bugs and backend optimization on PostgreSQL and MySQL platforms."
            ],
            "stack": ["PHP", "PL/SQL", "PostgreSQL", "MySQL", "Bootstrap 3", "jQuery", "JavaScript", "HTML5 / CSS3"]
        }
    ],
    "projects": [
        {
            "id": "sistema-melquiades",
            "title": "Melquiades System",
            "category": "Fullstack",
            "description": "Modern corporate platform built with decoupled architecture for internal process optimization.",
            "fullDesc": "Comprehensive design of high-performance backend endpoints with Django REST Framework and structuring of interactive, reusable Angular frontend components. The system stands out for advanced JSON structure management and asynchronous flows.",
            "metrics": "Raised maintainability and scalability standards through strict code audits.",
            "tech": ["Python", "Django Rest Framework", "Angular", "Oracle DB", "Bootstrap 3", "GIT", "HTML5", "CSS"],
            "type": "laboral",
            "featured": True
        },
        {
            "id": "sistema-manakaind",
            "title": "Manakaind System",
            "category": "Fullstack",
            "description": "Core engine for insurance premium management, pricing, and insertion in Python and Django.",
            "fullDesc": "Structural re-engineering and modification of the central HCM policy quotation process. Automates parameterized insertion of rates and premiums for policyholders and beneficiaries, incorporating advanced search filters, medical/technical document uploads in underwriting, and dynamic PDF request generation.",
            "metrics": "Substantial reduction in quotation time and optimization of underwriting flows.",
            "tech": ["Python", "Django", "Oracle DB", "Bootstrap 3", "jQuery", "GIT", "PDF Generation"],
            "type": "laboral",
            "featured": True
        },
        {
            "id": "sigefor",
            "title": "SIGEFOR",
            "category": "Fullstack",
            "description": "Control and audit system for national electronic forest product guides.",
            "fullDesc": "Developed to ensure legality and tracking of forest products in transit nationwide. SIGEFOR validates electronic signatures, stores ministerial permits, and facilitates real-time forest inspections.",
            "metrics": "Used by more than 50 inspectors at checkpoints nationwide.",
            "tech": ["PHP", "PostgreSQL", "JavaScript", "Bootstrap 3", "jQuery", "Linux", "HTML5", "CSS"],
            "type": "universitario",
            "featured": True
        },
        {
            "id": "registro-horas-extras",
            "title": "Overtime Management System",
            "category": "Fullstack",
            "description": "Attendance and overtime automation platform for MINEA.",
            "fullDesc": "Development of a centralized system for attendance control and overtime computation for ministerial staff under MVC architecture. Includes a robust advanced reporting architecture oriented to Human Resources department audits.",
            "metrics": "Full digitalization and transparency of institutional attendance processes.",
            "tech": ["PHP", "PostgreSQL", "Bootstrap 3", "jQuery", "JavaScript", "HTML5", "CSS"],
            "type": "laboral",
            "featured": False
        },
        {
            "id": "control-ingreso-egreso",
            "title": "Entry and Exit Control System",
            "category": "Fullstack",
            "description": "Digital staff audit platform based on relational databases.",
            "fullDesc": "Software solution dedicated to accurately recording staff movements within the institution, linking dynamic user interfaces with properly normalized MySQL databases.",
            "metrics": "Guaranteed data integrity and real-time auditable access logs.",
            "tech": ["PHP", "MySQL", "Bootstrap 3", "jQuery", "JavaScript"],
            "type": "laboral",
            "featured": False
        },
        {
            "id": "sirebip",
            "title": "SIREBIP",
            "category": "Fullstack",
            "description": "Public Assets Registry System for institutional asset control at MINEA.",
            "fullDesc": "Audits and controls the physical and technological assets of the ministry. Automatically generates assignment sheets by department and asset transfer histories, with digital report signing.",
            "metrics": "Accurate control of more than 15,000 ministerial physical assets.",
            "tech": ["PHP", "jQuery", "PostgreSQL", "CSS", "Apache"],
            "type": "universitario",
            "featured": False
        },
        {
            "id": "kardex",
            "title": "Kardex Warehouse",
            "category": "Tools",
            "description": "Migration of the ministry's control and stock system to a free platform.",
            "fullDesc": "Complete migration of storage and control systems to open-source software. Includes control of consumables, stationery, and equipment inventories for the Ministry of the Environment.",
            "metrics": "100% savings in licensing costs on proprietary database.",
            "tech": ["Linux", "PHP", "PostgreSQL", "Apache", "Bash", "GIT", "Sourcetree", "Docker"],
            "type": "laboral",
            "featured": False
        }
    ],
    "skills": [
        {"name": "Python", "category": "Backend", "level": "Senior / Excellent", "usage": "Microservices design, robust APIs, and advanced automation."},
        {"name": "Django", "category": "Backend", "level": "Senior / Excellent", "usage": "Manakaind System development under efficient MTV patterns."},
        {"name": "Django REST Framework", "category": "Backend", "level": "Excellent", "usage": "High-performance endpoint construction (Melquiades System)."},
        {"name": "PHP", "category": "Backend", "level": "Advanced", "usage": "Institutional process automation and MVC logic at MINEA."},
        {"name": "ASP Classic", "category": "Backend", "level": "Advanced", "usage": "Evolutionary maintenance of high-priority insurance systems."},
        {"name": "C++", "category": "Backend", "level": "Intermediate", "usage": "Algorithmic development and academic inventory control systems."},
        {"name": ".NET / C#", "category": "Backend", "level": "Intermediate", "usage": "Corporate backend integrations and desktop logic."},
        {"name": "HTML5 / CSS3", "category": "Frontend", "level": "Excellent", "usage": "Semantic web design, responsive and clean structures."},
        {"name": "JavaScript ES6+", "category": "Frontend", "level": "Advanced", "usage": "Async client logic, interactivity, and JSON manipulation."},
        {"name": "Angular", "category": "Frontend", "level": "Advanced", "usage": "Modular SPA architecture and dynamic frontend components."},
        {"name": "Bootstrap 3", "category": "Frontend", "level": "Advanced", "usage": "Agile styling and adaptive design in cross-platform solutions."},
        {"name": "jQuery", "category": "Frontend", "level": "Advanced", "usage": "DOM tree optimization and asynchronous AJAX communication."},
        {"name": "AmCharts", "category": "Frontend", "level": "Intermediate", "usage": "Advanced reporting dashboards with dynamic charts."},
        {"name": "Crispy Forms", "category": "Frontend", "level": "Advanced", "usage": "Standardization and strict rendering of Django forms."},
        {"name": "Oracle DB", "category": "Databases", "level": "Excellent", "usage": "Hierarchical queries, PL/SQL optimization, and critical databases."},
        {"name": "PostgreSQL", "category": "Databases", "level": "Excellent", "usage": "Main relational schema at MINEA (Overtime, SIGEFOR, SIREBIP)."},
        {"name": "MySQL", "category": "Databases", "level": "Advanced", "usage": "Storage structures for access control and audits."},
        {"name": "SQL Server", "category": "Databases", "level": "Advanced", "usage": "Complex cross-relational queries and executive reporting."},
        {"name": "GIT", "category": "Tools", "level": "Excellent", "usage": "Distributed version control and production branch workflow."},
        {"name": "Sourcetree", "category": "Tools", "level": "Excellent", "usage": "Visual management and advanced repository and commit auditing."},
        {"name": "Docker", "category": "Tools", "level": "Advanced", "usage": "Containerization and virtual environments deployment."}
    ],
    "education": [
        {
            "period": "2015 - 2017",
            "degree": "Computer Engineer",
            "institution": "Universidad Colegio de Caracas",
            "detail": "Training focused on software system auditing, advanced relational database administration, and complex algorithm optimization.",
            "projects": "SIGEFOR (Forest Guide Quality Management) and SIREBIP (Institutional Public Assets Registry)."
        },
        {
            "period": "2012 - 2015",
            "degree": "Higher Technician in Computing",
            "institution": "Universidad Colegio de Caracas",
            "detail": "Specialization in high-level algorithmic logic, relational data modeling, and structured software development principles.",
            "projects": "Warehouse Kardex (Migration to open platform) and C++ inventory system development."
        }
    ]
}
