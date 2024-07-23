# Steps to set up
1. activate python environment with `source venv/bin/activate` (and deactivate any pre-existing environments)
2. install dependencies `pip install -r requirements.txt`
3. install frontend dependencies with `npm install`
4. install axios on frontend `cd ../client` then `npm install axios`
5. run frontend with `npm run dev`, and backend with `python app.py` make sure you are at the correct virtual env
6. take an image from the frontend, it should appear in `./server/uploads`