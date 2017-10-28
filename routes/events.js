"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const hc_1 = require("../glob/hc");
const conn_1 = require("../glob/conn");
const _1 = require("../utils/_");
const ajv2_1 = require("../utils/ajv2");
// Import models here
// Import services here
const auth_1 = require("../serv/auth");
const router = express.Router();
const _ajv = ajv2_1.default();
// Start API here
let bodyValidator = _ajv({
    '+@room': 'string',
    '+@event': 'string',
    '+args': {
        type: 'array',
        items: {}
    },
    '++': false
});
router.post('/', auth_1.default.authAPIKey(hc_1.default.APIKEY), _1.default.validBody(bodyValidator), _1.default.routeAsync((req) => __awaiter(this, void 0, void 0, function* () {
    const room = req.body.room;
    const event = req.body.event;
    const args = req.body.args;
    conn_1.io.to(room).emit(event, ...args);
})));
exports.default = router;
//# sourceMappingURL=events.js.map