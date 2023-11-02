module.exports = (sequelize, Sequelize) => {
  const Permasalahan = sequelize.define("permasalahan", {
    name: {
      type: Sequelize.STRING
    },
    tanggal_perbaikan: {
      type: Sequelize.STRING
    },
    masa_perbaikan: {
      type: Sequelize.STRING
    },
    target: {
      type: Sequelize.STRING
    },
    realisasi: {
      type: Sequelize.STRING
    },
    gap: {
      type: Sequelize.STRING
    },
    evaluasi: {
      type: Sequelize.STRING
    },
    created_at: {
      type: Sequelize.STRING
    },
    active: {
      type: Sequelize.BOOLEAN
    }
  });
    
  return Permasalahan;
};