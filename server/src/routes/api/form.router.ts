import { Router } from "express";
import formController from "../../controller/form.controller";
const router: Router = Router();

router.get("/form/:id", formController.getFormById.bind(formController));
router.get("/form-url/:url", formController.getFormByUrl.bind(formController));
router.post("/form", formController.createForm.bind(formController));
router.post(
  "/form-content",
  formController.updateFormContent.bind(formController)
);
router.post("/form-publish", formController.formPublish.bind(formController));

router.post(
  "/form-submission",
  formController.createFormSubmission.bind(formController)
);

export default router;
