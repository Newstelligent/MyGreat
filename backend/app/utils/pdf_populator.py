# backend/app/utils/pdf_populator.py
import fitz  # PyMuPDF
import json

class PDFPopulator:
    def __init__(self, file_path):
        self.file_path = file_path

    def fill_pdf(self, data_str, output_path):
        data = json.loads(data_str)
        doc = fitz.open(self.file_path)

        for page_index in range(len(doc)):
            page = doc[page_index]
            widgets = page.widgets()
            if widgets is None:
                continue

            for widget in widgets:
                field_name = widget.field_name
                field_type = widget.field_type

                if field_name in data:
                    value = data[field_name]
                    # Handle different field types
                    if field_type == 0:  # Text field
                        widget.field_value = value
                    elif field_type == 1:  # Checkbox
                        # Set value to 'Yes' or 'Off' depending on the input
                        widget.field_value = 'Yes' if value.lower() in ['yes', 'true', '1', 'on'] else 'Off'
                    elif field_type == 2:  # Radio button
                        widget.field_value = value  # Value should match the radio option name
                    elif field_type == 3:  # Push button
                        pass  # Typically, we don't set values for buttons
                    elif field_type == 4:  # Combo box (dropdown)
                        widget.field_value = value
                    elif field_type == 5:  # List box
                        widget.field_value = value
                    else:
                        pass  # Handle other field types as needed

                    widget.update()  # Apply the changes to the widget

        doc.save(output_path)
        doc.close()
