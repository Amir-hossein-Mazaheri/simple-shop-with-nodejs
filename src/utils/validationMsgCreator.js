import { validationResult } from "express-validator";

export const validationMsgCreator = (
  req,
  res,
  route,
  msgId = "process-failed"
) => {
  const validation = validationResult(req);

  console.log(validation);

  if (!validation.isEmpty()) {
    req.flash("error", "true");
    req.flash(
      "errorContents",
      validation.array().map((err) => err.msg)
    );
    req.flash("errorId", msgId);

    res.redirect(route);
    return true;
  }

  return false;
};
