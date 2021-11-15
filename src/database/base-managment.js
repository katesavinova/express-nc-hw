const path = require('path');
const { readJsonFile, writeJsonFile } = require('../utils/file.utils');

const FILE_PATH = path.resolve(path.dirname(require.main.filename), 'database', 'products', 'products.json');

const productsDatabase = {

    async getAllFromCatalog() {
        return await readJsonFile(FILE_PATH) || [];
    }
};

module.exports = productsDatabase;