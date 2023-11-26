import os
import sys

def generate_html(folder_path):
    try:
        # Get the list of files in the specified folder
        files = os.listdir(folder_path)

        # Create or open an HTML file for writing
        with open("file_list.html", "w", encoding="utf-8") as html_file:
            # Write the HTML header
            html_file.write("<html>\n<head>\n<title>File List</title>\n</head>\n<body>\n")

            # Write the list of files as an unordered list
            html_file.write("<h2>Files in the folder:</h2>\n<ul>\n")
            for file in files:
                html_file.write(f"<li>{file}</li>\n")
            html_file.write("</ul>\n")

            # Write the HTML footer
            html_file.write("</body>\n</html>")

        print("HTML file generated successfully: file_list.html")

    except FileNotFoundError:
        print("Error: Folder not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py <folder_path>")
    else:
        folder_path = sys.argv[1]
        generate_html(folder_path)
