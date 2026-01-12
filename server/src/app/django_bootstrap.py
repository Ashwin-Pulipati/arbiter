from __future__ import annotations
import os
import django
from pathlib import Path

def bootstrap() -> None:
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
    django.setup()

def src_root() -> Path:
    return Path(__file__).resolve().parents[1]
