var roles = {
  SUPERADMIN: 'SuperAdmin',
  ADMIN: 'Admin',
  SUPEROPERATOR: 'SuperOperator',
  OPERATOR: 'Operator',
  PLACEVIEW: 'PlaceView',
  OWNER: 'Owner'
};

module.exports = {
  modules: {
    USERS: 'users',
    EVENTS: 'events',
    ATTENDANCES: 'attendances'
  },
  actions: {
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete'
  },
}
