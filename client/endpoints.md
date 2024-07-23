# endpoints convention

## proxy: https://localhost:8081 (replaced by "/api" in code)\

1. clothing image upload: `/api/save-clothing`

   - under Camera.tsx
   - method: POST
   - function: saves a new clothing into the server
   - format: `FormData(Blob(string))`
   - if successful: "
   - if failed:

2. process image `/api/processed-image`

   - under AddTag.tsx
   - method: GET
   - server send the processed image and ID to the client as a square with transparent background
   - id: `integer`

3. save tag `/api/save-tag`

   - under AddTag.tsx
   - method: POST
   - client send integer and then array of string of tags
   - id: `integer`
   - selectedTags `string[]`

4. get all cloth `/api/get-all-cloth`

   - under Shelf.tsx
   - method: GET
   - client ask for clothing ID, clothing path, clothing tag
   - receive list of clothing path
   - array of triples (id: integer, path: string, tag: array of strings)
   - Array<{ id: number; path: string; tags: string[] }>

5. save canvas `/api/save-canvas`
   - method: POST
   - client send 2D array
   - [canvas ID: int, clothingID: string, xposition: double, yposition: double, width: double, height: double, rotation: double, order: int]
