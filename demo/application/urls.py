from django.conf.urls import include
from django.urls import path
from django.contrib import admin
from jet.dashboard.dashboard_modules import google_analytics_views

admin.autodiscover()

urlpatterns = [
    path("jet/", include("jet.urls", "jet")),
    path("jet/dashboard/", include("jet.dashboard.urls", "jet-dashboard")),
    path("admin/", admin.site.urls),
]
