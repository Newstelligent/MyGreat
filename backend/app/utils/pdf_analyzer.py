# backend/app/utils/pdf_analyzer.py
import fitz  # PyMuPDF
from typing import List
from dataclasses import dataclass

@dataclass
class Field:
    name: str
    field_type: str
    x0: float
    y0: float
    x1: float
    y1: float

class PDFAnalyzer:
    def __init__(self, file_path):
        self.file_path = file_path

    def get_fields(self) -> List[str]:  # We're returning a list of field names
        doc = fitz.open(self.file_path)
        fields = []

        for page_index in range(len(doc)):
            page = doc[page_index]
            widgets = page.widgets()
            if widgets is None:
                continue

            for widget in widgets:
                field_name = widget.field_name
                field_type = widget.field_type  # Field type (e.g., Text, Checkbox)
                rect = widget.rect  # Position of the field

                # Create a Field object
                field = Field(
                    name=field_name,
                    field_type=field_type,
                    x0=rect.x0,
                    y0=rect.y0,
                    x1=rect.x1,
                    y1=rect.y1
                )
                fields.append(field)

        # Sort fields using a custom method
        sorted_fields = self.sort_fields(fields)

        # Extract just the field names from the sorted fields
        field_names_ordered = [field.name for field in sorted_fields]

        # Return the list of field names
        return field_names_ordered

    def sort_fields(self, fields: List[Field]) -> List[Field]:
        # Define a threshold for line height
        line_threshold = 15  # Adjust based on PDF's font size and spacing

        # Group fields by rows based on y-coordinate
        rows = {}
        for field in fields:
            y = field.y0
            # Find existing row close to current y
            row_key = None
            for key in rows:
                if abs(key - y) < line_threshold:
                    row_key = key
                    break
            if row_key is None:
                row_key = y
                rows[row_key] = []
            rows[row_key].append(field)

        # Sort rows from top to bottom
        sorted_row_keys = sorted(rows.keys())

        sorted_fields = []
        for row_key in sorted_row_keys:
            # Sort fields in the row from left to right
            row_fields = rows[row_key]
            row_fields_sorted = sorted(row_fields, key=lambda f: f.x0)
            sorted_fields.extend(row_fields_sorted)

        return sorted_fields
