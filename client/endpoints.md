# endpoints convention

## proxy: https://localhost:8081 (replaced by "/api" in code)\

1. clothing image upload: `/api/save-clothing`

   - method: POST
   - function: saves a new clothing into the server
   - format: `FormData(Blob(string))`
   - if successful: "
   - if failed:

2. process image `/api/processed-image`

   - method: GET
   - server send the processed image and ID to the client as a square with transparent background
   - ID: `integer`

3. save tag `/api/save-tag`

   - method: POST
   - client send integer and then append array of string of tags

4. get all cloth `/api/get-all-cloth`

   - method: GET
   - client ask for clothing ID, clothing path, clothing tag
   - receive list of clothing path
   - array of triples

5. get single clothing image `/api/get-single-cloth`

   - method: GET
   - client ask for one clothing image at a time

6. save canvas `/api/save-canvas`
   - method: POST
   - client send 2D array
   - [canvas ID: int, clothingID: string, xposition: double, yposition: double, width: double, height: double, rotation: double, order: int]
