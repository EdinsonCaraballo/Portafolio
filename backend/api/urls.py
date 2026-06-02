from django.urls import path
from .views import (
    PortfolioView, ProfileView, ExperienceListView,
    ProjectListView, SkillListView, EducationListView,
    contact_message
)

urlpatterns = [
    path('portfolio/', PortfolioView.as_view(), name='portfolio-unified'),
    path('profile/', ProfileView.as_view(), name='profile-detail'),
    path('experiences/', ExperienceListView.as_view(), name='experience-list'),
    path('projects/', ProjectListView.as_view(), name='project-list'),
    path('skills/', SkillListView.as_view(), name='skill-list'),
    path('educations/', EducationListView.as_view(), name='education-list'),
    path('contact/', contact_message, name='contact-message'),
]
