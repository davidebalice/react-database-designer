function isAllowed(role, id, members, ownerId) {


  if (role === "admin") {
    return true;
  } else {
    if (members && ownerId && id) {
      if (id === ownerId) {
        return true;
      } else {
        for (let i = 0; i < members.length; i++) {
          if (members[i]._id === id) {
            return true;
          }
        }
      }
    }
  }
  return false;
}

export default isAllowed;
