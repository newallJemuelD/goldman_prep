from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Student
from .serializers import StudentSerializer


@api_view(["GET", "POST"])
def students(request):

    # GET /students
    if request.method == "GET":
        students_list = Student.objects.all().order_by("id")
        serializer = StudentSerializer(students_list, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    # POST /students
    if request.method == "POST":
        serializer = StudentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["GET", "PATCH"])
def student_detail(request, id):

    try:
        student = Student.objects.get(id=id)
    except Student.DoesNotExist:
        return Response(
            status=status.HTTP_404_NOT_FOUND
        )

    # GET /students/<id>
    if request.method == "GET":
        serializer = StudentSerializer(student)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    # PATCH /students/<id>
    if request.method == "PATCH":
        serializer = StudentSerializer(
            student,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )