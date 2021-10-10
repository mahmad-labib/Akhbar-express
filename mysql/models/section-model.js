module.exports = (sequelize, type) => {

    return sequelize.define('sections', {
        // Model attributes are defined here
        parent_id: {
            type: type.STRING,
            allowNull: true
        },
        name: {
            type: type.STRING,
            allowNull: false
        },
    }, {
        modelName: 'articles'
    });
    
    }