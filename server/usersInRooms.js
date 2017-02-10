let usersInRooms = [];

const generateRooms = (dbRooms) => {
  usersInRooms = dbRooms.map((room) => {
    return { id: room._id, users: [] }
  });
};

const getAllRooms = () => usersInRooms;

const getRoom = (roomId) => usersInRooms.find((room) => room.id == roomId);

const addRoom = (room) => usersInRooms.push(room);

const deleteRoom = (roomId) => usersInRooms = usersInRooms.filter((room) => room.id != roomId);

const addUserToRoom = (roomId, userId) => {
  usersInRooms.map((room) => {
    if (room.id == roomId) {
      room.users = [ ...room.users, userId ];
      return room;
    }
    return room;
  });
};

const deleteUserFromRoom = (roomId, userId) => {
  let usersInRoomsCopy = usersInRooms.slice();
  usersInRooms.map((room) => {
    if (room.id == roomId) {
      room.users = room.users.filter((user) => user !== userId);
      return room;
    }
    return room;
  });
};

module.exports = { generateRooms, addRoom, deleteRoom, getAllRooms, getRoom, addUserToRoom, deleteUserFromRoom };
