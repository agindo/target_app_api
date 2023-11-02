module.exports = (sequelize, Sequelize) => {
  const job = sequelize.define("job", {
    tanggal: {
      type: Sequelize.STRING
    },
		deskripsi: {
      type: Sequelize.STRING
    },
		start: {
      type: Sequelize.STRING
    },
		finish: {
      type: Sequelize.STRING
    },
    created_at: {
      type: Sequelize.STRING
    },
    active: {
      type: Sequelize.BOOLEAN
    }
  });
    
  return job;
};