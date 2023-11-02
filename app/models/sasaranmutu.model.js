module.exports = (sequelize, Sequelize) => {
  const Sasaran_mutu = sequelize.define("sasaran_mutu", {
    name: {
      type: Sequelize.STRING
    },
    created_at: {
      type: Sequelize.STRING
    },
    active: {
      type: Sequelize.BOOLEAN
    }
  });
  
  return Sasaran_mutu;
};