"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CultivosModule = void 0;
const common_1 = require("@nestjs/common");
const cultivos_controller_1 = require("./cultivos.controller");
const cultivos_service_1 = require("./cultivos.service");
const prisma_service_1 = require("../prisma/prisma.service");
let CultivosModule = class CultivosModule {
};
exports.CultivosModule = CultivosModule;
exports.CultivosModule = CultivosModule = __decorate([
    (0, common_1.Module)({
        controllers: [cultivos_controller_1.CultivosController],
        providers: [cultivos_service_1.CultivosService, prisma_service_1.PrismaService],
        exports: [cultivos_service_1.CultivosService],
    })
], CultivosModule);
//# sourceMappingURL=cultivos.module.js.map