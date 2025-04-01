import Item from "../utilities/item.model.js";

export const getItems = async(req, res) => {
    const items = await Item.find();
    res.json(item);
};

export const getItem = async(req, res) => {
    const items = await Item.findById(req.params.id);
    res.json(item);
};

export const postItem = async(req, res) => {
    const item = new Item(req.body);
    await item.save();
    res.json(item);
};

export const putItem = async(req, res) => {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true,});
    res.json(item);
};

export const deleteItem = async(req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Item eliminado" });
};