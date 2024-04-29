import { Request, Response } from "express";
import formModel from "../models/form.model";
import userModel from "../models/user.model";
import formSubmittionsModel from "../models/form-submittions.model";

class FormController {
  constructor() {}

  async getFormById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const form = await formModel.findById(id).populate("submissions").exec();
      res.status(200).json(form);
    } catch (e) {
      res.status(400).send("Form with this id not found");
    }
  }

  async getFormByUrl(req: Request, res: Response) {
    try {
      const { url } = req.params;
      const form = await formModel
        .findOne({ shareUrl: url })
        .populate("submissions")
        .exec();
      res.status(200).json(form);
    } catch (e) {
      res.status(400).send("Form with this id not found");
    }
  }

  async createForm(req: Request, res: Response) {
    try {
      const { profileId, name } = req.body;
      const form = await formModel.create({ profileId, name });
      await userModel.findOneAndUpdate(
        { profileId },
        { $push: { forms: form._id } },
        { new: true }
      );
      res.status(201).json(form);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async updateFormContent(req: Request, res: Response) {
    try {
      const { id, content } = req.body;
      const form = await formModel.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $set: { content },
        },
        { new: true }
      );

      res.status(201).json(form);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async formPublish(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const form = await formModel.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $set: { isPublished: true },
        },
        { new: true }
      );

      res.status(201).json(form);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async createFormSubmission(req: Request, res: Response) {
    try {
      const { formUrl, content } = req.body;

      const newSubmittion = await formSubmittionsModel.create({
        content,
      });
      await formModel.findOneAndUpdate(
        { shareUrl: formUrl },
        { $push: { submissions: newSubmittion._id } },
        { new: true }
      );
      res.status(201).json(newSubmittion);
    } catch (e) {
      res.status(400).send(e);
      console.log(e);
    }
  }
}

const formController = new FormController();
export default formController;
