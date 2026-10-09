from django.urls import path
from . import views


urlpatterns = [
    path("students/", views.students, name="students"),
    path(
        "students/<int:id>/",
        views.student_detail,
        name="student-detail"
    ),
]