'use strict';
module.exports = (sequelize, DataTypes) => {
  const alumno = sequelize.define('alumno', {
    nombre: DataTypes.STRING,
    dni: DataTypes.INTEGER,
    id_carrera: DataTypes.INTEGER
  }, {});
  alumno.associate = function(models) {
    // associations can be defined here
    alumno.belongsTo(models.carrera, {
      as: 'Carrera-Relacionada',
      foreignKey: 'id_carrera'
    })
  };
  return alumno;
};