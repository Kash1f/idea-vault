from django.urls import path
from . import views

# we'll have two endpoints, one for viewing and creating vault items
urlpatterns = [
    path("items/", views.VaultItemListCreate.as_view(), name="item-list"),
    path("items/update/<int:pk>/", views.VaultItemUpdate.as_view(), name="update-item"),
    path("items/delete/<int:pk>/", views.VaultItemDelete.as_view(), name="delete-item"),
]