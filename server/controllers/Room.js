const Room = require("../models/Room.js");

const addRoom = async (roomname, username, singleroom, existing) => {
  try {
    if (singleroom) {
      let room = await Room.findOne({ roomname });

      if (room == null) {
        room = await new Room({ roomname });
        room.singleroom = singleroom;
        let users = room.users;

        users.push({
          username,
          fillColor: "transparent",
          lineColor: "black",
          lineWidth: 2,
          shape: "pencil",
          opacity: 1,
          strokeDashArray: 0,
          lock: false,
          showSidebar: true,
          delete: false,
        });
        room.users = users;
        await room.save();
      }
      return room;
    } else {
      let room = null;
      if (existing) {
        room = await Room.findOne({ roomname, singleroom: false });
        if (room == null) {
          return { err: "Invalid roomName" };
        }
      } else {
        room = await new Room({ roomname });
      }
      // let room = await Room.findOne({ roomname });
      // if (room == null) {
      //   room = await new Room({ roomname });
      // }
      room.singleroom = singleroom;
      let users = room.users;

      users.push({
        username,
        fillColor: "transparent",
        lineColor: "black",
        lineWidth: 2,
        shape: "pencil",
        opacity: 1,
        strokeDashArray: 0,
        lock: false,
        showSidebar: true,
        delete: false,
      });
      room.users = users;
      await room.save();
      return { users: room.users };
    }
  } catch (e) {
    console.log(e.message);
    return { error: "Something went wrong" };
  }
};
const addFigure = async (request, response) => {
  const figure = request.body.figure;
  const roomname = request.body.roomname;
  const id = request.body.id;
  figure.id = id;
  try {
    let room = await Room.findOne({ roomname });
    room.figures.push(figure);
    await room.save();
    response.send({ message: "Figure added successfully" });
  } catch (e) {
    console.log(e.message);
    response.send({ message: e.message });
  }
};
const updateFigure = async (request, response) => {
  const figures = request.body.figures;
  const roomname = request.body.roomname;
  try {
    const room = await Room.findOne({ roomname });
    // const index = room.figures.findIndex((figure) => figure.id === id);
    // room.figures[index] = figure;
    room.figures = figures;
    await room.save();
    response.send({ message: "Figure updated successfully" });
  } catch (e) {
    response.json({ message: e.message });
  }
};
const getFigures = async (request, response) => {
  const roomname = request.query.roomname.trim().toLowerCase();
  const username = request.query.username.trim().toLowerCase();
  try {
    const room = await Room.findOne({ roomname });
    const user = room.users
      .slice()
      .reverse()
      .find((user) => user.username === username);
    if (room != null)
      response.send({
        figures: room.figures,
        lineColor: user.lineColor,
        opacity: user.opacity,
        fillColor: user.fillColor,
        lineStyle: user.strokeDashArray,
        lineWidth: user.lineWidth,
        shape: user.shape,
        lock: user.lock,
        showSidebar: user.showSidebar,
        users: room.users,
      });
  } catch (e) {
    console.log(e.message);
    response.json({ message: e.message });
  }
};

const clearCanvas = async (request, response) => {
  try {
    const room = await Room.findOne({ roomname: request.body.roomname });
    room.figures = [];
    await room.save();
    response.send({ message: "Canvas cleared" });
  } catch (e) {
    response.json({ message: e.message });
  }
};

const changeLineColor = async (request, response) => {
  try {
    const room = await Room.findOne({ roomname: request.body.roomname });
    const user = room.users
      .slice()
      .reverse()
      .find((user) => user.username === request.body.username);
    user.lineColor = request.body.lineColor;
    await room.save();
    response.send({ message: "Line Color updated" });
  } catch (e) {
    response.json({ message: e.message });
  }
};
const changeFillColor = async (request, response) => {
  try {
    const room = await Room.findOne({ roomname: request.body.roomname });
    const user = room.users
      .slice()
      .reverse()
      .find((user) => user.username === request.body.username);
    user.fillColor = request.body.fillColor;
    await room.save();
    response.send({ message: "Fill Color updated" });
  } catch (e) {
    response.json({ message: e.message });
  }
};

const changeLineWidth = async (request, response) => {
  try {
    const room = await Room.findOne({ roomname: request.body.roomname });
    const user = room.users
      .slice()
      .reverse()
      .find((user) => user.username === request.body.username);
    user.lineWidth = request.body.lineWidth;
    await room.save();
    response.send({ message: "Line Width updated" });
  } catch (e) {
    response.json({ message: e.message });
  }
};

const changeLock = async (request, response) => {
  try {
    const room = await Room.findOne({ roomname: request.body.roomname });
    const user = room.users
      .slice()
      .reverse()
      .find((user) => user.username === request.body.username);
    user.lock = request.body.lock;
    await room.save();
    response.send({ message: "Lock updated" });
  } catch (e) {
    console.log(e.message);
    response.json({ message: e.message });
  }
};

const changeshowSidebar = async (request, response) => {
  try {
    const room = await Room.findOne({ roomname: request.body.roomname });
    const user = room.users
      .slice()
      .reverse()
      .find((user) => user.username === request.body.username);
    user.showSidebar = request.body.showSidebar;
    await room.save();
    response.send({ message: "Sidebar updated" });
  } catch (e) {
    response.json({ message: e.message });
  }
};

const changeStyleSlider = async (request, response) => {
  try {
    const room = await Room.findOne({ roomname: request.body.roomname });
    const user = room.users
      .slice()
      .reverse()
      .find((user) => user.username === request.body.username);
    user.strokeDashArray = request.body.strokeDashArray;
    await room.save();
    response.send({ message: "stroke Style updated" });
  } catch (e) {
    response.json({ message: e.message });
  }
};
const changeOpacity = async (request, response) => {
  try {
    const room = await Room.findOne({ roomname: request.body.roomname });
    const user = room.users
      .slice()
      .reverse()
      .find((user) => user.username === request.body.username);
    user.opacity = request.body.opacity;
    await room.save();
    response.send({ message: "opacity updated" });
  } catch (e) {
    console.log(e.message);
    response.json({ message: e.message });
  }
};

const changeShape = async (request, response) => {
  try {
    const room = await Room.findOne({ roomname: request.body.roomname });
    const user = room.users
      .slice()
      .reverse()
      .find((user) => user.username === request.body.username);
    if (
      request.body.shape !== "undo" &&
      request.body.shape !== "redo" &&
      request.body.shape !== "clear" &&
      request.body.shape !== "download"
    )
      user.shape = request.body.shape;
    else user.shape = "selection";
    await room.save();
    response.send({ message: "Shape updated" });
  } catch (e) {
    response.json({ message: e.message });
  }
};
// const undoFigure = async (request, response) => {
//   try {
//     const room = await Room.findOne({ roomname: request.body.roomname });
//     room.figures = room.figures.filter(
//       (figure) => request.body.id !== figure.id
//     );
//     await room.save();
//     response.sed({ message: "undo successful" });
//   } catch (e) {
//     response.json({ message: e.message });
//   }
// };
const undoFigure = async (request, response) => {
  try {
    const room = await Room.findOne({ roomname: request.body.roomname });
    room.figures = request.body.figures;
    await room.save();
    response.send({ message: "undo successful" });
  } catch (e) {
    response.json({ message: e.message });
  }
};
const remove = async (request, response) => {
  console.log(request.io);
  try {
    const room = await Room.findOne({ roomname: request.body.roomname });
    const user = room.users
      .slice()
      .reverse()
      .find((user) => user.username === request.body.username);
    user.delete = true;
    await room.save();
    request.io.emit("userUp", {
      roomname: request.body.roomname,
      users: room.users,
    });
    console.log("***", user);
    return response.send({ message: "Set delete property" });
  } catch (e) {
    console.log(e.message);
    response.json({ message: e.message });
  }
};
const add = async (request, response) => {
  try {
    const room = await Room.findOne({ roomname: request.body.roomname });
    const user = room.users
      .slice()
      .reverse()
      .find((user) => user.username === request.body.username);
    user.delete = false;
    await room.save();

    return response.send({ message: "Set delete property" });
  } catch (e) {
    console.log(e.message);
    response.json({ message: e.message });
  }
};

module.exports = {
  addRoom,
  addFigure,
  updateFigure,
  getFigures,
  clearCanvas,
  changeLineWidth,
  changeLineColor,
  changeShape,
  undoFigure,
  changeFillColor,
  changeStyleSlider,
  changeOpacity,
  changeLock,
  changeshowSidebar,
  remove,
  add,
};
