import pandas as pd

def load_google_sheets_data(file_path):
    df = pd.read_excel(file_path)
    return df

# Example use
file_path = 'https://docs.google.com/spreadsheets/d/1VEZc5l9bwDv-KN4SAMRo5w3FWNYlAlPTnmzJfJ8Fjuw/edit?gid=1444130644#gid=1444130644'
data = load_google_sheets_data(file_path)
print(data.head())
