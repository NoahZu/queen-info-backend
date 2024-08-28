const express = require('express');
const router = express.Router();
const Queen = require('../models/Queen');

// 获取所有女王信息
router.get('/', async (req, res) => {
  try {
    const queens = await Queen.find();
    res.json(queens);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 获取特定女王信息
router.get('/:id', getQueen, (req, res) => {
  res.json(res.queen);
});

// 创建新的女王信息
router.post('/', async (req, res) => {
  const queen = new Queen(req.body);
  try {
    const newQueen = await queen.save();
    res.status(201).json(newQueen);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 更新女王信息
router.patch('/:id', getQueen, async (req, res) => {
  Object.assign(res.queen, req.body);
  try {
    const updatedQueen = await res.queen.save();
    res.json(updatedQueen);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 删除女王信息
router.delete('/:id', getQueen, async (req, res) => {
  try {
    await res.queen.remove();
    res.json({ message: 'Deleted Queen' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getQueen(req, res, next) {
  try {
    const queen = await Queen.findById(req.params.id);
    if (queen == null) {
      return res.status(404).json({ message: 'Cannot find queen' });
    }
    res.queen = queen;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
