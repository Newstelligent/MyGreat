# backend/app/utils/pdf_populator.py
from PyPDF2 import PdfReader, PdfWriter
import json

class PDFPopulator:
    def __init__(self, file_path):
        self.file_path = file_path

    def fill_pdf(self, data_str, output_path):
        data = json.loads(data_str)
        reader = PdfReader(self.file_path)
        writer = PdfWriter()

        for page in reader.pages:
            writer.add_page(page)

        if writer.get_fields() is None:
            writer.add_blank_page()

        writer.update_page_form_field_values(writer.pages[0], data)

        with open(output_path, 'wb') as out:
            writer.write(out)
