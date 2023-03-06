import { insertDocument, getData, deleteData } from "@/helpers/mongoDb";

export default async function DataFetch(req, res) {
  if (req.method === "POST") {
    const { title, content } = req.body;

    try {
      insertDocument("notes", { title, content });
    } catch (err) {
      res.status(500).json({ message: "Error" });
      return;
    }
    res.status(200).json({ message: "Success" });
  }

  if (req.method === "GET") {
    const data = await getData();
    res.status(200).json(data);
  }

  if (req.method === "DELETE") {
    const { id } = req.body;

    try {
      deleteData(id);

      res.status(200).json({ message: "succcess" });
    } catch (err) {
      res.status(500).json({ message: "Error" });
      return;
    }
  }

  return;
}
