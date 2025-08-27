# PowerShell script to convert CSV to SQL insert statements

$csvPath = "../kcc_sales_force/clients.csv"
$sqlPath = "clients_insert.sql"

# Read CSV content
$csvContent = Get-Content $csvPath -Encoding UTF8

# Parse CSV (skip header)
$lines = $csvContent | Select-Object -Skip 1

# Start SQL file
$sqlStatements = @()
$sqlStatements += "-- Insert clients from CSV"
$sqlStatements += "INSERT INTO `Clients` (`name`, `region`, `location`, `region_id`, `countryId`, `contact`, `status`, `added_by`) VALUES"

# Process each line
for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    
    # Handle CSV parsing more carefully
    $parts = @()
    $current = ""
    $inQuotes = $false
    
    for ($j = 0; $j -lt $line.Length; $j++) {
        $char = $line[$j]
        if ($char -eq '"') {
            $inQuotes = -not $inQuotes
        } elseif ($char -eq ',' -and -not $inQuotes) {
            $parts += $current.Trim()
            $current = ""
        } else {
            $current += $char
        }
    }
    $parts += $current.Trim()
    
    if ($parts.Count -ge 3) {
        $region = $parts[0].Trim('"')
        $name = $parts[1].Trim('"')
        $location = $parts[2].Trim('"')
        
        # Escape single quotes
        $name = $name -replace "'", "''"
        $region = $region -replace "'", "''"
        $location = $location -replace "'", "''"
        
        $values = "('$name', '$region', '$location', 1, 1, 'N/A', 1, 1)"
        
        if ($i -eq 0) {
            $sqlStatements += $values
        } else {
            $sqlStatements += ",$values"
        }
    }
}

$sqlStatements += ";"

# Write to SQL file
$sqlStatements | Out-File -FilePath $sqlPath -Encoding UTF8

Write-Host "SQL insert statements written to $sqlPath"
Write-Host "Total clients to insert: $($lines.Count)"
