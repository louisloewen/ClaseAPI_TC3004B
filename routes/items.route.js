import { Router } from "express";
import{
    getItems,
    getItem,
    postItem,
    putItem,
    deleteItems
} from "../controllers/items.controllers.js";

const router = Router();

router.get("/items/", getItems);
router.get("/items/:id", getItems);
router.post("/items/", postItems);  
router.put("/items/:id", putItems);  
router.delete("/items/:id", deleteItems);   

export default router;