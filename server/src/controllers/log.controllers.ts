import Log from '@src/models/log.model';
import * as factory from '../factories/handler.factory';

export const getFilteredLogTrail = factory.getAll(Log);

export const getLogById = factory.getOne(Log);
