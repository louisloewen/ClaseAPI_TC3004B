import { Router } from "express";
import{    
    getItems,
    getItem,
    postItem,
    putItem,
    deleteItems
} from "../controllers/items2.controllers.js";

const router = Router();

router.get("/items2/", getItems);
router.get("/items2/:id", getItems);
router.post("/items2/", postItems);  
router.put("/items2/:id", putItems);  
router.delete("/items2/:id", deleteItems);   

export default router;