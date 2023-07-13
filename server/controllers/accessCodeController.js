import AccessCode from "../models/accessCodeModel.js";

export const getSchoolID = async (req, res) => {
  const inputID = req.params.school_id;

  try {
    const foundID = await AccessCode.findOne({ school_id: inputID });

    if (foundID) {
      res.status(200).json({ message: "School ID found", valid: true });
    } else {
      res.status(200).json({ message: "School ID not found", valid: false });
    }
  } catch (error) {
    console.error("Error searching for School ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAccessCodes = async (req, res) => {
  AccessCode.find({})
    .then((data) => {
      res.status(200).json(data);
    });
}

export const searchAccessCode = async (req, res) => {
  const inputCode = req.body.code;

  try {
    const foundCode = await AccessCode.findOne({
      access_codes: {
        $elemMatch: {
          code: inputCode,
        },
      },
    });

    if (foundCode) {
      res.status(200).json({ message: "Access code found", valid: true });
    } else {
      res.status(200).json({ message: "Access code not found", valid: false });
    }
  } catch (error) {
    console.error("Error searching for access code:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createAccessCode = async (req, res) => {
  if (!req.body.school_id || !req.body.access_codes)
      return res.status(400).json({ "err": "Missing field(s)" });

  AccessCode.findOne({ school_id: req.body.school_id })
      .then(async (school) => {
          if (!school) {
              const newAccessCode = new AccessCode({
                  school_id: req.body.school_id,
                  access_codes: req.body.access_codes
              });

              await newAccessCode.save();
              return res.status(200).json(newAccessCode);
          } else {
              school.access_codes.push(...req.body.access_codes);
              await school.save();
              return res.status(200).json(school);
          }
      })
      .catch((err) => {
          res.status(400).json({ "err": "Error creating access code" });
      });
}