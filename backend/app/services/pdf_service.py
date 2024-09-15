# backend/app/services/pdf_service.py
import os
import uuid
from app.utils.pdf_analyzer import PDFAnalyzer
from app.utils.pdf_populator import PDFPopulator
from fastapi import UploadFile

class PDFService:
    async def extract_fields(self, file: UploadFile):
        temp_file = await self._save_temp_file(file)
        analyzer = PDFAnalyzer(temp_file)
        fields = analyzer.get_fields()
        os.remove(temp_file)
        return fields

    async def fill_pdf(self, file: UploadFile, data: str):
        temp_file = await self._save_temp_file(file)
        populator = PDFPopulator(temp_file)
        output_file = f"filled_{uuid.uuid4()}.pdf"
        populator.fill_pdf(data, output_file)
        os.remove(temp_file)
        return output_file

    async def _save_temp_file(self, file: UploadFile):
        temp_filename = f"temp_{uuid.uuid4()}_{file.filename}"
        with open(temp_filename, 'wb') as buffer:
            buffer.write(await file.read())
        return temp_filename
