import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_backend.settings')
wsgi = get_wsgi_application()
