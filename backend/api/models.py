from django.db import models
from django.contrib.auth.models import User


class VaultItem(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('research', 'Research Phase'),
        ('planning', 'Planning'),
        ('development', 'In Development'),
        ('testing', 'Testing'),
        ('launched', 'Launched'),
        ('archived', 'Archived'),
    ]
    
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]
    
    COMPETITION_LEVEL_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]

    CATEGORY_CHOICES = [
        ('Tech', 'Tech'),
        ('Health', 'Health'),
        ('Finance', 'Finance'),
        ('Education', 'Education'),
        ('E-commerce', 'E-commerce'),
        ('Social', 'Social'),
        ('Gaming', 'Gaming'),
        ('Other', 'Other'),
    ]

    
    title = models.CharField(max_length=100)
    content = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES, blank=True)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    market_potential = models.IntegerField(default=1)
    target_audience = models.TextField(blank=True)
    revenue_model = models.TextField(blank=True)
    competition_level = models.CharField(max_length=10, choices=COMPETITION_LEVEL_CHOICES, default='medium')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="vault_items")

    def __str__(self):
        return self.title


# class VaultItem(models.Model):
#     title = models.CharField(max_length=100)
#     content = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)
#     author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="vault_items")

#     def __str__(self):
#         return self.title
    