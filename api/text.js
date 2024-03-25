const router = require('express').Router();
const textDb = require('../db/text');

router.get("/", async (req, res) => {
  const { studentId } = req.query;
  try {
    const text = await textDb.getAllStudentText(studentId);
    res.json(text);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error fetching text from student ID ${studentId}`);
  }
});

router.get("/:textId", async (req, res) => {
const { textId } = req.params;
try {
  const text = await textDb.getText(textId);
  res.json(text);
} catch (error) {
  console.error(error);
  res.status(500).send(`Error fetching text with ID ${textId}`);
}
});

router.post("/", async (req, res) => {
    try {
      const data = req.body;
      const newTextId = await textDb.addText(data);
      res.json({ message: `Text added successfully with ID: ${newTextId}` });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error adding student");
    }
});

router.put("/:textId", async (req, res) => {
try {
  const { textId } = req.params;
  const data = req.body;
  await studentDb.updateStudent(textId, data);
  res.json({ message: `Text with ID ${textId} updated successfully` });
} catch (error) {
  console.error(error);
  res.status(500).send("Error updating text");
}
});

router.delete("/:textId", async (req, res) => {
try {
  const { textId } = req.params;
  await textDb.deleteText(textId);
  res.json({ message: `Text with ID ${textId} deleted successfully` });
} catch (error) {
  console.error(error);
  res.status(500).send("Error deleting text");
}
});

module.exports = router;
