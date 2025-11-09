require("dotenv").config();

const MONGODB_URL = `mongodb+srv://hashmialam1000_db_user:${process.env.MONGODB_CLUSTER_PASSWORD}@connectionsphere.zsk8afi.mongodb.net/connectionSphere`

module.exports = {MONGODB_URL};