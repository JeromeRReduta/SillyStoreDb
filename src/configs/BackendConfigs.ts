import {
    requireNumber,
    requireStr,
} from "../../SillyStoreCommon/configs/ConfigValidation.ts";
import { IDbConfigs } from "../../SillyStoreCommon/configs/DbConfigs.ts";
import { IJwtConfigs } from "../../SillyStoreCommon/configs/JwtConfigs.ts";
import { ILoggingConfigs } from "../../SillyStoreCommon/configs/LoggingConfigs.ts";

export interface IBackendConfigs {
    readonly db: IDbConfigs;
    readonly jwt: IJwtConfigs;
    readonly logging: ILoggingConfigs;
}

const { DATABASE_URL, JWT_SECRET, MIN_LOG_LEVEL, PORT } = process.env;
const backendConfigs: IBackendConfigs = {
    db: {
        port: requireNumber("PORT", PORT),
        databaseUrl: requireStr("DATABASE URL", DATABASE_URL),
    },
    jwt: {
        secret: requireStr("JWT SECRET", JWT_SECRET),
    },
    logging: {
        minLevel: requireNumber("MIN LOG LEVEL", MIN_LOG_LEVEL),
    },
};

export default backendConfigs;
