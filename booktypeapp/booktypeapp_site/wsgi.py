"""
This module contains the WSGI application used by Django's development server
and any production WSGI deployments. It should expose a module-level variable
named ``application``. Django's ``runserver`` and ``runfcgi`` commands discover
this application via the ``WSGI_APPLICATION`` setting.

Usually you will have the standard Django WSGI application here, but it also
might make sense to replace the whole Django WSGI application with a custom one
that later delegates to the Django one. For example, you could introduce WSGI
middleware here, or combine a Django application with an application of another
framework.

"""
import os
import sys

# EDIT THIS VALUE
VIRTUAL_PATH='env'

if VIRTUAL_PATH != '':
    activate_this = '{}/bin/activate_this.py'.format(VIRTUAL_PATH)
    execfile(activate_this, dict(__file__=activate_this))

from unipath import Path

BASE_DIR = Path(os.path.abspath(__file__)).ancestor(2)

sys.path.insert(0, BASE_DIR)
sys.path.insert(0, BASE_DIR.child("lib"))
sys.path.insert(0, '/home/vasilis/SourceFabric/Booktype/lib/')

# We defer to a DJANGO_SETTINGS_MODULE already in the environment. This breaks
# if running multiple sites in the same mod_wsgi process. To fix this, use
# mod_wsgi daemon mode with each site in its own daemon process, or use

os.environ["DJANGO_SETTINGS_MODULE"] = "booktypeapp_site.settings.dev"
#os.environ.setdefault("DJANGO_SETTINGS_MODULE", "booktypeapp_site.settings.dev")

# Initialise celery
import djcelery
djcelery.setup_loader()

# This application object is used by any WSGI server configured to use this
# file. This includes Django's development server, if the WSGI_APPLICATION
# setting points here.
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
