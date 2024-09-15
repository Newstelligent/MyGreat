# backend/app/routers/pdf.py
from fastapi import APIRouter, UploadFile, File, Form
from app.services.pdf_service import PDFService
from fastapi.responses import FileResponse
import os

router = APIRouter()
pdf_service = PDFService()

@router.post("/upload/")
async def upload_pdf(file: UploadFile = File(...)):
    field_names = await pdf_service.extract_fields(file)
    return {"fields": field_names}

@router.post("/fill/")
async def fill_pdf(file: UploadFile = File(...), data: str = Form(...)):
    output_path = await pdf_service.fill_pdf(file, data)
    filename = os.path.basename(output_path)
    return FileResponse(
        output_path,
        media_type='application/pdf',
        filename=filename,
    )
