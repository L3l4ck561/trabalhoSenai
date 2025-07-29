from fastapi import FastAPI

app = FastAPI()

#FastAPI
@app.get("/")
def get_user():
    return "oi"

if __name__ == "__main__":
    app.run(debug=True)