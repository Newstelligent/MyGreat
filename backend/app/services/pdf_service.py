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
        # Convert Field objects to dictionaries for JSON serialization
        fields_data = [
            {
                'name': field.name,
                'type': field.field_type,
                'x0': field.x0,
                'y0': field.y0,
                'x1': field.x1,
                'y1': field.y1,
            }
            for field in fields
        ]
        return fields_data

    # ... rest of the code remains the same ...
