const sequelize=require('sequelize');
const { Sequelize } = require('sequelize');
let db;

db=new sequelize({
    dialect:"mysql",
    database:"sjdatabase",
    username:"sjuser",
    password:"sjuser"
});

let user=db.define("user",{
    id:{
        type:Sequelize.DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    username:{
      type:Sequelize.DataTypes.STRING(140),
      allowNull:false,
      primaryKey:true      
    },
    year:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false,
    },
    points:{
        type:Sequelize.DataTypes.INTEGER,
        defaultValue: 0
        
    },
    password:{
        type:Sequelize.DataTypes.STRING(140),
        allowNull:false,
    }
})

let allquestions=db.define("allquestions",{
    id:{
     type:Sequelize.DataTypes.INTEGER,
     primaryKey:true,
     autoIncrement:true
    },
    topic:{
        type:Sequelize.DataTypes.STRING(140),
        allowNull:false,
    },
    desc:{
        type:Sequelize.DataTypes.STRING(1000),
        allowNull:false,
    },
    likes:{
        type:Sequelize.DataTypes.INTEGER,
        defaultValue: 0
    },
    dislikes:{
        type:Sequelize.DataTypes.INTEGER,
        defaultValue: 0
    },
    year:{
        type:Sequelize.DataTypes.INTEGER,
    },
    anonymous:{
        type:Sequelize.DataTypes.INTEGER,
        defaultValue: 0
    }

});
let notification=db.define("notifications",{
    id:{
        type:Sequelize.DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
       },
    sentby:{
        type:Sequelize.DataTypes.STRING(140),
     allowNull:false
    },
  
    username:{
       type:Sequelize.DataTypes.STRING(140),
       allowNull:false,
    },
    questionid:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false
    },
    seen:{
        
        type:Sequelize.DataTypes.INTEGER,
         allowNull:false    
    }

})
let likesforpost=db.define("likesforposts",{
    id:{
        type:Sequelize.DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
       },
    val:{
        type:Sequelize.DataTypes.INTEGER,
        defaultValue: 0
  
    }
})

let likesforanswer=db.define("likesforanswers",{
    id:{
        type:Sequelize.DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
       },
    val:{
        type:Sequelize.DataTypes.INTEGER,
        defaultValue: 0
        
    }
})
let answers=db.define("answers",{
    id:{
        type:Sequelize.DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
       },
       topic:{
           type:Sequelize.DataTypes.STRING(140),
           allowNull:false,
       }, 
       username:{
        type:Sequelize.DataTypes.STRING(140),
        allowNull:false,
        primaryKey:true      
      },
      likes:{
        type:Sequelize.DataTypes.INTEGER,
        defaultValue: 0
    },
    dislikes:{
        type:Sequelize.DataTypes.INTEGER,
        defaultValue: 0
    },
})

user.hasMany(allquestions)
allquestions.belongsTo(user);
user.hasMany(answers)
answers.belongsTo(user)
allquestions.hasMany(answers)
answers.belongsTo(allquestions)
user.hasOne(likesforpost);
likesforpost.belongsTo(user);
allquestions.hasMany(likesforpost)
likesforpost.belongsTo(allquestions);
user.hasOne(likesforanswer);
likesforanswer.belongsTo(user);
answers.hasMany(likesforanswer)
db.sync().then(() => {
    console.log("Database has been synced");
  });

module.exports={
    db,user,allquestions,answers,notification,likesforpost,likesforanswer
}