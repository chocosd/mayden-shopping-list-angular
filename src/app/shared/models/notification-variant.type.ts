import { SemanticVariant } from './utils.type';

export type NotificationVariant = Omit<SemanticVariant, 'light' | 'dark'>;
