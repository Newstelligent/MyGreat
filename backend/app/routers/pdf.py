# backend/app/routers/pdf.py
from fastapi import APIRouter, UploadFile, File, Form
from services.pdf_service import PDFService
from fastapi.responses import FileResponse
import os

router = APIRouter()
pdf_service = PDFService()

@router.post("/upload/")
async def upload_pdf(file: UploadFile = File(...)):
    fields = await pdf_service.extract_fields(file)
    return {"fields": fields}
