import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/movies", "MoviesController.find");
    Route.get("/movies/:id", "MoviesController.find"); //Si quiero hacer una publica, la saco del grupo.
    Route.post("/movies", "MoviesController.create");
    Route.put("/movies/:id", "MoviesController.update");
    Route.delete("/movies/:id", "MoviesController.delete");
}).middleware(["security"]) //Para llamar al policia. Protegemos las rutas