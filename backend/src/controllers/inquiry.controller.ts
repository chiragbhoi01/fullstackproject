import { Inquiry } from "../models/inquiry.model";
import { Request, Response } from "express";


export const sendInquiry = async (req: Request, res: Response) => {
    try {
        const inquiry = await Inquiry.create(req.body);
        if (inquiry) {
            res.status(201).json(inquiry);
        } else {
            res.status(400).json({ message: "Inquiry could not be created." });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error.", error });
    }
};
