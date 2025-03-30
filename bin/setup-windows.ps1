# Simple setup script for Tune

# Step 0: Welcome and confirmation
Write-Host ""
Write-Host "This script will:"
Write-Host " - Clone the Tune repository"
Write-Host " - Set up dependencies in /app and /backend"
Write-Host ""
Read-Host "Press ENTER to continue..."

# Step 1: Clone the repo
if (Test-Path "tune") {
    Write-Host "The folder 'tune' already exists. Please delete or rename it before running this script."
    exit
}

Write-Host "`nCloning repository..."
git clone https://github.com/tune-co/tune
if ($LASTEXITCODE -ne 0) {
    Write-Host "Git clone failed. Make sure git is installed."
    exit
}

# Step 2: Install frontend dependencies
Write-Host "`nInstalling frontend dependencies in /app..."
Set-Location "tune\app"
npm install
Set-Location ..

# Step 3: Install backend dependencies
Write-Host "`nInstalling backend dependencies in /backend..."
Set-Location "backend"
npm install
Set-Location ../..

Write-Host "`n✅ Setup complete!"
Write-Host "You can now run the dev servers:"
Write-Host "  cd tune\app     then: npm run dev"
Write-Host "  cd tune\backend then: npm run dev"
