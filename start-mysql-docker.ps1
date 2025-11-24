# Quick start MySQL with Docker

# Make sure Docker is installed: https://www.docker.com/products/docker-desktop

# Step 1: Start MySQL container
docker run --name orkestra-mysql `
  -e MYSQL_ROOT_PASSWORD=root `
  -e MYSQL_DATABASE=orkestra `
  -p 3306:3306 `
  -d mysql:8.0

# Wait 10 seconds for MySQL to start
Start-Sleep -Seconds 10

# Step 2: Set environment variable
$env:DATABASE_URL = "mysql://root:root@localhost:3306/orkestra"

# Step 3: Run migrations
Write-Host "Running database migrations..."
pnpm run db:push

# Step 4: Start dev server
Write-Host "Starting dev server..."
pnpm dev

# To stop MySQL later:
# docker stop orkestra-mysql
# docker rm orkestra-mysql
