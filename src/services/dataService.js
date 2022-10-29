import api from "./api.js";

class DataService{
    getAll(){
        return api.get("/dentista")
    }
}

export default new DataService();