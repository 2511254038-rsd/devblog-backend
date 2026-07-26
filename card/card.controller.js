import Card from "./card.model.js";

// Shape a card to match the frontend exactly:
// id, title, excerpt, content, author, date, category, image
const format = (card) => ({
  id: card._id,
  title: card.title,
  excerpt: card.excerpt,
  content: card.content,
  author: card.author,
  category: card.category,
  image: card.image,
  date: new Date(card.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }),
});

// GET ALL (PUBLIC)
export const getCards = async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: -1 });
    res.json(cards.map(format));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ONE (PUBLIC)
export const getCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    res.json(card ? format(card) : null);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET MINE (PROTECTED)
export const getMyCards = async (req, res) => {
  try {
    const cards = await Card.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.json(cards.map(format));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE (PROTECTED)
export const createCard = async (req, res) => {
  try {
    const card = await Card.create({
      ...req.body,
      author: req.user.name,   // from the logged-in user
      createdBy: req.user._id, // owner
    });
    res.status(201).json(format(card));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE (PROTECTED, OWNER ONLY)
export const updateCard = async (req, res) => {
  try {
    const card = await Card.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true }
    );
    res.json(card ? format(card) : null);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE (PROTECTED, OWNER ONLY)
export const deleteCard = async (req, res) => {
  try {
    await Card.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
    res.json({ message: "Card deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};