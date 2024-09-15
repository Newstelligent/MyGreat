# backend/app/utils/pdf_analyzer.py
from PyPDF2 import PdfReader

class PDFAnalyzer:
    def __init__(self, file_path):
        self.file_path = file_path

    def get_fields(self):
        reader = PdfReader(self.file_path)
        fields = reader.get_fields()
        if fields is None:
            return []
        field_order = list(fields.keys())
        return field_order
