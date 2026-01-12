from django.contrib import admin
from .models import Document

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "owner", "is_deleted", "created_at")
    search_fields = ("title", "content")
    list_filter = ("is_deleted", "created_at")
