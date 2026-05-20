## Backend Testing

### Root API

Open:

```txt
http://localhost:5000
```

Expected result:

```txt
Developer Portfolio Generator API is running
```

### Fetch Portfolio API

Open:

```txt
http://localhost:5000/api/portfolio/sahiru3
```

Expected result:

```json
{
  "success": true,
  "data": {}
}
```

If the portfolio does not exist, this is still fine:

```json
{
  "success": false,
  "message": "Portfolio not found"
}
```

## Frontend Testing

Open:

```txt
http://localhost:5173
```

Test these pages:

```txt
/
 /create
 /preview
 /portfolio/sahiru3
 /edit/sahiru3
```

## Manual Form Test

```txt
1. Create a new portfolio manually
2. Use a new username
3. Preview it
4. Publish it
5. Check public portfolio page
6. Check backend API JSON
```

## CV Import Test

```txt
1. Go to Create Portfolio
2. Upload a PDF CV
3. Check if form fields auto fill
4. Manually edit anything incorrect
5. Preview
6. Publish
7. Check public portfolio page
```

## Error Testing

```txt
Try creating a portfolio with an existing username.
Try opening a portfolio URL that does not exist.
Try uploading a non PDF file for CV import.
Try submitting required fields empty.
```
