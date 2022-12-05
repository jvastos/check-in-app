"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server_1 = require("./server");
const mongodb_1 = require("mongodb");
const DB_URL = process.env.MONGODB_URL;
const DB_NAME = 'check-in';
const PORT = process.env.PORT;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new mongodb_1.MongoClient(DB_URL);
        yield client.connect();
        const db = client.db(DB_NAME);
        const server = (0, server_1.createServer)(db);
        server.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    });
}
main().catch((err) => {
    console.error('Something went wrong running the main fnc', err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map