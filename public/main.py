import os
import csv
import shutil
import subprocess
import traceback
from datetime import datetime
import pandas as pd

def debug_message(message):
    """Print debugging messages."""
    print(f"[DEBUG] {message}")

def list_brave_prefetch_files():
    """List only Brave-related Prefetch files and count them."""
    prefetch_dir = r"C:\Windows\Prefetch"
    try:
        if not os.path.exists(prefetch_dir):
            debug_message(f"Prefetch directory not found: {prefetch_dir}")
            return []

        # Filter Prefetch files that contain 'BRAVE'
        files = [file for file in os.listdir(prefetch_dir) if "BRAVE" in file.upper() and file.endswith(".pf")]
        debug_message(f"Found {len(files)} Brave Prefetch files.")
        return files
    except Exception as e:
        debug_message(f"Error listing Prefetch files: {e}")
        traceback.print_exc()
        return []

def copy_prefetch_files(prefetch_files, target_folder):
    """Copy Prefetch files to a specified folder."""
    prefetch_dir = r"C:\Windows\Prefetch"
    if not os.path.exists(target_folder):
        os.makedirs(target_folder)
    for file_name in prefetch_files:
        source_path = os.path.join(prefetch_dir, file_name)
        destination_path = os.path.join(target_folder, file_name)
        try:
            shutil.copy2(source_path, destination_path)
            print(f"Copied: {file_name}")
        except Exception as e:
            debug_message(f"Error copying {file_name}: {e}")
            traceback.print_exc()

def export_brave_prefetch_details_to_csv(prefetch_files, data_folder):
    """Export detailed Brave Prefetch file info (timestamps) to CSV."""
    try:
        prefetch_dir = r"C:\Windows\Prefetch"
        details = []
        for file_name in prefetch_files:
            file_path = os.path.join(prefetch_dir, file_name)
            stats = os.stat(file_path)
            details.append({
                "File Name": file_name,
                "Full Path": file_path,
                "Creation Time": datetime.fromtimestamp(stats.st_ctime).strftime('%Y-%m-%d %H:%M:%S'),
                "Last Access Time": datetime.fromtimestamp(stats.st_atime).strftime('%Y-%m-%d %H:%M:%S'),
                "Last Modification Time": datetime.fromtimestamp(stats.st_mtime).strftime('%Y-%m-%d %H:%M:%S'),
            })

        # Export to CSV
        prefetch_details_csv_path = os.path.join(data_folder, "brave_default_prefetch_timestamps.csv")
        with open(prefetch_details_csv_path, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=details[0].keys())
            writer.writeheader()
            writer.writerows(details)
        print(f"Brave Prefetch details exported to: {prefetch_details_csv_path}")
    except Exception as e:
        debug_message(f"Error exporting Brave Prefetch details to CSV: {e}")
        traceback.print_exc()

def write_prefetch_file_names_to_csv(prefetch_files, data_folder):
    """Write the names of Prefetch files into a CSV file."""
    try:
        prefetch_output_csv_path = os.path.join(data_folder, "brave_default_prefetch_names.csv")
        with open(prefetch_output_csv_path, 'w', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(["Prefetch File Name"])  # Column header
            for file_name in prefetch_files:
                writer.writerow([file_name])  # Write each file name in a new row
        print(f"Prefetch file names saved to: {prefetch_output_csv_path}")
    except Exception as e:
        debug_message(f"Error writing Prefetch file names to CSV: {e}")
        traceback.print_exc()

def execute_history_command(data_folder):
    """Execute the History command to process Brave data."""
    try:
        command = [".\\history.exe", "-b", "brave", "-f", "csv", "--dir", data_folder]
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        print(f"Command Output:\n{result.stdout}")
        if result.stderr:
            print(f"Command Errors:\n{result.stderr}")
    except Exception as e:
        debug_message(f"Error executing History command: {e}")
        traceback.print_exc()

def execute_pe_cmd_command(data_folder):
    """Execute the PECmd command to process the Prefetch data."""
    try:
        prefetch_folder = os.path.join(os.getcwd(), "prefetch")
        output_csv = os.path.join(data_folder, "brave_default_prefetch_details.csv")
        command_csv = [".\\PECmd.exe", "-d", prefetch_folder, "--csv", data_folder, "--csvf", output_csv]
        result_csv = subprocess.run(command_csv, shell=True, capture_output=True, text=True)
        print(f"Command Output (CSV):\n{result_csv.stdout}")
        if result_csv.stderr:
            print(f"Command Errors:\n{result_csv.stderr}")
    except Exception as e:
        debug_message(f"Error executing PECmd command: {e}")
        traceback.print_exc()

def convert_to_dynamic_hex(df, column_name=None, bytes_per_row=16):
    """
    Convert the specified DataFrame column or first column to a dynamic hex format.
    """
    hex_table = []
    address = 0

    # Use the first column if no specific column is provided
    target_column = column_name or df.columns[0]

    for value in df[target_column].dropna():
        row_string = str(value)
        row_hex = [f'{ord(char):02x}' for char in row_string]

        for i in range(0, len(row_hex), bytes_per_row):
            chunk = row_hex[i:i + bytes_per_row]
            hex_chunk = " ".join(chunk)
            original_chunk = row_string[i:i + bytes_per_row]
            hex_table.append(f"{address:08x} | {hex_chunk:<48} | {original_chunk}")
            address += bytes_per_row

    return hex_table

def process_and_convert_to_hex(data_folder, column_name=None):
    """
    Process all CSV files in the data folder and convert the specified or first column to hex.
    Save results in a new 'hex' folder.
    """
    try:
        hex_folder = os.path.join(data_folder, "hex")
        if not os.path.exists(hex_folder):
            os.makedirs(hex_folder)

        for file_name in os.listdir(data_folder):
            file_path = os.path.join(data_folder, file_name)
            if file_name.endswith(".csv") and os.path.isfile(file_path):
                try:
                    df = pd.read_csv(file_path)
                    if df.empty:
                        debug_message(f"File '{file_name}' is empty. Skipping.")
                        continue

                    target_column = column_name if column_name in df.columns else df.columns[0]
                    debug_message(f"Processing file: {file_name}, column: {target_column}")
                    hex_data = convert_to_dynamic_hex(df, target_column)
                    hex_output_file = os.path.join(hex_folder, f"{file_name}_hex.txt")
                    with open(hex_output_file, 'w') as hex_file:
                        hex_file.write("\n".join(hex_data))
                    print(f"Hex conversion completed for file: {hex_output_file}")
                except Exception as e:
                    debug_message(f"Error processing file '{file_name}': {e}")
                    traceback.print_exc()
    except Exception as e:
        debug_message(f"Error creating hex folder or processing files: {e}")
        traceback.print_exc()

if __name__ == "__main__":
    try:
        # Ensure data folder exists
        data_folder = os.path.join(os.getcwd(), "data")
        if not os.path.exists(data_folder):
            os.makedirs(data_folder)

        # Step 1: Execute History command for Brave browser
        execute_history_command(data_folder)

        # Step 2: Get the list of Brave Prefetch files and copy them
        brave_prefetch_files = list_brave_prefetch_files()
        if brave_prefetch_files:
            prefetch_folder = os.path.join(os.getcwd(), "prefetch")
            copy_prefetch_files(brave_prefetch_files, prefetch_folder)

            # Step 3: Write the list of Prefetch file names to brave_default_prefetch_names.csv
            write_prefetch_file_names_to_csv(brave_prefetch_files, data_folder)

            # Step 4: Export detailed Brave Prefetch file info to brave_default_prefetch_timestamps.csv
            export_brave_prefetch_details_to_csv(brave_prefetch_files, data_folder)

        # Step 5: Execute PECmd command to process Prefetch files from the 'prefetch' folder
        execute_pe_cmd_command(data_folder)

        # Step 6: Convert first or specified column to hex format
        process_and_convert_to_hex(data_folder)

    except Exception as e:
        debug_message(f"Critical error in execution: {e}")
        traceback.print_exc()
