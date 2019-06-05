import os
import django
from django.conf import global_settings

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

SECRET_KEY = '!DJANGO_JET_TESTS!'
SITE_ID = 1

DEBUG = True
TEMPLATE_DEBUG = DEBUG
DEBUG_PROPAGATE_EXCEPTIONS = True

ROOT_URLCONF = 'jet.tests.urls'

INSTALLED_APPS = (
    'jet.dashboard',
    'jet',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.admin',
    'django.contrib.staticfiles',
    'jet.tests',
)

MIDDLEWARE = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
)

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': (
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            )
        },
    }
]

DATABASES = {'default': {'ENGINE': 'django.db.backends.sqlite3', 'NAME': ':memory:'}}

TIME_ZONE = 'UTC'
LANGUAGE_CODE = 'en-US'
USE_I18N = True
USE_L10N = True

MEDIA_ROOT = ''
MEDIA_URL = ''

STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(os.path.dirname(BASE_DIR), 'jet/static')


JET_INDEX_DASHBOARD = 'jet.tests.dashboard.TestIndexDashboard'
JET_APP_INDEX_DASHBOARD = 'jet.tests.dashboard.TestAppIndexDashboard'
