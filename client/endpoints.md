# endpoints convention

## proxy: https://localhost:8081 (replaced by "/api" in code)\

1. clothing image upload: `/api/save-clothing`

   - under Camera.tsx
   - method: POST
   - function: saves a new clothing into the server
   - format: `FormData(Blob(string))`
   - if successful: return success message with ID
   - if failed: return error

2. process image `/api/processed-image?id={id}`
   - under AddTag.tsx
   - method: GET
   - server send the processed image and ID to the client as a square with transparent background
   - id: `string`

3. save tag `/api/save-tag`
   - under AddTag.tsx
   - method: POST
   - client send integer and then array of string of tags
   - id: `string`
   - selectedTags `string[]`

4. save tag `/api/get-tag`
   - under dont know where
   - method: GET
   - client send integer and then gets an array of string of tags
   - id: `string`
   - selectedTags `string[]`

5. get all cloth `/api/get-all-cloth-tags`

   - under Shelf.tsx
   - method: GET
   - client ask for clothing ID, clothing path, clothing tag
   - receive list of clothing path
   - array of triples (id: string, tag: array of strings)
   - Array<{ id: string; tags: string[] }>

6. get all unique - tags `/api/get-all-tags`

   - under AddTag.tsx
   - method: GET
   - client ask for all the possible unique clothing tag
   - receive list of strings

7. save canvas `/api/save-canvas`
   - method: POST
   - client send 2D array
   - array with number of images on the canvas, each element in array is [canvas ID: int, clothingID: string, xposition: double, yposition: double, width: double, height: double, rotation: double, order: int]

8. get canvas `/api/get-canvas`
   - method: GET
   - reverse

8. delete clothing `/api/delete-clothing`
   - method: POST
   - client send the id of the clothing
   - server remove all the things associated with this clothing
