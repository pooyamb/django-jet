==========
Django JET - Forked
==========

.. image:: https://travis-ci.org/pooyamb/django-jet.svg?branch=master
    :target: https://travis-ci.org/pooyamb/django-jet

**Modern template for Django admin interface with improved functionality**

Note
====
This is my personal fork of django jet, please read changelog if you want to use it.
I'm not interested in merging this repo with main django jet, as they didn't accept pull requests
for a long time now, instead I will maintain this repo myself and for my own projects.
I won't maintain old django versions compablity and old python versions too,
so if you don't use django +2 and python +3.6, you may end up with errors

Features(This fork)
============
* Updated all the JS dependencies
* JQuery.cookie replaced by js-cookie
* No JQuery UI
* JQuery UI datetpicker and timepicker replaced by Flatpickr date/time picker
* JQuery UI drag and drop replaced by JQuery-sortablejs
* JQuery UI dialog replaced by alertifyjs
* JQuery UI tooltip replaced by tooltipster
* Some of the bugs from main repo are fixed(and some new bugs added to the code)

TODO
=====
High priority
* Tests are broken
* Needs new tests(main repo needs them too!)
* Documentations are obselete right now
* Fixing some bugs here and there
Low priority
* Add dark themes
* Abblity to use a dark and light theme at the same time(with a switch)
* Support RTL and other date formats, or maybe just themes for the existing packages

Introduction
============

.. image:: https://raw.githubusercontent.com/geex-arts/jet/static/logo.png
    :width: 500px
    :height: 500px
    :scale: 50%
    :alt: Logo
    :align: center
    
* Live Demo: http://demo.jet.geex-arts.com/admin/
* Documentation: http://jet.readthedocs.org/
* PyPI: https://pypi.python.org/pypi/django-jet

Why Django JET?
===============

* New fresh look
* Responsive mobile interface
* Useful admin home page
* Minimal template overriding
* Easy integration
* Themes support
* Autocompletion
* Handy controls

Screenshots
===========

.. image:: https://raw.githubusercontent.com/geex-arts/django-jet/static/screen1_720.png
    :alt: Screenshot #1
    :align: center
    :target: https://raw.githubusercontent.com/geex-arts/django-jet/static/screen1.png
    
.. image:: https://raw.githubusercontent.com/geex-arts/django-jet/static/screen2_720.png
    :alt: Screenshot #2
    :align: center
    :target: https://raw.githubusercontent.com/geex-arts/django-jet/static/screen2.png
    
.. image:: https://raw.githubusercontent.com/geex-arts/django-jet/static/screen3_720.png
    :alt: Screenshot #3
    :align: center
    :target: https://raw.githubusercontent.com/geex-arts/django-jet/static/screen3.png

Installation
============

* Download and install latest version of Django JET:

.. code:: python

    pip install django-jet

* Add 'jet' application to the INSTALLED_APPS setting of your Django project settings.py file (note it should be before 'django.contrib.admin'):

.. code:: python

    INSTALLED_APPS = (
        ...
        'jet',
        'django.contrib.admin',
    )
        
* Make sure ``django.template.context_processors.request`` context processor is enabled in settings.py (Django 1.8+ way):

.. code:: python

    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [],
            'APP_DIRS': True,
            'OPTIONS': {
                'context_processors': [
                    ...
                    'django.template.context_processors.request',
                    ...
                ],
            },
        },
    ]

* Add URL-pattern to the urlpatterns of your Django project urls.py file (they are needed for related–lookups and autocompletes):

.. code:: python

    urlpatterns = patterns(
        '',
        url(r'^jet/', include('jet.urls', 'jet')),  # Django JET URLS
        url(r'^admin/', include(admin.site.urls)),
        ...
    )

* Create database tables:

.. code:: python

    python manage.py migrate jet
        
* Collect static if you are in production environment:

.. code:: python

        python manage.py collectstatic
        
* Clear your browser cache

Dashboard installation
======================

.. note:: Dashboard is located into a separate application. So after a typical JET installation it won't be active.
          To enable dashboard application follow these steps:

* Add 'jet.dashboard' application to the INSTALLED_APPS setting of your Django project settings.py file (note it should be before 'jet'):

.. code:: python

    INSTALLED_APPS = (
        ...
        'jet.dashboard',
        'jet',
        'django.contrib.admin',
        ...
    )

* Add URL-pattern to the urlpatterns of your Django project urls.py file (they are needed for related–lookups and autocompletes):

.. code:: python

    urlpatterns = [
        '',
        path('^jet/', include('jet.urls', 'jet')),  # Django JET URLS
        path('^jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),  # Django JET dashboard URLS
        path('^admin/', include(admin.site.urls)),
        ...
    ]

* **For Google Analytics widgets only** install python package:

.. code::

    pip install google-api-python-client==1.4.1

* Create database tables:

.. code:: python

    python manage.py migrate dashboard

* Collect static if you are in production environment:

.. code:: python

        python manage.py collectstatic

License
=======
AGPLv3
