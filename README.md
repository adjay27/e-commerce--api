# API DOCUMENTATION
### Authentication Routes
```bash
POST /api/login
```
Handles user authentication requests. Example body request:
```json
{
	"email": "louie99@gmail.com",
	"password": "password"
}
```

### Products Routes
```bash
GET /api/products
```
Retrieve all products


```bash
GET /api/products/{id}
```
Retrieve a product by id

