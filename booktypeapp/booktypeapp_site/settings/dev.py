from .base import *

# WEB SITE URL

THIS_BOOKTYPE_SERVER = ''
BOOKTYPE_URL = ''
# BOOKTYPE_URL = 'http://{}'.format(THIS_BOOKTYPE_SERVER)

STATIC_URL = '{}/static/'.format(BOOKTYPE_URL)
DATA_URL = '{}/data/'.format(BOOKTYPE_URL)
MEDIA_URL = DATA_URL

# URL where is publishing engine located. By default it is on local machine.
CONVERT_URL = BOOKTYPE_URL

# MPDF RENDERER SETTINGS
# Change lines below in case you want to use other version
# of php or mpdf in dev profile
# PHP_PATH = 'php'
# MPDF_DIR = ''
# MPDF_SCRIPT = ''

# DEBUGGING
DEBUG = TEMPLATE_DEBUG = True
INTERNAL_IPS = ('127.0.0.1', '192.168.0.1')

# COMPRESSION
COMPRESS_ENABLED = False
COMPRESS_OFFLINE = False

# PROFILE
PROFILE_ACTIVE = 'dev'

# URL ROUTER
ROOT_URLCONF = '{}.urls.dev'.format(BOOKTYPE_SITE_DIR)

# DATABASE
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ.get('DB_NAME'),
        'USER':  os.environ.get('DB_USER'),
        'PASSWORD':  os.environ.get('DB_PASS'),
        'HOST':  os.environ.get('DB_SERVICE'),
        'PORT':  os.environ.get('DB_SERVICE_PORT'),
    }
}

# REDIS
REDIS_HOST =  os.environ.get('REDIS_HOST')
REDIS_PORT =  os.environ.get('REDIS_PORT')
REDIS_DB = 0
REDIS_PASSWORD = None

# E-MAIL
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# DEVELOPMENT TOOLS
try:
    import debug_toolbar
    DEBUG_TOOLBAR_PATCH_SETTINGS = False
    INSTALLED_APPS += ('debug_toolbar',)
    MIDDLEWARE_CLASSES += ('debug_toolbar.middleware.DebugToolbarMiddleware',)

    DEBUG_TOOLBAR_CONFIG = {
        'INTERCEPT_REDIRECTS': False,
        'SHOW_TOOLBAR_CALLBACK': lambda *args, **kwargs: True
    }
except ImportError:
    pass

# try:
#     import devserver
#     INSTALLED_APPS = ('devserver',) + INSTALLED_APPS
# except ImportError:
#     pass

# LOGGING
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'standard': {
            'format': "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s",  # noqa
            'datefmt': "%d/%b/%Y %H:%M:%S"
        },
    },
    'handlers': {
        'null': {
            'level': 'DEBUG',
            'class': 'django.utils.log.NullHandler',
        },
        'logfile': {
            'level': 'DEBUG',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': BOOKTYPE_ROOT + "/logs/booktype.log",
            'maxBytes': 50000,
            'backupCount': 2,
            'formatter': 'standard',
        },
        'sputniklogfile': {
            'level': 'DEBUG',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': BOOKTYPE_ROOT + "/logs/sputnik.log",
            'maxBytes': 50000,
            'backupCount': 2,
            'formatter': 'standard',
        },
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'standard'
        }
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'propagate': True,
            'level': 'WARN',
        },
        'django.db.backends': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'django.request': {
            'handlers': ['console'],
            'level': 'ERROR',
            'propagate': True,
        },
        'booktype': {
            'handlers': ['logfile'],
            'level': 'DEBUG'
        },
        'sputnik': {
            'handlers': ['sputniklogfile'],
            'level': 'DEBUG'
        }
    }
}

# READ CONFIGURAION
from booktype.utils import config

try:
    BOOKTYPE_CONFIG = config.load_configuration()
except config.ConfigurationError:
    BOOKTYPE_CONFIG = {}
