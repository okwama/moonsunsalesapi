import csv
import os

def csv_to_sql_insert():
    # Read the CSV file
    csv_file_path = '../kcc_sales_force/clients.csv'
    sql_file_path = 'clients_insert.sql'
    
    # Default values for required fields
    default_values = {
        'region_id': 1,  # Assuming Nairobi region has ID 1
        'countryId': 1,  # Assuming Kenya has ID 1
        'contact': 'N/A',  # Required field
        'status': 1,  # Active status
        'added_by': 1,  # Default user ID
    }
    
    sql_statements = []
    sql_statements.append("-- Insert clients from CSV")
    sql_statements.append("INSERT INTO `Clients` (`name`, `region`, `location`, `region_id`, `countryId`, `contact`, `status`, `added_by`) VALUES")
    
    with open(csv_file_path, 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        
        for i, row in enumerate(reader):
            # Clean and escape the data
            name = row['Outlet Name'].replace("'", "''")
            region = row['Region'].replace("'", "''")
            location = row['Location'].replace("'", "''")
            
            # Create the VALUES clause
            values = f"('{name}', '{region}', '{location}', {default_values['region_id']}, {default_values['countryId']}, '{default_values['contact']}', {default_values['status']}, {default_values['added_by']})"
            
            if i == 0:
                sql_statements.append(values)
            else:
                sql_statements.append(f",{values}")
    
    sql_statements.append(";")
    
    # Write to SQL file
    with open(sql_file_path, 'w', encoding='utf-8') as sqlfile:
        sqlfile.write('\n'.join(sql_statements))
    
    print(f"SQL insert statements written to {sql_file_path}")
    print(f"Total clients to insert: {len(list(csv.DictReader(open(csv_file_path, 'r', encoding='utf-8'))))}")

if __name__ == "__main__":
    csv_to_sql_insert()
